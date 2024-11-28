import PropTypes from "prop-types";
import { InfoOutlined } from "@mui/icons-material";
import { Tooltip } from "@mui/material";

const DataLabel = ({ label, value, info, classes }) => {
  return (
    <div
      className={`w-64 h-28 py-2.5 px-5 flex flex-col justify-between rounded-3xl bg-slate-200 ${classes}`}
    >
      <div className="flex justify-between text-start text-xl font-semibold">
        {label}
        <Tooltip title={info} placement="right-start" arrow>
          <InfoOutlined className="cursor-pointer" />
        </Tooltip>
      </div>
      <div className="text-4xl font-bold text-end">{value}</div>
    </div>
  );
};

export default DataLabel;

DataLabel.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  info: PropTypes.string,
  classes: PropTypes.object,
};
