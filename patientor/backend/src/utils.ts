import { z } from 'zod';
import { Gender, type NewPatient, type Entry } from './types.ts';

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

const newEntrySchema = z.object({
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  type: z.enum(['HealthCheck', 'Hospital', 'OccupationalHealthcare']),
});

const healthCheckEntrySchema = newEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.number().int().min(0).max(3),
});

const hospitalEntrySchema = newEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: z.object({
    date: z.string(),
    criteria: z.string(),
  }),
});

const occupationalHealthcareEntrySchema = newEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string(),
  sickLeave: z.object({
    startDate: z.string(),
    endDate: z.string(),
  }).optional(),
});

const entrySchema = z.discriminatedUnion('type', [
  healthCheckEntrySchema,
  hospitalEntrySchema,
  occupationalHealthcareEntrySchema,
]);

export const parseNewEntry = (object: unknown): Entry => {
  return entrySchema.parse(object) as Entry;
};

