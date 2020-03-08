import express from 'express';
import getCountry from '../controller';

const router = express.Router();

router.get('/countries/:name', getCountry);

export default router;