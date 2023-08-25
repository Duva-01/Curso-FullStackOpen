import express from 'express';
import { Patient, PublicPatient } from '../models/patient';
import { patientValidationSchema } from '../utils/validation';

const patients: Array<Patient> = require('../../data/patients.json');

const router = express.Router();

router.get('/api/patients', (_req, res) => {
  const publicPatients: PublicPatient[] = patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
  res.json(publicPatients);
});

router.post('/api/patients', (req, res) => {
    const { error } = patientValidationSchema.validate(req.body);
  
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
  
    const newPatient = req.body;
    patients.push(newPatient);
    res.json(newPatient);
  });

export default router;
