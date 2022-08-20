const router = require('express').Router();
const { v1: uuidv1 } = require('uuid');
const { notes } = require('../../db/db.json');
const { findById, createNewNote, validateNote, deleteNote } = require('../../lib/notes');

console.log(notes.length);
router.get('/notes', (req, res) => {
  let results = notes;
  res.json(results);
});

router.post('/notes', (req, res) => {
  // set unique id to note (time-based version)
  req.body.id = uuidv1();

  if (!validateNote(req.body)) {
    res.status(400).send('The note is not properly formatted.');
  } else {
    const note = createNewNote(req.body, notes);
    res.json(note);
  }
});

router.delete('/note/:id', (req, res) => {
  const note = findById(req.params.id, notes);
  if (note) {
    const result = deleteNote(note, notes);
    res.json(result);
  } else {
    res.send(404);
  }
});

module.exports = router;
