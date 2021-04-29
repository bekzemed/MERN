import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER,
  GET_PROFILES,
  PROFILE_NOT_FOUND,
  GET_REPOS,
  GET_PROFILE_HANDLE,
} from "./types";

// Get current profile
export const getCurrentProfile = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_PROFILE,
        payload: {},
      })
    );
};

// create profile
export const createProfile = (profileData, history) => (dispatch) => {
  axios
    .post("/api/profile", profileData)
    .then((res) => history.push("/dashboard"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// add experience
export const addExperience = (newData, history) => (dispatch) => {
  axios
    .post("/api/profile/experience", newData)
    .then((res) => history.push("/dashboard"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// add education
export const addEducation = (newData, history) => (dispatch) => {
  axios
    .post("/api/profile/education", newData)
    .then((res) => history.push("/dashboard"))

    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// get all profile
export const getProfiles = () => async (dispatch) => {
  try {
    dispatch(setProfileLoading());
    const res = await axios.get("/api/profile/all");
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_NOT_FOUND,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// get profile by id
export const getProfileByID = (userID) => async (dispatch) => {
  try {
    dispatch(setProfileLoading());
    const res = await axios.get(`/api/profile/user/${userID}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_NOT_FOUND,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// get profile by handle
export const getProfileByHandle = (handle) => async (dispatch) => {
  try {
    dispatch(setProfileLoading());
    const res = await axios.get(`/api/profile/handle/${handle}`);
    dispatch({
      type: GET_PROFILE_HANDLE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_NOT_FOUND,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// get Github repos
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_NOT_FOUND,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// delete each experience
export const deleteExperience = (id) => (dispatch) => {
  axios
    .delete(`/api/profile/experience/${id}`)
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// delete each education
export const deleteEducation = (id) => (dispatch) => {
  axios
    .delete(`/api/profile/education/${id}`)
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// delete account & profile
export const deleteAccount = () => (dispatch) => {
  if (window.confirm("Are you sure? This cant be UNDONE!!")) {
    axios
      .delete("/api/profile")
      .then((res) =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {},
        })
      )
      .catch((err) =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
      );
  }
};

// profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};

// clear current profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};
