import axios from "axios";
import type { NewHealthCheckEntry, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getById = async (id: string) => {
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const addHealthCheckEntry = async (patientId: string, entry: NewHealthCheckEntry) => {
  try {
    const { data } = await axios.post(
      `${apiBaseUrl}/patients/${patientId}/entries`,
      entry
    );

    return data;
  } catch (error) {
    console.error("Error adding health check entry:", error);
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      } else {
        console.error("Error message:", error.message);
      }
    }
    throw error;
  }
};

export default {
  getAll, getById, create, addHealthCheckEntry
};


