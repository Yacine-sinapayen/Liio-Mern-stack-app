import express from "express";
import mongoose from "mongoose";
import { mongoDBURL, PORT } from "./config.js";
import Book from "./models/bookModel.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.get("/", (req, response) => {
  console.log(req);
  return response.status(234).send("Hello route get");
});

// CREATE Route to save a new book
app.post("/books", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message:
          "Veuillez renseigner tous les champs : titre, auteur, année de publication",
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Book.create(newBook);
    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// GET all books
app.get("/books", async (request, response) => {
  try {
    const books = await Book.find();
    // Le return ci-dessous nous renvoie une collection de données
    // return response.status(200).send(books);

    // Le return ci-dessous nous renvoie un objet structuré d'une autre manière
    return response.status(200).send({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route GET book by id
app.get("/books/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

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
