import express from "express";

const router = express.Router();

router.post("/api/users/signUp", (req, res) => {
  res.send("Hi there!");
});

export { router as signUpRouter };
