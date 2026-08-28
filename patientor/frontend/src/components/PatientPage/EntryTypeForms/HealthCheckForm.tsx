import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import PatientService from "../../../services/patients";
import type { NewHealthCheckEntry } from "../../../types";
import {
  Button,
  Card,
  CardContent,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';

const healthCheckRatings = [
  { value: 0, label: 'Healthy' },
  { value: 1, label: 'Low risk' },
  { value: 2, label: 'High risk' },
  { value: 3, label: 'Critical risk' },
] as const;

type HealthCheckFormProps = {
    setEntryAdded: React.Dispatch<React.SetStateAction<boolean>>;
};

const HealthCheckForm = ({ setEntryAdded }: HealthCheckFormProps) => {
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
            const addedEntry = await PatientService.addHealthCheckEntry(id!, newEntry);
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
                    <TextField
                        select
                        label="Health Check Rating"
                        value={newEntry.healthCheckRating}
                        onChange={(e) => {
                            const rating = healthCheckRatings.find(
                                (option) => option.value === Number(e.target.value),
                            );

                            if (rating) {
                                setNewEntry({ ...newEntry, healthCheckRating: rating.value });
                            }
                        }}
                        fullWidth
                        margin="normal"
                    >
                        {healthCheckRatings.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Diagnosis codes"
                        name="diagnosisCodes"
                        placeholder="Code 1, Code 2"
                        helperText="Separate multiple diagnosis codes with commas"
                        fullWidth
                        margin="normal"
                        value={newEntry.diagnosisCodes?.join(", ") || ""}
                        onChange={(e) => {
                            const codes = e.target.value.split(",").map((code) => code.trim());
                            setNewEntry({ ...newEntry, diagnosisCodes: codes });
                        }}
                    />
                    <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
                        Add Entry
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default HealthCheckForm;