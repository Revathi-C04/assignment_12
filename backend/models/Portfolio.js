const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  degree: String,
  college: String,
  cgpa: String
}, { _id: false });

const skillSchema = new mongoose.Schema({
  name: String,
  percentage: { type: Number, min: 0, max: 100 }
}, { _id: false });

const internshipSchema = new mongoose.Schema({
  title: String,
  icon: String,
  description: String,
  points: [String]
}, { _id: false });

const portfolioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: String,
  welcomeText: String,
  homeDescription: String,
  careerObjective: String,
  aboutDescription: String,
  contact: {
    address: String,
    phone: String,
    email: String
  },
  education: [educationSchema],
  skills: [skillSchema],
  internship: [internshipSchema]
}, { timestamps: true });

module.exports = mongoose.model("Portfolio", portfolioSchema);
