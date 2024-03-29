import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

// Register user // dispatch thunk middleware(async middleware)
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/register", userData)
    .then(() => history.push("/login"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Login user

export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/api/users/login", userData)
    .then((res) => {
      // save to local storage
      const { token } = res.data;
      // set token to local storage
      localStorage.setItem("jwtToken", token);
      // set token to Auth header
      setAuthToken(token);
      // decoded the token
      const decoded = jwt_decode(token);
      // set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// set current user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// log user out

export const logoutUser = () => (dispatch) => {
  // remove token from localStorage
  localStorage.removeItem("jwtToken");
  // remove auth header
  setAuthToken(false);
  // set currentUser to {} and isAutherization to false
  dispatch(setCurrentUser({}));
};
