// models/Portfolio.js – Mongoose schema for a portfolio site
// ---------------------------------------------------------------
// This schema captures typical portfolio data: personal info, skills,
// projects, experience, and social links. It uses an embedded document
// model to keep all portfolio information in a single collection, which
// is efficient for the read‑heavy pattern of a portfolio website.

const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema(
  {
    // Basic identification
    name: { type: String, required: true },
    email: { type: String, required: true },
    bio: { type: String },

    // Skills – simple array of strings (e.g., "JavaScript", "React")
    skills: [{ type: String }],

    // Projects – embedded documents for quick homepage rendering
    projects: [
      {
        title: { type: String, required: true },
        description: { type: String },
        link: { type: String }, // live demo or repo URL
        technologies: [{ type: String }],
        imageUrl: { type: String }, // optional thumbnail
        // You can add more fields (e.g., `date`, `featured`) later.
      }
    ],

    // Professional experience
    experience: [
      {
        company: { type: String, required: true },
        role: { type: String, required: true },
        startDate: { type: Date },
        endDate: { type: Date }, // leave null for current role
        description: { type: String }
      }
    ],

    // Social media and contact links
    socialLinks: {
      github: { type: String },
      linkedin: { type: String },
      twitter: { type: String },
      // Add other platforms as needed.
    }
  },
  {
    timestamps: true // adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model('Portfolio', PortfolioSchema);
