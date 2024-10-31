import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import registerRoute from "./server/routes/users.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(bodyParser.json());

app.use("/users", registerRoute);

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
