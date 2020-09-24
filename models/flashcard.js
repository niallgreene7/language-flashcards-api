/* eslint-disable quotes */
/* eslint-disable import/newline-after-import */
const mongoose = require("mongoose");

const flashcardSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  initialPhrase: {
    type: String,
    required: true,
    trim: true,
  },
  translatedPhrase: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
  },
  translateFrom: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
  },
  translateTo: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
  },
});

const Flashcard = mongoose.model("Flashcard", flashcardSchema);

module.exports = Flashcard;
