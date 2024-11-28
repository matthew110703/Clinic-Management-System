import PropTypes from "prop-types";

const MenuButton = ({
  isActive = false,
  onClick,
  label,
  icon,
  activeIcon,
  disabled = false,
  styles,
  classes,
}) => {
  const colors = () => {
    if (disabled) {
      return "bg-transparent text-gray-400 cursor-not-allowed";
    }
    if (isActive) {
      return "bg-white text-primary";
    } else {
      return "bg-transparent cursor-pointer text-white hover:ring-1 hover:ring-white";
    }
  };

  return (
    <div
      className={`disabled:cursor-not-allowed w-full pl-10 py-1 flex items-center rounded-3xl border-2 border-white gap-1 ${colors()} ${classes}`}
      onClick={disabled ? null : onClick}
      style={styles}
    >
      {isActive ? activeIcon : icon}
      {label}
    </div>
  );
};

export default MenuButton;

MenuButton.propTypes = {
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired,
  icon: PropTypes.node,
  activeIcon: PropTypes.node,
  disabled: PropTypes.bool,
  styles: PropTypes.object,
  classes: PropTypes.string,
};
