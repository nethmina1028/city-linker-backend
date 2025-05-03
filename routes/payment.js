const express = require("express");
const router = express.Router();
const paypal = require("../paypal");
const Booking = require("../models/booking"); 
const BusSchedules = require("../models/busScheduleModel"); 

router.post("/pay", async (req, res) => {
  const { totalAmount, operatorId, userId ,selectedSeats,selectedId} = req.body;

  const adminFee = (totalAmount * 5) / 100;
  const operatorFee = totalAmount - adminFee;
  
  const paymentJson = {
    intent: "sale",
    payer: { payment_method: "paypal" },
    redirect_urls: {
      return_url: "http://localhost:5000/api/payment/success",
      cancel_url: "http://localhost:5000/api/payment/cancel",
    },
    transactions: [
      {
        amount: {
          total: totalAmount.toFixed(2),
          currency: "USD",
        },
        description: "Bus seat reservation payment",
        payee: {
          email: "sb-2aqdp39050365admin@business.example.com", //admin email
        },
      },
    ],
  };

  paypal.payment.create(paymentJson, async (error, payment) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      const approvalUrl = payment.links.find((link) => link.rel === "approval_url").href;
      res.json({ approvalUrl });
      

      const generateUniqueId = () => Math.floor(1000 + Math.random() * 9000); 

      const newBooking = new Booking({
        userId,
        operatorId,
        selectedId,
        selectedSeats,
        totalAmount,
        adminFee,
        operatorFee,
        status: "Paid",
        bookId: generateUniqueId(),
      });


      
      await newBooking.save();
         
      await BusSchedules.findByIdAndUpdate(
        selectedId, 
        { $push: { bookedSeats: { $each: selectedSeats } } }, 
        { new: true } 
      );
    
    }
  });
});



router.get("/success", async (req, res) => {
  const { paymentId, PayerID } = req.query;

  
  paypal.payment.execute(
    paymentId,
    { payer_id: PayerID },
    async (error, payment) => {
      if (error) {
        res.status(500).json({ error });
      } else {
        // const newBooking = new Booking({
        //   userId,
        //   operatorId,
        //   busId,
        //   seats,
        //   totalAmount,
        //   adminFee,
        //   operatorFee,
        //   paymentId,
        //   status: "Paid",
        // });
  
        // await newBooking.save();

        // await BusSchedules.findByIdAndUpdate(
        //   selectedId, 
        //   { $push: { bookedSeats: { $each: selectedSeats } } }, 
        //   { new: true } 
        // );

        res.json({ message: "Payment successful", payment });
      }
    }
  );
});

router.get("/cancel", (req, res) => {
  res.json({ message: "Payment cancelled" });
});

module.exports = router;
