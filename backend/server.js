const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Portfolio = require("./models/Portfolio");
const Message = require("./models/Message");

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/", (req, res) => res.send("Revathi portfolio API is running"));

app.get("/api/portfolio", async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio data not found" });
    }
    return res.status(200).json(portfolio);
  } catch (error) {
    console.error("Portfolio GET error:", error);
    return res.status(500).json({ message: "Unable to retrieve portfolio" });
  }
});

app.post("/api/messages", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (![name, email, subject, message].every(
      value => typeof value === "string" && value.trim()
    )) {
      return res.status(400).json({ message: "Please complete all form fields." });
    }

    const savedMessage = await Message.create({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim()
    });

    return res.status(201).json({
      message: "Your message has been received successfully.",
      id: savedMessage._id
    });
  } catch (error) {
    console.error("Message POST error:", error);
    return res.status(500).json({ message: "Unable to save your message." });
  }
});

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");

    const existingPortfolio = await Portfolio.findOne();
    if (!existingPortfolio) {
      await Portfolio.create({
        name: "Revathi C",
        role: "Computer Science Graduate",
        welcomeText: "WELCOME TO MY PORTFOLIO",
        homeDescription: "Motivated and detail-oriented Computer Science graduate passionate about programming, problem solving and technology.",
        careerObjective: "Motivated and detail-oriented Computer Science graduate seeking a software developer role where I can apply my programming skills, problem-solving abilities and passion for technology to develop efficient and user-focused applications.",
        aboutDescription: "I am a Computer Science graduate interested in software development and programming. I enjoy learning new technologies and improving my technical and problem-solving skills. My goal is to build useful and efficient applications while continuously developing my knowledge.",
        contact: {
          address: "Ushas (H), Thariyattuthazham, Edakkad (PO), Kozhikode - 673005",
          phone: "6282894883",
          email: "revathycrajesh@gmail.com"
        },
        education: [{
          degree: "BSc Computer Science",
          college: "Sea College of Science Commerce and Arts",
          cgpa: "9.12"
        }],
        skills: [
          { name: "Python", percentage: 90 },
          { name: "Java", percentage: 80 },
          { name: "HTML", percentage: 90 }
        ],
        internship: [{
          title: "Python Internship",
          icon: "🐍",
          description: "Completed a Python internship gaining practical experience in Python programming and software development fundamentals.",
          points: [
            "Python programming",
            "Programming fundamentals",
            "Software development concepts",
            "Problem solving"
          ]
        }]
      });
      console.log("Initial portfolio data inserted");
    }

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Backend running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Unable to start backend:", error.message);
    process.exit(1);
  }
}

startServer();
