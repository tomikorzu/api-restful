console.log("API RESTful");

import express from "express";

import { logger, authenticate, validateUser } from "./logger.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(logger);

let users = [
  { id: 1, name: "Tomas", email: "tomykorzu@icloud.com" },
  { id: 2, name: "Carlos", email: "carlos@icloud.com" },
  { id: 3, name: "Silvana", email: "silvana@icloud.com" },
];

app.get("/users", authenticate, (req, res) => {
  res.json(users);
});

app.get("/users/:id", authenticate, (req, res) => {
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

app.patch("/users/:id", authenticate, (req, res) => {
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

app.delete("/users/:id", authenticate, (req, res) => {
  const id = req.params.id;
  users = users.filter((user) => user.id !== parseInt(id));
  res.status(200).json({ message: `User ${id} deleted` });
});

app.post("/register", validateUser, (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.username,
    email: req.body.email,
  };
  users.push(newUser);
  res.status(201).json({ message: "User register succesful", user: newUser });
});

app.get("/protected", authenticate, (req, res) => {
  res.json({ message: "Access allow" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Error in the server");
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
