import { z } from 'zod';
import { Gender, type NewPatient } from './types.ts';

const parseNewPatient = (object: unknown): NewPatient => {
  const parsedPatient = newPatientSchema.parse(object);
  return { ...parsedPatient, entries: [] };

};

export default parseNewPatient;

const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
});


