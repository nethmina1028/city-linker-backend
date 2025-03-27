const TrackingPathModel = require('../../models/tracking/path.model');

const getTrackingPaths = async (req, res) => {
  try {
    const TrackingPaths = await TrackingPathModel.find();
    res.status(200).json({ TrackingPaths });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch TrackingPaths', error: error.message });
  }
}

const createTrackingPath = async (req, res) => {
  try {
    const TrackingPath = await TrackingPathModel.create(req.body);
    res.status(201).json({ TrackingPath });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create TrackingPath', error: error.message });
  }
}

const updateTrackingPath = async (req, res) => {
  try {
    const updatedTrackingPath = await TrackingPathModel.findByIdAndUpdate
      (req.body);
    res.status(200).json({ updatedTrackingPath });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update TrackingPath', error: error.message });
  }
}

const deleteTrackingPath = async (req, res) => {
  try {
    const deletedTrackingPath = await TrackingPathModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ deletedTrackingPath });
  }
  catch (error) {
    res.status(500).json({ message: 'Failed to delete TrackingPath', error: error.message });
  }
}

module.exports = {
  getTrackingPaths,
  createTrackingPath,
  updateTrackingPath,
  deleteTrackingPath
};
