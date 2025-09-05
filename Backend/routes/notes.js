import express from "express";
import Note from "../models/Note.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Note
router.post("/", authMiddleware, async (req, res) => {
  try {
    const note = new Note({ ...req.body, userId: req.userId });
    await note.save();
    res.json(note);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Read Notes
router.get("/", authMiddleware, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.userId });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Update Note
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    res.json(note);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Delete Note
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Note.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    res.json({ msg: "Note deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export default router;
