import PropTypes from "prop-types";
import { Divider } from "@mui/material";

const FeatureCard = ({ title, description, variant = "normal", classes }) => {
  if (variant === "normal") {
    return (
      <div
        className={`w-60 h-72 rounded-3xl flex flex-col p-5 gap-y-3 border-2 border-highlight shadow-md shadow-white hover:scale-105 transition-all ${classes}`}
      >
        <div className="text-center font-bold text-3xl text-highlight">
          {title}
        </div>
        <Divider variant="middle" className="bg-gray-300" />
        <div className="mt-2 font-normal text-white font-sm">{description}</div>
      </div>
    );
  }

  if (variant === "pill") {
    return (
      <div
        className={`bg-transparent w-72 h-28 flex flex-col gap-y-0.5 justify-center text-center rounded-full border-4 border-highlight shadow-md shadow-white ${classes}`}
      >
        <div className="text-highlight text-2xl font-bold">{title}</div>
        <div className="px-1.5 text-sm text-white font-normal leading-none">
          {description}
        </div>
      </div>
    );
  }
};

export default FeatureCard;

FeatureCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["normal", "pill"]),
  classes: PropTypes.string,
};
