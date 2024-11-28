import {
  TripOrigin,
  Dashboard,
  DashboardOutlined,
  Groups,
  GroupsOutlined,
  Stars,
  StarsOutlined,
  Receipt,
  ReceiptOutlined,
  AccountCircle,
  Logout,
} from "@mui/icons-material";
import { Backdrop } from "@mui/material";
import {
  ProfileButton,
  SearchBar,
  MenuButton,
  PatientCard,
  Footer,
} from "../components";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Redux imports
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { showForm } from "../store/formSlice";

// Services
import { logout as logoutUser } from "../services/authService";

const sidebarItems = [
  {
    label: "Dashboard",
    icon: <Dashboard />,
    activeIcon: <DashboardOutlined />,
  },
  { label: "Patients", icon: <Groups />, activeIcon: <GroupsOutlined /> },
  { label: "Tokens", icon: <Stars />, activeIcon: <StarsOutlined /> },
  { label: "Billing", icon: <Receipt />, activeIcon: <ReceiptOutlined /> },
];

const Receptionist = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("dashboard");

  // Redux
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user); // User profile
  const backdrop = useSelector((state) => state.backdrop);

  // Redirect to the active menu
  useEffect(() => {
    navigate(`./${activeMenu}`);
  }, [activeMenu, navigate]);

  // Load the user profile
  // useEffect(() => {
  //   console.log(profile);
  // }, [profile]);

  const handleLogout = () => {
    logoutUser();
    dispatch(logout());
  };

  return (
    <>
      <div className="h-screen w-screen p-2 overflow-hidden">
        {/* Header  */}
        <div className="px-8 py-4 flex justify-between items-center shadow-lg rounded-b-3xl">
          <ProfileButton label={profile.fullName} icon={<TripOrigin />} />
          <SearchBar />
        </div>
        <div className="p-4 h-[calc(100%-80px)]   gap-x-8 flex border">
          {/* Sidebar */}
          <div className="w-72 px-6 py-10 bg-primary rounded-2xl flex flex-col justify-between">
            {/* SideBar Items  */}
            <div className="space-y-6">
              {sidebarItems.map((item) => (
                <MenuButton
                  key={item.label}
                  label={item.label}
                  icon={item.icon}
                  activeIcon={item.activeIcon}
                  isActive={activeMenu === item.label.toLowerCase()}
                  onClick={() => setActiveMenu(item.label.toLowerCase())}
                  disabled={item.label === "Billing"}
                />
              ))}
            </div>
            <div className="space-y-3">
              <MenuButton
                label="Account"
                icon={<AccountCircle />}
                styles={{ justifyContent: "center", paddingLeft: "0px" }}
                onClick={() =>
                  dispatch(
                    showForm({
                      type: "accountOverview",
                      title: "Account Overview",
                    })
                  )
                }
              />
              <MenuButton
                label="Logout"
                icon={<Logout />}
                onClick={handleLogout}
                styles={{ justifyContent: "center", paddingLeft: "0px" }}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-grow p-4 overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />

      {/* Backdrop Card */}
      <Backdrop open={backdrop.show}>
        <PatientCard variant="compact" patient={backdrop.data?.data || {}} />
      </Backdrop>
    </>
  );
};

export default Receptionist;
