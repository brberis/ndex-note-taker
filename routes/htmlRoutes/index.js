const path = require('path');
const router = require('express').Router();

// landing page route
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// notes route
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/notes.html'));
});

// rest 
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;
