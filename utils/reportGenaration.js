const nodemailer = require('nodemailer');
const BusSchedule = require('../models/busScheduleModel');
const Booking = require('../models/booking');

async function generateDailyBusBookingReport(date, recipientEmail) {
  try {
    const schedules = await BusSchedule.find({ date }).populate('tripId');

    if (schedules.length === 0) {
      console.log('No bookings found for the date:', date);
      return;
    }

    const reportData = schedules.map(schedule => {
      const totalSeats = schedule.seatsAvailable + schedule.bookedSeats.length;
      const bookingPercentage = ((schedule.bookedSeats.length / totalSeats) * 100).toFixed(2);

      return {
        scheduleId: schedule._id,
        tripId: schedule.tripId._id,
        company: schedule.tripId.company,
        from: schedule.tripId.from,
        to: schedule.tripId.to,
        time: schedule.tripId.time,
        routeNumber: schedule.tripId.routeNumber,
        number: schedule.tripId.number,
        date: schedule.date,
        seatsAvailable: schedule.seatsAvailable,
        bookedSeats: schedule.bookedSeats.length,
        bookingPercentage: `${bookingPercentage}%`
      };
    });

    // Create a basic HTML table report
    const htmlRows = reportData.map(row => `
      <tr>
        <td>${row.company}</td>
        <td>${row.from}</td>
        <td>${row.to}</td>
        <td>${row.time}</td>
        <td>${row.routeNumber}</td>
        <td>${row.number}</td>
        <td>${row.date}</td>
        <td>${row.seatsAvailable}</td>
        <td>${row.bookedSeats}</td>
        <td>${row.bookingPercentage}</td>
      </tr>
    `).join('');

    const htmlTable = `
      <h2>Bus Booking Report for ${date}</h2>
      <table border="1" cellpadding="5" cellspacing="0">
        <thead>
          <tr>
            <th>Company</th>
            <th>From</th>
            <th>To</th>
            <th>Time</th>
            <th>Route #</th>
            <th>Bus #</th>
            <th>Date</th>
            <th>Seats Available</th>
            <th>Booked Seats</th>
            <th>Booking %</th>
          </tr>
        </thead>
        <tbody>
          ${htmlRows}
        </tbody>
      </table>
    `;

    // Send email using nodemailer
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Or your SMTP provider
      auth: {
        user: 'citylinker',
        pass: 'nvdy lyye gmsa hyhs'
      }
    });

    const mailOptions = {
      from: '"Bus Booking System" <your-email@gmail.com>',
      to: recipientEmail,
      subject: `Daily Bus Booking Report - ${date}`,
      html: htmlTable
    };

    await transporter.sendMail(mailOptions);
    console.log('Report sent successfully to', recipientEmail);

  } catch (error) {
    console.error('Error generating or sending report:', error);
  }
}

exports.generateDailyBusBookingReport = generateDailyBusBookingReport;
