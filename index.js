import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

import UserRouter from "./routes/user.routes.js";
import AuthRouter from "./routes/auth.routes.js";
import ListingRouter from "./routes/listing.routes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

//   next();
// });

app.use("/api/user", UserRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/listing", ListingRouter);

app.get("/", (req, res) => {
  res.send("API working!");
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

mongoose
  .connect(process.env.MONGO_CONNECT)
  .then(() => {
    app.listen(process.env.PORT || 3000);
    console.log("→ Connected to MongoDB! 👌");
  })
  .catch((error) => {
    console.log(error);
  });
