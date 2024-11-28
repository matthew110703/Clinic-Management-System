import React, { useEffect, useRef } from "react";
import ProfileButton from "./buttons/ProfileButton";
import CustomButton from "./buttons/CustomButton";
import CustomLink from "./CustomLink";
import {
  ArrowRightOutlined,
  LocalHospitalOutlined,
  TripOriginOutlined,
} from "@mui/icons-material";
import { CircularProgress, Divider } from "@mui/material";

import { website, navLinks } from "../meta-data";
import { useDispatch, useSelector } from "react-redux";
import { verifyUser } from "../services/authService";
import { authenticate } from "../store/authSlice";
import { startLoading, stopLoading } from "../store/loadingSlice";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  // Redux States
  const { isAuthenticated, currentUser: user } = useSelector(
    (state) => state.auth
  );
  const { loading } = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  const isFirstRender = useRef(true); // Track initial render

  useEffect(() => {
    // Only run on the initial render or if no authentication is set
    if (isAuthenticated || !isFirstRender.current) return;

    isFirstRender.current = false;
    dispatch(startLoading());

    const token = localStorage.getItem("token");
    if (token) {
      verifyUser(token)
        .then(() => {
          const decoded = jwtDecode(token);
          dispatch(
            authenticate({ isAuthenticated: true, user: decoded, token })
          );
        })
        .catch((error) => console.error("Verification error:", error))
        .finally(() => dispatch(stopLoading()));
    } else {
      dispatch(stopLoading());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <section id="header">
      <header className="my-2 py-3 px-8 shadow-lg rounded-b-2xl flex items-center justify-between">
        {/* Logo and Navigation Links */}
        <div className="flex gap-x-8 items-center">
          <ProfileButton
            label={website.title}
            icon={<LocalHospitalOutlined />}
            to="/"
          />
          <nav>
            <ul className="flex gap-x-5 list-none">
              {navLinks.map((link, idx) => (
                <React.Fragment key={idx}>
                  <li className="mx-2">
                    <CustomLink to={link.href} classes="text-lg">
                      {link.label}
                    </CustomLink>
                  </li>
                  {idx < navLinks.length - 1 && (
                    <Divider orientation="vertical" flexItem />
                  )}
                </React.Fragment>
              ))}
            </ul>
          </nav>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-x-4">
          {loading ? (
            <CircularProgress size={24} />
          ) : isAuthenticated ? (
            <CustomButton
              variant="filled"
              label="Dashboard"
              startIcon={<TripOriginOutlined />}
              onClick={() => navigate(`/${user.role}/dashboard`)}
            />
          ) : (
            <>
              <CustomLink
                to="/register"
                icon={<ArrowRightOutlined />}
                classes="underline"
              >
                Register
              </CustomLink>
              <CustomButton
                variant="filled"
                label="Login"
                startIcon={<TripOriginOutlined />}
                onClick={() => navigate("/login")}
              />
            </>
          )}
        </div>
      </header>
    </section>
  );
};

export default Header;
