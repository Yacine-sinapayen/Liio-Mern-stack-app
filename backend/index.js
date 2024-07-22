import express from "express";
import mongoose from "mongoose";
import { mongoDBURL, PORT } from "./config.js";
import BooksRoute from "./routes/booksRoute.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.get("/", (req, response) => {
  console.log(req);
  return response.status(234).send("Hello route get");
});

app.use("/books", BooksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening top port : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
