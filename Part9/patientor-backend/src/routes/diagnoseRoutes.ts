import express from 'express';
import { Diagnose } from '../models/diagnose';


const diagnoses: Array<Diagnose> = require('../../data/diagnoses.json');

const router = express.Router();

router.get('/api/diagnoses', (_req, res) => {
  res.json(diagnoses);
});

export default router;
