const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  type: {
    type: String
  },
  message: {
    type: String
  },
  createdAt: {
    type: Date,
    expires: 86400,
    default: Date.now,

  }
});

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification