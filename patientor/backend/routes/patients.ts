import express from 'express';
import patientsService from '../services/patientsService.ts';
import type { NewPatient } from '../types.ts';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
  const newPatient = req.body as NewPatient;
  const savedPatient = patientsService.addPatient(newPatient);
  res.send(savedPatient);
});

export default router;
