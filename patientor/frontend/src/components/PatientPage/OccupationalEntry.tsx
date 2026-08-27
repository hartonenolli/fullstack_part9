import type { Entry } from "../../types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import WorkIcon from "@mui/icons-material/Work";

const OccupationalEntry = ({ entry }: { entry: Entry | undefined }) => {
	if (!entry || entry.type !== "OccupationalHealthcare") {
		return null;
	}

	return (
		<Card variant="outlined">
			<CardContent>
				<Typography variant="h6" component="h3">
					{entry.date}
					<WorkIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                    {entry.employerName}
				</Typography>
				<Typography>{entry.description}</Typography>
				<Typography>Employer: {entry.employerName}</Typography>
			</CardContent>
		</Card>
	);
};

export default OccupationalEntry;
