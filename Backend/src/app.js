const express = require('express');
const connectDB = require('./db/db');
const Note = require("./models/Note");
connectDB();
const app = express();
app.use(express.json());

app.post("/notes", async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = new Note({
      title,
      content,
    });

    const savedNote = await note.save();

    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.get("/notes", async (req, res) => {
  try {
    const notes = await Note.find();

    res.status(200).json({
      success: true,
      count: notes.length,
      data: notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// Delete Note
app.delete("/notes/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
      data: note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Update Note
app.patch("/notes/:id", async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,          // Return updated document
        runValidators: true // Apply schema validations
      }
    );

    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: updatedNote
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});




module.exports = app;