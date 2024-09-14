const mongoose = require("mongoose");

const lectureSchema = mongoose.Schema({
  public_id: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  numOfComments: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Lecture", lectureSchema);
