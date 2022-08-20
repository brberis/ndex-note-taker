const fs = require('fs');
const path = require('path');

function findById(id, notesArray) {
  const result = notesArray.filter(note => note.id === id)[0];
  return result;
}

function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, '../db/db.json'),
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  return note;
}

function validateNote(note) {
  if (!note.title || typeof note.title !== 'string') {
    return false;
  }  
  if (!note.text || typeof note.text !== 'string') {
    return false;
  }
  return true;
}

function deleteNote(body, notesArray) {
  const note = body;
  // delete note from array using splice (filter wont work as sync promise)
  const index = notesArray.findIndex(obj => obj.id === note.id);
  notesArray.splice(index, 1);
  fs.writeFileSync(
    path.join(__dirname, '../db/db.json'),
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  return note;
}

module.exports = {
  findById,
  createNewNote,
  validateNote,
  deleteNote
};
