const { Router } = require('express');

const router = Router();
const connection = require('../conf');

router.get('/', (req, res) => {
  const query = `SELECT
  ac.id,
  ac.title,
  ac.description,
  ac.picture
  FROM act ac
  JOIN act_artist aa
  ON ac.id = aa.id_act
  JOIN artist ar
  ON ar.id = aa.id_artist
  `;
  connection.query(query, (err, results) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(results);
    }
  });
});

router.get('/:id/artist', (req, res) => {
  const idAct = req.params.id;
  const query = `SELECT
  ar.id idArtist
  ac.id idAct,
  CONCAT(ar.firstname, ' ', ar.lastname) fullname
  FROM act ac
  JOIN act_artist aa
  ON ac.id = aa.id_act
  JOIN artist ar
  ON ar.id = aa.id_artist
  WHERE ac.id = ?
  `;
  connection.query(query, idAct, (err, results) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(results);
    }
  });
});

router.post('/', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO act SET ?', formData, () => {
    res.sendStatus(200);
  });
});

router.put('/:id', (req, res) => {
  const idAct = req.params.id;
  const formData = req.body;
  connection.query('UPDATE act SET ? WHERE id = ?', [formData, idAct], (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

router.delete('/:id', (req, res) => {
  const idAct = req.params.id;
  connection.query('DELETE FROM act WHERE id = ?', [idAct], (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

router.post('/artist', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO act_artist SET ?', formData, () => {
    res.sendStatus(200);
  });
});

router.delete('/:idAct/artist/idArtist', (req, res) => {
  const { idAct } = req.params;
  const { idArtist } = req.params;
  connection.query('DELETE FROM act_artist WHERE id_act = ? AND id_artist = ?', [idAct, idArtist], (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;
