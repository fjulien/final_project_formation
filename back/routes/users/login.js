import express from 'express';

import set from '../settingSql';

const router = express.Router();

/* post new user */
router.post('/', (req, res) => {
  set.query('INSERT INTO _Users SET ? ', req.body, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.sendStatus(200);
    }
  });
});

export default router;
