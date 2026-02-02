import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

import "./model/qns-model.js";
import admin from "./routes/admin-routes.js";
import quiz from "./routes/quiz-routes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/admin", admin);
app.use("/quiz", quiz);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/quiz-page", (req, res) => {
  res.render("quiz");
});

app.get("/admin-page", (req, res) => {
  res.render("admin");
});


const MONGO_URL = process.env.MONGO_URL?.trim();

if (!MONGO_URL) {
  console.error("MONGO_URL is missing in .env");
  process.exit(1);
}

async function connectDb() {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
  }
}
connectDb();
// -------------------------------------------------------------------

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
