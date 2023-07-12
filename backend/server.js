const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const userRoute = require("./routes/userRoute");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Fix Cors
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes Middleware
app.use("/api/users", userRoute);

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the home page");
});

// errorHandler Should be the last middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Connect DB & start server
mongoose
  .connect(process.env.MONGO_URL)
  .then(() =>
    app.listen(PORT, () => {
      console.log("connected to db");
      console.log(`Server running on port ${PORT}...`);
    })
  )
  .catch((err) => console.log(err));
