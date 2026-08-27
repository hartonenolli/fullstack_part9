import { v4 as uuidv4 } from 'uuid';
import patientsData from '../../data/patients.ts';
import type { NonSensitivePatient, NewPatient } from '../types.ts';

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

export default { getNonSensitivePatients, addPatient, getPatientById };
