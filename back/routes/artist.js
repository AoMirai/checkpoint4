const express = require('express');

const router = express.Router();

const connection = require('../conf');

router.get('/', (req, res) => {
  connection.query('SELECT id, firstname, lastname FROM artist', (err, results) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(results);
    }
  });
});

router.post('/', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO artist SET ?', formData, (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

router.put('/:id', (req, res) => {
  const idArtiste = req.params.id;
  const formData = req.body;
  connection.query('UPDATE artist SET ? WHERE id = ?', [formData, idArtiste], (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

router.delete('/:id', (req, res) => {
  const idArtiste = req.params.id;
  connection.query('DELETE FROM artist WHERE id = ?', [idArtiste], (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;
