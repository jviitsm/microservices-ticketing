const express = require("express");
import { json } from "body-parser";

const app = express();
const port = 3000;

app.use(json());

app.get("/api/users/currentuser", (req: any, res: any) => {
  res.send("Hi there!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
