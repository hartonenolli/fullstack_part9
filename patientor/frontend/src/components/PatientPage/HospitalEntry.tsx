import type { Entry } from "../../types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const HospitalEntry = ({ entry }: { entry: Entry | undefined; }) => {
    if (!entry || entry.type !== "Hospital") {
        return null;
    }

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h6" component="h3">
                    {entry.date}
                    <LocalHospitalIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                </Typography>
                <Typography>{entry.description}</Typography>
                <Typography>Diagnosis by: {entry.specialist}</Typography>
            </CardContent>
        </Card>
    );
};

export default HospitalEntry;