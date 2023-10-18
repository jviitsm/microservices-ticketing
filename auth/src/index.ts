import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import { errorHandler } from "./middlewares/errorHandler";

import { NotFoundError } from "./errors/notFoundError";
import { currentUserRouter } from "./routes/currentUser";
import { signInRouter } from "./routes/signIn";
import { signOutRouter } from "./routes/signOut";
import { signUpRouter } from "./routes/signUp";

const port = process.env.PORT || 3000;

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(cookieSession({ signed: false, secure: true }));

const routes = [currentUserRouter, signInRouter, signOutRouter, signUpRouter];

routes.forEach((route) => {
  app.use(route);
});

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

start();
