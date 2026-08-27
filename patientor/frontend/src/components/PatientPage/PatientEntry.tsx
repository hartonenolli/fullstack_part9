import type { Entry } from "../../types";

const PatientEntry = ({ entry }: { entry: Entry | undefined }) => {
    if (!entry) {
        return null;
    }

  return (
    <div>
      <h2>Entries</h2>
      <h3>{entry.date}</h3>
      <p>{entry.description}</p>
      <p>Diagnosis Codes: {entry.diagnosisCodes?.join(", ")}</p>
    </div>
  );
};

export default PatientEntry;