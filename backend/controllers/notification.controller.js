import notification from "../models/notification.js";

export const createNotification = async (req, res) => {
  try {
    const newNotification = new notification(req.body);
    const savedNotification = await newNotification.save();
    res.status(201).json(savedNotification);
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
};

export const getNotifications = async (req, res) => {
  try {
    const notifications = await notification.find();
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;  
    const deletedNotification = await notification.findByIdAndDelete(id);
    if (!deletedNotification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.status(200).json({ message: "Notification deleted successfully" });
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};


