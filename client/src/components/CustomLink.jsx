import PropTypes from "prop-types";
import { colors } from "../meta-data";
import { Link } from "react-router-dom";

const CustomLink = ({
  children,
  classes,
  to,
  onClick,
  color = "text",
  icon,
}) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center text-md gap-0.5 text-${color} ${
        color === "text" && "hover:text-primary"
      } ${classes}`}
    >
      {children}
      {icon}
    </Link>
  );
};

export default CustomLink;

CustomLink.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.string,
  to: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  color: PropTypes.oneOf(Object.keys(colors)),
  icon: PropTypes.node,
};
