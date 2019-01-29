import express from 'express';
import set from '../settingSql';

const path = require('path');

const router = express.Router();

/* send image with url */
const refreshImageMovie = () => {
  set.query('SELECT imageFileName FROM _Movies', (err, result) => {
    if (err) {
      console.error(err);
    } else {
      result.map(element =>
        router.get(`/images/${element.imageFileName}`, (req, res) => {
          res.sendFile(path.join(__dirname, `./images/${element.imageFileName}`));
        })
      );
    }
  });
};

refreshImageMovie();

/* post new image movie */
router.post('/upload', (req, res) => {
  const uploadFile = req.files.file;
  uploadFile.mv(`./routes/movies/images/${req.files.file.name}`, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      refreshImageMovie();
      res.sendStatus(200);
    }
  });
});

/* post new movie */
router.post('/', (req, res) => {
  set.query('INSERT INTO _Movies SET ? ', req.body, (errSql) => {
    if (errSql) {
      console.error(errSql);
    } else {
      refreshImageMovie();
      res.sendStatus(200);
    }
  });
});


/* get movies search */
router.get('/find/', (req, res) => {
  set.query(`SELECT id, title, descript, likes, picture, imageFileName FROM _Movies WHERE title LIKE '%${req.query.word}%' ORDER BY RAND()`, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.json(result);
    }
  });
});

/* put movies  */
router.put('/:id', (req, res) => {
  set.query('UPDATE `_Movies` SET ? WHERE `id`= ?', [req.body, req.params.id], (err) => {
    if (err) {
      console.error(err);
    } else {
      res.status(200).json({ res: true });
    }
  });
});

/* delete movies  */
router.delete('/:id', (req, res) => {
  set.query('DELETE FROM`_Movies` WHERE`id` = ?', req.params.id, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.json(result);
    }
  });
});

/* add like movies  */
router.put('/like/:id', (req, res) => {
  set.query('UPDATE _Movies SET likes = likes + 1 WHERE id=?', req.params.id, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.json(result);
    }
  });
});

/* get picture movies */
router.get('/carousel/', (req, res) => {
  set.query('SELECT picture, imageFileName FROM _Movies ORDER BY RAND()', (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.json(result);
    }
  });
});

export default router;
