import { Paper } from "@mui/material";
import PropTypes from "prop-types";

const ConsultationCard = ({ consultation }) => {
  if (!consultation) return null;

  return (
    <Paper
      sx={{
        width: 720,
        borderRadius: 10,
      }}
      className="py-6 px-8"
    >
      <div className="space-y-3 text-md">
        <div className="flex justify-between items-baseline font-md">
          <p>
            Patient Name: <span className="text-2xl font-semibold">Jason</span>
          </p>
          <p>
            Token No: <span className="text-2xl font-semibold">02</span>
          </p>
        </div>
        <div className="flex gap-x-4 items-baseline ">
          <p>
            Age: <span className="text-2xl font-semibold">23 years</span>
          </p>
          <p>
            Gender: <span className="text-2xl font-semibold">Male</span>
          </p>
        </div>
        <p>
          Consulted On{" "}
          <span className="text-2xl font-semibold">
            21st October, 2024 11:55 AM
          </span>
        </p>
        <p>
          Diagnosed with <span className="text-2xl font-semibold">Asthama</span>
        </p>
        <p>
          Medication:{" "}
          <span className="text-2xl font-semibold">Bronchodlitors</span>
        </p>
        <p>
          Notes: <br />{" "}
          <span className="text-2xl font-semibold">
            Prescribed bronchodilators (e.g., albuterol), inhaled
            corticosteroids, and provided an asthma action plan for management
            of acute exacerbations.
          </span>
        </p>
        <p>
          Consulted By <span className="text-2xl font-semibold">Dr. Jason</span>
        </p>
      </div>
    </Paper>
  );
};

export default ConsultationCard;

ConsultationCard.propTypes = {
  consultation: PropTypes.object,
};
