import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FemaleOutlined,
  MaleOutlined,
  TransgenderOutlined,
} from "@mui/icons-material";
import type { Patient } from "../../types";
import PatientService from "../../services/patients";
import DiagnosisService from "../../services/diagnoses";
import PatientEntry from "./PatientEntry";
import HealthCheckForm from "./EntryTypeForms/HealthCheckForm";
import OccupationalHealthcareForm from "./EntryTypeForms/OccupationalHealthcareForm";
import HospitalForm from "./EntryTypeForms/HospitalForm";

import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";


export const DiagnosisList = ({ diagnosisCodes, diagnoses }: { diagnosisCodes: string[] | undefined; diagnoses: Record<string, string> }) => {
    if (!diagnosisCodes || diagnosisCodes.length === 0) {
        return null;
    }

    return (
        <ul>
            {diagnosisCodes.map((code) => (
                <li key={code}>
                    {code} {diagnoses[code] || "Unknown diagnosis"}
                </li>
            ))}
        </ul>
    );
};

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Record<string, string>>({});
  const [entryType, setEntryType] = useState<"healthCheck" | "occupationalHealthcare" | "hospital" | null>(null);
  const [entryAdded, setEntryAdded] = useState(false);

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
    const fetchDiagnoses = async () => {
      try {
        const fetchedDiagnoses = await DiagnosisService.getAll();
        const diagnosesMap: Record<string, string> = {};
        fetchedDiagnoses.forEach((diagnosis) => {
          diagnosesMap[diagnosis.code] = diagnosis.name;
        });
        setDiagnoses(diagnosesMap);
      } catch (error) {
        console.error("Error fetching diagnoses:", error);
      }
    };

    void fetchPatient();
    fetchDiagnoses();
  }, [id, entryAdded]);
  
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
          {!entryType && (
            <Button
              variant="contained"
              onClick={() => setEntryType("healthCheck")}
              sx={{ alignSelf: "flex-start", mt: 2 }}
            >
              Add New Entry
            </Button>
          )}
          {entryType && (
            <Card sx={{ mt: 1 }}>
              <CardContent>
                <Stack spacing={2}>
                  <FormControl fullWidth>
                    <InputLabel id="entry-type-label">Entry type</InputLabel>
                    <Select
                      labelId="entry-type-label"
                      value={entryType}
                      label="Entry type"
                      onChange={(event) => setEntryType(event.target.value as typeof entryType)}
                    >
                      <MenuItem value="healthCheck">Health check</MenuItem>
                      <MenuItem value="occupationalHealthcare">Occupational healthcare</MenuItem>
                      <MenuItem value="hospital">Hospital</MenuItem>
                    </Select>
                  </FormControl>
                  <Button
                    variant="outlined"
                    onClick={() => setEntryType(null)}
                    sx={{ alignSelf: "flex-start" }}
                  >
                    Cancel
                  </Button>
                  {entryType === "healthCheck" && (
                    <HealthCheckForm setEntryAdded={setEntryAdded} diagnoses={diagnoses} />
                  )}
                  {entryType === "occupationalHealthcare" && (
                    <OccupationalHealthcareForm setEntryAdded={setEntryAdded} diagnoses={diagnoses} />
                  )}
                  {entryType === "hospital" && (
                    <HospitalForm setEntryAdded={setEntryAdded} diagnoses={diagnoses} />
                  )}
                </Stack>
              </CardContent>
            </Card>
          )}
        </Stack>
        ) : (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
          <CircularProgress size={20} />
          <Typography>Loading patient data...</Typography>
        </Box>
      )}
      {patient?.entries?.map((entry) => (
        <PatientEntry key={entry.id} entry={entry} />
      )) }
      <DiagnosisList diagnosisCodes={patient?.entries[0]?.diagnosisCodes} diagnoses={diagnoses} />
    </>
  );
};

export default PatientPage;