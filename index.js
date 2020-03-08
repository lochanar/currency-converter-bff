import express from 'express';
import router from './api/v1/routes/index';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'));
app.use('/api/v1/', router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
