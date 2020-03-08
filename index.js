import express from 'express';
import router from './api/v1/routes/index';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { login, verifyAuth } from './login/index';

const app = express();
const port = 3001;

app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'));

const loginLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 2,
});

app.use('/login', loginLimit);
app.use('/login', login);

app.use(verifyAuth);
app.use('/api/v1/', router);
app.use((err, _req, res, next) => {
  if (err.status === 401) {
    res.status(401).json(err);
  } else {
    next(err);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
