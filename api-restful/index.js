console.log("API RESTful");

import express from "express";

import { logginMiddleware } from "./logger.js";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

let users = [
  { id: 1, name: "Tomas", email: "tomykorzu@icloud.com" },
  { id: 2, name: "Carlos", email: "carlos@icloud.com" },
  { id: 3, name: "Silvana", email: "silvana@icloud.com" },
];

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((user) => user.id === parseInt(id));
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

app.patch("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((user) => user.id === parseInt(id));
  if (user) {
    if (!req.body.name || !req.body.email) {
      res.status(400).json({ message: "You must to complete all" });
    }
    user.name = req.body.name;
    user.email = req.body.email;
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  users = users.filter((user) => user.id !== parseInt(id));
  res.status(200).json({ message: `User ${id} deleted` });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

app.use(logginMiddleware);

app.post("/info", (req, res) => {
  res.json(req.body);
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
