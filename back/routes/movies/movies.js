import express from 'express';

import set from '../settingSql';

const router = express.Router();

/* post new movie */
router.post('/', (req, res) => {
  set.query('INSERT INTO _Movies SET ? ', req.body, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.sendStatus(200);
    }
  });
});

/* get movies search */
router.get('/find/', (req, res) => {
  set.query(`SELECT id, title, descript, likes, picture FROM _Movies WHERE title LIKE '%${req.query.word}%' ORDER BY RAND()`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

/* put movies  */
router.put('/:id', (req, res) => {
  set.query('UPDATE `_Movies` SET ? WHERE `id`= ?', [req.body, req.params.id], (err) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ res: true });
    }
  });
});

/* delete movies  */
router.delete('/:id', (req, res) => {
  set.query('DELETE FROM`_Movies` WHERE`id` = ?', req.params.id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

/* add like movies  */
router.put('/like/:id', (req, res) => {
  set.query('UPDATE _Movies SET likes = likes + 1 WHERE id=?', req.params.id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

/* get picture movies */
router.get('/carousel/', (req, res) => {
  set.query('SELECT picture FROM _Movies ORDER BY RAND() LIMIT 3', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

export default router;
