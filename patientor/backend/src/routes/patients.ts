import { z } from 'zod';
import express from 'express';
import patientsService from '../services/patientsService.ts';
import parseNewPatient, { parseNewEntry } from '../utils.ts';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
  const patient = patientsService.getPatientById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.status(404).send({ error: 'Patient not found' });
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = parseNewPatient(req.body);
    const savedPatient = patientsService.addPatient(newPatient);
    res.send(savedPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send(error.issues);
      return;
    } else {
      res.status(400).send({ error: 'unknown error' });
    }
  }
});

router.post('/:id/entries', (req, res) => {
  const patient = patientsService.getPatientById(req.params.id);
  if (!patient) {
    res.status(404).send({ error: 'Patient not found' });
    return;
  }

  try {
    const newEntry = parseNewEntry(req.body);
    const savedEntry = patientsService.addEntryToPatient(
      req.params.id,
      newEntry
    );
    res.send(savedEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send(error.issues);
      return;
    }
    res.status(400).send({ error: 'Invalid entry data' });
  }
});

export default router;
