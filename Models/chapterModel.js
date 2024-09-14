const mongoose = require("mongoose");

const chapterSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Chapter Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter book's Description"],
  },
  numOfLectures: {
    type: Number,
    default: 0,
  },
  lectures: [
    {
      numOfLectures: {
        type: Number,
        default: 0,
      },
      lectures: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Lecture",
        },
      ],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Chapter", chapterSchema);
