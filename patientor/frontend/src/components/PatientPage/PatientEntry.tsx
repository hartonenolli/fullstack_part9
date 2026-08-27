import type { Entry } from "../../types";

const PatientEntry = ({ entry, diagnoses }: { entry: Entry | undefined; diagnoses: Record<string, string> }) => {
    if (!entry) {
        return null;
    }

  return (
    <div>
      <h2>Entries</h2>
      <h3>{entry.date}</h3>
      <p>{entry.description}</p>
        {entry.diagnosisCodes && (
            <ul>
                {entry.diagnosisCodes.map((code) => (
                    <li key={code}>
                        {code} {diagnoses[code] || "Unknown diagnosis"}
                    </li>
                ))}
            </ul>
        )}
    </div>
  );
};

export default PatientEntry;