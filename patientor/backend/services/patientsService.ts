import patientsData from '../data/patients.ts';
import type { NonSensitivePatient } from '../types.ts';

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patientsData.map((patient) => {
    const { ssn, ...nonSensitivePatient } = patient;
    return nonSensitivePatient;
  });
};

export default { getNonSensitivePatients };