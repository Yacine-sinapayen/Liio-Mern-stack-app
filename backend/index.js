import express from "express";
import mongoose from "mongoose";
import BooksRoute from "./routes/booksRoute.js";
import cors from "cors";
import dotenv from "dotenv";


// Allow us to use .env file
dotenv.config();
const app = express();
const MONGODB_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT;

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS
// option 1 Allow all origins with default of cors(*)
app.use(cors());
// Option 2 Allow only specific origins
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET,POST,PUT,DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.get("/", (req, response) => {
  console.log(req);
  return response.status(234).send("Hello route get");
});

app.use("/books", BooksRoute);

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening top port : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
