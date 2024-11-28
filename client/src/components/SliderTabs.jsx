import PropTypes from "prop-types";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../store/tabSlice";

const Tab = ({ label, isActive, onClick }) => {
  const handleClick = () => {
    onClick(String(label).toLowerCase());
  };

  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer select-none px-8 py-2.5 text-primary font-light text-center rounded-full hover:ring-1 ring-primary hover:border-primary transition-all ${
        isActive && "bg-primary text-white border-primary font-semibold"
      }`}
    >
      {label}
    </div>
  );
};
Tab.propTypes = {
  label: PropTypes.string,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
};

// Main Component
const SliderTabs = ({ tabs }) => {
  // Redux
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.tab.activeTab);

  return (
    <div className="p-0.5 rounded-full bg-slate-100 border border-primary shadow-inner drop-shadow flex gap-1 justify-between">
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          label={tab.label}
          isActive={activeTab === String(tab.label).toLowerCase()}
          onClick={(value) => dispatch(setActiveTab(value))}
        />
      ))}
    </div>
  );
};

export default SliderTabs;

SliderTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ),
};
