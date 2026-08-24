import { z } from 'zod';
import { Gender, type NewPatient } from './types.ts';

const parseNewPatient = (object: unknown): NewPatient => {
  return newPatientSchema.parse(object);

};

export default parseNewPatient;

const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
});


