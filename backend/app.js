import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/userRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";

dotenv.config();

const app = express();

app.use(
  express.json({
    limit: "10mb",
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);
app.use(cookieParser());

// connecting to DB and running the server
mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("Connected to Database successfully..");
    app.listen(process.env.PORT, () => {
      console.log(`Server listening on Port: ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log(error));

// routes
app.use("/api", userRoutes);
app.use("/api", questionRoutes);
