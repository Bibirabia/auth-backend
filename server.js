require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL ? process.env.CLIENT_URL.split(",") : "*" }));
app.use(express.json());

// Connect to MongoDB before handling any request
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ message: "Database connection failed: " + err.message });
  }
});

app.get("/", (req, res) => res.json({ message: "MERN Auth API is running" }));
app.use("/api/auth", require("./routes/auth"));

// Local development only. On Vercel the app is exported below.
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

module.exports = app;
