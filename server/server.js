const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./User");

require("dotenv").config({ path: "./config.env" });

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 Replace with your connection string
mongoose.connect(process.env.ATLAS_URI)
.then(() => {
  console.log("✅ MongoDB Connected");

  app.listen(5000, () => {
    console.log("✅ Server running on port 5000");
  });
})
.catch((err) => {
  console.log("❌ MongoDB Connection Failed:");
  console.log(err);
});

// test route
app.get("/", (req, res) => {
  res.send("API is running test");
});

const achievementSchema = new mongoose.Schema({
  title: String,
  description: String,
  userId: String,
  hiddenDetails: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Achievement = mongoose.model("Achievement", achievementSchema);

app.get("/add", async (req, res) => {
  try {
    const newAchievement = new Achievement({
      title: "First Scan",
      description: "Scanned a QR code",
      userId: "user123",
      hiddenDetails: "Secret info"
    });

    await newAchievement.save();

    res.send("Achievement saved!");
  } catch (err) {
    console.error("FULL ERROR:", err);
  console.error("ERROR NAME:", err.name);
  console.error("ERROR MESSAGE:", err.message);

  res.status(500).send(err.message);
  }
});

// Route to get all achievements
app.get("/achievements", async (req, res) => {
  try {
    const achievements = await Achievement.find();
    res.json(achievements);
    console.log("Achievements retrieved:", achievements);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Route to get achievements for a specific user
app.get("/achievements/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const achievements = await Achievement.find({ userId });
    res.json(achievements);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


app.post("/register", async (req, res) => {
    
  try {
    console.log("Received registration data:");
    const { username, email, password } = req.body;

    const user = new User({
      username,
      email,
      password
    });

    await user.save();

    res.json({ message: "User created!", user });
  } catch (err) {
    res.status(500).send(err.message);
  }
});