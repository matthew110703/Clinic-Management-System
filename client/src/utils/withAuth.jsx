/* eslint-disable react/display-name */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Redux imports
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "../store/loadingSlice";
import { setUserProfile } from "../store/userSlice";

// Services
import { getUserProfile } from "../services/userService";

const withAuth = (Component) => {
  return (props) => {
    const navigate = useNavigate();

    // Redux
    const dispatch = useDispatch();
    const { isAuthenticated, currentUser } = useSelector((state) => state.auth);

    useEffect(() => {
      // Start loading immediately
      dispatch(startLoading());

      if (isAuthenticated && currentUser?.id) {
        // Fetch user profile
        getUserProfile(currentUser.id)
          .then((data) => {
            // Ensure that only serializable data is dispatched
            const { clinicName, fullName, email, phone, gender, age } = data;
            // Dispatch the user profile
            dispatch(
              setUserProfile({
                clinicName,
                fullName,
                email,
                phone,
                gender,
                age,
              })
            );
          })
          .catch((error) => {
            console.error("Failed to fetch user profile:", error);
          })
          .finally(() => {
            dispatch(stopLoading());
          });
      } else {
        navigate("/login");
      }

      return () => {
        // Ensure loading stops if component unmounts for any reason
        dispatch(stopLoading());
      };
    }, [currentUser, dispatch, isAuthenticated, navigate]);

    return isAuthenticated ? <Component {...props} /> : null;
  };
};

export default withAuth;
