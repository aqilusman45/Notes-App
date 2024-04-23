const Note = require("../models/note.js");

const fetchNotes = async (req, res) => {
  try {
    const notes = await Note.find({});
    res.json({ notes });
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.sendStatus(500);
  }
};

const fetchNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const note = await Note.findOne({ _id: noteId });
    res.json({ note });
  } catch (error) {
    console.error("Error fetching note:", error);
    res.sendStatus(500);
  }
};

const createNote = async (req, res) => {
  try {
    const { title, body } = req.body;
    const note = await Note.create({ title, body });
    res.json({ note });
  } catch (error) {
    console.error("Error creating note:", error);
    res.sendStatus(500);
  }
};

const updateNote = async (req, res) => {
  try {
    const user = req.user; // User object attached by middleware
    const noteId = req.params.id;
    const { title, body } = req.body;
    const updatedNote = await Note.findOneAndUpdate(
      { _id: noteId },
      { title, body },
      { new: true }
    );
    res.json({ note: updatedNote });
  } catch (error) {
    console.error("Error updating note:", error);
    res.sendStatus(500);
  }
};

const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    await Note.findOneAndDelete({ _id: noteId });
    res.json({ success: "Record deleted" });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.sendStatus(500);
  }
};

module.exports = {
  fetchNotes,
  fetchNote,
  createNote,
  updateNote,
  deleteNote,
};
