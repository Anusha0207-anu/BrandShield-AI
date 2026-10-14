
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Investigation = require("../models/Investigation");

// Convert frontend status labels to database status values.
function normalizeStatus(status) {
  const statusMap = {
    Open: "Pending",
    "In Review": "In Progress",
    Resolved: "Completed",
  };

  return statusMap[status] || status;
}

// Create an investigation from a scanner result.
router.post("/", async (req, res) => {
  try {
    const {
      brandName,
      platform,
      targetUrl = "",
      riskScore = 0,
      riskLevel = "Low",
      status = "Pending",
      findings = [],
      notes = "",
    } = req.body;

    if (
      typeof brandName !== "string" ||
      !brandName.trim() ||
      typeof platform !== "string" ||
      !platform.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Brand name and platform are required.",
      });
    }

    const score = Number(riskScore);

    if (!Number.isFinite(score) || score < 0 || score > 100) {
      return res.status(400).json({
        success: false,
        message: "Risk score must be a number between 0 and 100.",
      });
    }

    if (!Array.isArray(findings)) {
      return res.status(400).json({
        success: false,
        message: "Findings must be an array.",
      });
    }

    const investigation = new Investigation({
      brandName: brandName.trim(),
      platform: platform.trim(),
      targetUrl:
        typeof targetUrl === "string" ? targetUrl.trim() : "",
      riskScore: score,
      riskLevel,
      status: normalizeStatus(status),
      findings: findings.filter(
        (item) => typeof item === "string"
      ),
      notes: typeof notes === "string" ? notes : "",
    });

    const saved = await investigation.save();

    return res.status(201).json({
      success: true,
      message: "Investigation saved successfully.",
      data: saved,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// Get all investigations.
router.get("/", async (req, res) => {
  try {
    const investigations = await Investigation.find()
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: investigations.length,
      data: investigations,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch investigations.",
    });
  }
});

// Update status, reviewer notes, or findings.
router.patch("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid investigation ID.",
      });
    }

    const allowedFields = ["status", "notes", "findings"];
    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (updates.status !== undefined) {
      updates.status = normalizeStatus(updates.status);
    }

    if (
      updates.notes !== undefined &&
      typeof updates.notes !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Reviewer notes must be text.",
      });
    }

    if (
      updates.findings !== undefined &&
      (!Array.isArray(updates.findings) ||
        !updates.findings.every((item) => typeof item === "string"))
    ) {
      return res.status(400).json({
        success: false,
        message: "Findings must be an array of text values.",
      });
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided for update.",
      });
    }

    const updated = await Investigation.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Investigation not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Investigation updated successfully.",
      data: updated,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// Get one investigation by ID.
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid investigation ID.",
      });
    }

    const investigation = await Investigation.findById(
      req.params.id
    );

    if (!investigation) {
      return res.status(404).json({
        success: false,
        message: "Investigation not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: investigation,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch investigation.",
    });
  }
});

module.exports = router;
