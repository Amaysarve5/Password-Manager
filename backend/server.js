import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB Atlas"))
.catch(err => console.error("MongoDB connection error:", err));

// Schema + Model
const passwordSchema = new mongoose.Schema({
  site: String,
  username: String,
  password: String,
  id: String,  // keep your uuidv4 id
});

const Password = mongoose.model("Password", passwordSchema);

// Routes

// Get all passwords
app.get("/", async (req, res) => {
  try {
    const passwords = await Password.find();
    res.json(passwords);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Save new password
app.post("/", async (req, res) => {
  try {
    const newPassword = new Password(req.body);
    await newPassword.save();
    res.json({ success: true, data: newPassword });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a password
app.delete("/", async (req, res) => {
  try {
    const { id } = req.body;
    await Password.deleteOne({ id });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
