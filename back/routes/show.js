const { Router } = require('express');

const router = Router();
const connection = require('../conf');

router.get('/', (req, res) => {
  const query = `SELECT
  s.id,
  s.date,
  c.id cityName
  FROM show s
  JOIN city c
  ON s.id_city = c.id
  `;
  connection.query(query, (err, results) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(results);
    }
  });
});

router.post('/', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO show SET ?', formData, () => {
    res.sendStatus(200);
  });
});

router.put('/:id', (req, res) => {
  const idShow = req.params.id;
  const formData = req.body;
  connection.query('UPDATE show SET ? WHERE id = ?', [formData, idShow], (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

router.delete('/:id', (req, res) => {
  const idShow = req.params.id;
  connection.query('DELETE FROM show WHERE id = ?', [idShow], (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;
