/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable no-lonely-if */
/* eslint-disable spaced-comment */
/* eslint-disable quotes */
/* eslint-disable import/newline-after-import */
const express = require("express");
const router = express();
const Flashcard = require("../models/flashcard");
const { json } = require("express");

//create a flashcard
router.post("/addFlashcard", async (req, res) => {
    const flashcard = await Flashcard({
        userID: req.body.userID,
        initialPhrase: req.body.initialPhrase,
        translatedPhrase: req.body.translatedPhrase,
        translateTo: req.body.translateTo,
    });

    try {
        const newFlashcard = await flashcard.save();
        res.status(201).json(newFlashcard);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//get all flashcard
router.get("/myFlashcards", async  (req, res) => {
  const userID = req.query.userID
  Flashcard
      .find({"userID" : userID })
      .then(
        (flashcard) => res.status(200).json(flashcard)
        )
      .catch(
        (err) => res.status(404).json({ error: "Flashcards cannot found." })
        );
  });

//delete a flashcard
router.delete("/deleteFlashcard", async  (req, res) => {
  const cardID = req.query.cardID
  Flashcard
      .findByPk(cardID)
      .then(
        Flashcard.destroy({ where: { id } }).then(() => {
          res.status(204).json({ message: 'Flashcard Deleted' });
        })
        )
      .catch(
        (err) => res.status(404).json({ error: "Flashcards cannot found." })
        );
  });

module.exports = router;

