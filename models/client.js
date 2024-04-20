const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  place: {
    type: String,
  },
  entry: {
    type: String,
  },
  date: { type: String },
  location: {
    type: String,
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model("Event", EventSchema);
