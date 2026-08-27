import type { Entry } from "../../types";
import HospitalEntry from "./HospitalEntry";
import OccupationalEntry from "./OccupationalEntry";
import HealthCheckEntry from "./HealthCheckEntry";

const PatientEntry = ({ entry }: { entry: Entry | undefined; }) => {
    if (!entry) {
        return null;
    }

    switch (entry.type) {
        case "Hospital":
            return <HospitalEntry entry={entry} />;
        case "OccupationalHealthcare":
            return <OccupationalEntry entry={entry} />;
        case "HealthCheck":
            return <HealthCheckEntry entry={entry} />;
        default:
            return null;
    }
};

export default PatientEntry;