import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import PatientService from "../../../services/patients";
import type { NewHealthCheckEntry } from "../../../types";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from '@mui/material';

const healthCheckRatings = [
  { value: 0, label: '0 - Healthy' },
  { value: 1, label: '1 - Low risk' },
  { value: 2, label: '2 - High risk' },
  { value: 3, label: '3 - Critical risk' },
] as const;

type HealthCheckFormProps = {
    setEntryAdded: React.Dispatch<React.SetStateAction<boolean>>;
    diagnoses: Record<string, string>;
};

const HealthCheckForm = ({ setEntryAdded, diagnoses }: HealthCheckFormProps) => {
    const { id } = useParams<{ id: string }>();
    const [newEntry, setNewEntry] = useState<NewHealthCheckEntry>({
        type: "HealthCheck",
        date: "",
        description: "",
        specialist: "",
        healthCheckRating: 0,
        diagnosisCodes: [],
    });
    const [error, setError] = useState<string | null>(null);

    const handleChange = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        try {
            const addedEntry = await PatientService.addEntry(id!, newEntry);
            setNewEntry({
                type: "HealthCheck",
                date: "",
                description: "",
                specialist: "",
                healthCheckRating: 0,
                diagnosisCodes: [],
            });
            console.log("Entry added:", addedEntry);
            setEntryAdded(true);
        } catch (error) {
        if (axios.isAxiosError(error)) {
            const responseError = error.response?.data;

            setError(
                Array.isArray(responseError)
                    ? responseError.map((issue) => issue.message).join(", ")
                    : "Invalid entry data"
            );
            } else {
                setError("Unknown error");
            }

            setTimeout(() => {
                setError(null);
            }, 5000);
        }};

    return (
        <Card variant="outlined" sx={{ marginTop: 2 }}>
            <CardContent>
                <Typography variant="h6" component="h3">
                    Add Health Check Entry
                </Typography>
                {error && (
                    <Typography color="error" variant="body2">
                        {error}
                    </Typography>
                )}
                <form onSubmit={handleChange}>
                    <TextField
                        label="Date"
                        type="date"
                        value={newEntry.date}
                        onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Description"
                        value={newEntry.description}
                        onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Specialist"
                        value={newEntry.specialist}
                        onChange={(e) => setNewEntry({ ...newEntry, specialist: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="health-check-rating-label">Health Check Rating</InputLabel>
                        <Select
                            labelId="health-check-rating-label"
                            value={newEntry.healthCheckRating}
                            label="Health Check Rating"
                            onChange={(e) =>
                                setNewEntry({
                                    ...newEntry,
                                    healthCheckRating: Number(e.target.value) as 0 | 1 | 2 | 3,
                                })
                            }
                        >
                            {healthCheckRatings.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="diagnosis-codes-label">Diagnosis codes</InputLabel>
                        <Select
                            labelId="diagnosis-codes-label"
                            multiple
                            value={newEntry.diagnosisCodes}
                            onChange={(e) =>
                                setNewEntry({
                                    ...newEntry,
                                    diagnosisCodes: e.target.value as string[],
                                })
                            }
                            input={<OutlinedInput label="Diagnosis codes" />}
                            renderValue={(selected) => (selected as string[]).join(', ')}
                        >
                            {Object.keys(diagnoses).map((code) => (
                                <MenuItem key={code} value={code}>
                                    {code} - {diagnoses[code]}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
                        Add
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default HealthCheckForm;