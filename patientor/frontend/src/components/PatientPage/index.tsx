import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FemaleOutlined,
  MaleOutlined,
  TransgenderOutlined,
} from "@mui/icons-material";
import type { Patient } from "../../types";
import PatientService from "../../services/patients";
import PatientEntry from "./PatientEntry";

import {
  Box,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";


const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) {
        return;
      }

      try {
        const fetchedPatient = await PatientService.getById(id);
        setPatient(fetchedPatient);
      } catch (error) {
        console.error("Error fetching patient:", error);
      }
    };

    void fetchPatient();
  }, [id]);
  
  const genderIcon = (gender: string) => {
    switch (gender) {
      case "male":
        return <MaleOutlined />;
      case "female":
        return <FemaleOutlined />;
      default:
        return <TransgenderOutlined />;
    }
  };

  return (
    <>
      <Typography variant="h4" component="h2" gutterBottom>
        Patient Page
      </Typography>

      {patient ? (
        <Stack spacing={1.5}>
          <Typography variant="h5">{patient.name} {genderIcon(patient.gender)}</Typography>
          <Typography><strong>SSN:</strong> {patient.ssn}</Typography>
          <Typography><strong>Occupation:</strong> {patient.occupation}</Typography>
          <Typography><strong>Date of Birth:</strong> {patient.dateOfBirth}</Typography>
        </Stack>
      ) : (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
          <CircularProgress size={20} />
          <Typography>Loading patient data...</Typography>
        </Box>
      )}
      <PatientEntry entry={patient?.entries[0]} />
    </>
  );
};

export default PatientPage;