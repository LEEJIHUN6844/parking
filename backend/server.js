const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const authRouter = require('./src/routes/auth');

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
