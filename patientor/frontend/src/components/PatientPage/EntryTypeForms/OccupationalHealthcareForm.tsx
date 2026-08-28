import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import PatientService from "../../../services/patients";
import type { NewOccupationalHealthcareEntry } from "../../../types";
import {
	Button,
	Card,
	CardContent,
	TextField,
	Typography,
} from "@mui/material";

type OccupationalHealthcareFormProps = {
	setEntryAdded: React.Dispatch<React.SetStateAction<boolean>>;
};

const OccupationalHealthcareForm = ({
	setEntryAdded,
}: OccupationalHealthcareFormProps) => {
	const { id } = useParams<{ id: string }>();
	const [newEntry, setNewEntry] = useState<NewOccupationalHealthcareEntry>({
		type: "OccupationalHealthcare",
		date: "",
		description: "",
		specialist: "",
		employerName: "",
		diagnosisCodes: [],
		sickLeave: {
			startDate: "",
			endDate: "",
		},
	});
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (event: React.SyntheticEvent) => {
		event.preventDefault();
		try {
			await PatientService.addEntry(id!, newEntry);
			setNewEntry({
				type: "OccupationalHealthcare",
				date: "",
				description: "",
				specialist: "",
				employerName: "",
				diagnosisCodes: [],
				sickLeave: { startDate: "", endDate: "" },
			});
			setEntryAdded(true);
		} catch (err) {
			if (axios.isAxiosError(err)) {
				const responseError = err.response?.data;
				setError(
					Array.isArray(responseError)
						? responseError.map((issue) => issue.message).join(", ")
						: "Invalid entry data",
				);
			} else {
				setError("Unknown error");
			}
			setTimeout(() => setError(null), 5000);
		}
	};

	return (
		<Card variant="outlined" sx={{ marginTop: 2 }}>
			<CardContent>
				<Typography variant="h6" component="h3">
					Add Occupational Healthcare Entry
				</Typography>
				{error && <Typography color="error" variant="body2">{error}</Typography>}
				<form onSubmit={handleSubmit}>
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
						label="Employer name"
						value={newEntry.employerName}
						onChange={(e) => setNewEntry({ ...newEntry, employerName: e.target.value })}
						fullWidth
						margin="normal"
					/>
					<TextField
						label="Diagnosis codes"
						placeholder="Code 1, Code 2"
						helperText="Separate multiple diagnosis codes with commas"
						value={newEntry.diagnosisCodes?.join(", ") || ""}
						onChange={(e) =>
							setNewEntry({
								...newEntry,
								diagnosisCodes: e.target.value
									.split(",")
									.map((code) => code.trim())
									.filter(Boolean),
							})
						}
						fullWidth
						margin="normal"
					/>
					<Typography variant="subtitle2" sx={{ marginTop: 2 }}>
						Sick leave (optional)
					</Typography>
					<TextField
						label="Start date"
						type="date"
						slotProps={{ inputLabel: { shrink: true } }}
						value={newEntry.sickLeave?.startDate || ""}
						onChange={(e) =>
							setNewEntry({
								...newEntry,
								sickLeave: {
									startDate: e.target.value,
									endDate: newEntry.sickLeave?.endDate || "",
								},
							})
						}
						fullWidth
						margin="normal"
					/>
					<TextField
						label="End date"
						type="date"
						slotProps={{ inputLabel: { shrink: true } }}
						value={newEntry.sickLeave?.endDate || ""}
						onChange={(e) =>
							setNewEntry({
								...newEntry,
								sickLeave: {
									startDate: newEntry.sickLeave?.startDate || "",
									endDate: e.target.value,
								},
							})
						}
						fullWidth
						margin="normal"
					/>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						sx={{ marginTop: 2 }}
					>
						Add Entry
					</Button>
				</form>
			</CardContent>
		</Card>
	);
};

export default OccupationalHealthcareForm;
