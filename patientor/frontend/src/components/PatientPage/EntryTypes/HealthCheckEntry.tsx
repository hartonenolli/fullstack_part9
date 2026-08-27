import type { Entry } from "../../../types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";

const HealthCheckEntry = ({ entry }: { entry: Entry | undefined }) => {
	if (!entry || entry.type !== "HealthCheck") {
		return null;
	}

	return (
		<Card variant="outlined">
			<CardContent>
				<Typography variant="h6" component="h3">
					{entry.date}
					<HealthAndSafetyIcon sx={{ verticalAlign: "middle", mr: 1 }} />
				</Typography>
				<Typography>{entry.description}</Typography>
				<Typography>Health check rating: {entry.healthCheckRating}</Typography>
				<Typography>Diagnosis by: {entry.specialist}</Typography>
			</CardContent>
		</Card>
	);
};

export default HealthCheckEntry;
