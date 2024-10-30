import { logger, authenticate } from "./middlewares/logger.js";
import userRouter from "routes/users.js";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(logger);

app.use("/users", userRouter);

app.get("/protected", authenticate, (req, res) => {
  res.status(200).json({ message: "Access allowed" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "There was a server error" });
});

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
