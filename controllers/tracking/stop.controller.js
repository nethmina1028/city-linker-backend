const TrackingStopModel = require('../../models/tracking/stop.model');

const getTrackingStops = async (req, res) => {
  try {
    const TrackingStops = await TrackingStopModel.find();
    res.status(200).json({ TrackingStops });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch TrackingStops', error: error.message });
  }
}

const createTrackingStop = async (req, res) => {
  try {
    const TrackingStop = await TrackingStopModel.create(req.body);
    res.status(201).json({ TrackingStop });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create TrackingStop', error: error.message });
  }
}

const updateTrackingStop = async (req, res) => {
  try {
    const updatedTrackingStop = await TrackingStopModel.findByIdAndUpdate
      (req.body);
    res.status(200).json({ updatedTrackingStop });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update TrackingStop', error: error.message });
  }
}

const deleteTrackingStop = async (req, res) => {
  try {
    const deletedTrackingStop = await TrackingStopModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ deletedTrackingStop });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete TrackingStop', error: error.message });
  }
}

module.exports = {
  getTrackingStops,
  createTrackingStop,
  updateTrackingStop,
  deleteTrackingStop
};
