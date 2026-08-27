import { v4 as uuidv4 } from 'uuid';
import patientsData from '../../data/patients.ts';
import type { NonSensitivePatient, NewPatient, Entry } from '../types.ts';

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patientsData.map((patient) => {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const { ssn, ...nonSensitivePatient } = patient;
    return nonSensitivePatient;
  });
};

const getPatientById = (id: string) => {
  const patient = patientsData.find((p) => p.id === id);
  return patient;
};

const addPatient = (newPatient: NewPatient) => {
  const newId = uuidv4();
  const patientToAdd = {
    id: newId,
    ...newPatient,
  };
  patientsData.push(patientToAdd);
  return patientToAdd;
};

const addEntryToPatient = (patientId: string, newEntry: Entry) => {
  const patient = patientsData.find((p) => p.id === patientId);
  if (!patient) {
    throw new Error('Patient not found');
  }
  const newEntryWithId = { ...newEntry, id: uuidv4() };
  patient.entries.push(newEntryWithId);
  return newEntryWithId;
};

export default { getNonSensitivePatients, addPatient, getPatientById, addEntryToPatient };
