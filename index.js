/* eslint-disable import/newline-after-import */
/* eslint-disable quotes */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-console */
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const db = mongoose.connection;
const userRouter = require("./routes/user");
const flashcardRouter = require("./routes/flashcard");

app.use(cors({ credentials: true, origin: true }));
app.options('*', cors());

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

db.on("error", (err) => console.error(err));
db.once("open", () => console.log("connected to db"));

app.use(express.json());

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
  app.use("/", userRouter);
  app.use("/", flashcardRouter);
});

module.exports = app;
