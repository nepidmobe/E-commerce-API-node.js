require("dotenv").config();
//we don't need try catch for async controllers and need not need to implement own wrapper next(err)
//so,use express-async-errors
require("express-async-errors");
const express = require("express");
const app = express();
//rest of Packages
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 3000;

const connectDB = require("./db/connect");

// routes import
const authRouter = require("./routes/authRoutes");

//middlewares
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
//Using process.env.JWT_SECRET(signature) as parameter signs our cookies as signed: true is set

// app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("dipen");
});
app.get("/api/v1", (req, res) => {
  //   console.log(req.cookies);
  console.log(req.signedCookies); //once cookie is signed it's going to be available in signed cookies

  res.send("dipen");
});
app.use("/api/v1/auth", authRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () => {
      console.log("listening on port...");
    });
  } catch (error) {
    console.log(error);
  }
};
start();
