
const mongoose = require("mongoose");

const investigationSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      required: true,
      trim: true
    },
    platform: {
      type: String,
      required: true,
      trim: true
    },
    targetUrl: {
      type: String,
      default: "",
      trim: true
    },
    riskScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    riskLevel: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Low"
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending"
    },
    findings: {
      type: [String],
      default: []
    },
    notes: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Investigation",
  investigationSchema
);
