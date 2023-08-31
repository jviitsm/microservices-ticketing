import express from "express";
import "express-async-errors";
import { json } from "body-parser";

// Routes
import { currentUserRouter } from "./routes/currentUser";
import { signInRouter } from "./routes/signIn";
import { signOutRouter } from "./routes/signOut";
import { signUpRouter } from "./routes/signUp";

// Error
import { errorHandler } from "./middlewares/errorHandler";
import { NotFoundError } from "./errors/notFoundError";

const app = express();
const port = process.env.PORT || 3000;

app.use(json());

const routes = [currentUserRouter, signInRouter, signOutRouter, signUpRouter];

routes.forEach((route) => {
  app.use(route);
});

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
