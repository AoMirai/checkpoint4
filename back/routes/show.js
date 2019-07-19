const { Router } = require('express');

const router = Router();
const connection = require('../conf');

router.get('/', (req, res) => {
  const query = `SELECT
  s.id,
  s.date,
  c.name city,
  s.id_city
  FROM circusShow s
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
  connection.query('INSERT INTO circusShow SET ?', formData, () => {
    res.sendStatus(200);
  });
});

router.put('/:id', (req, res) => {
  const idShow = req.params.id;
  const formData = req.body;
  connection.query('UPDATE circusShow SET ? WHERE id = ?', [formData, idShow], (err) => {
    if (err) {
      console.log(err);
      
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

router.delete('/:id', (req, res) => {
  const idShow = req.params.id;
  connection.query('DELETE FROM circusShow WHERE id = ?', [idShow], (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;
