import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import setAuthToken from "../../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    loading: false,
    user: null,
    error: null,
  };

  // Create a custom hook to use the auth context

  const [state, dispatch] = useReducer(AuthReducer, initialState);
  // load user
  const loadUser = async () => {
    // console.log("load user");
    // we have to store token into global headers.
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get(process.env.REACT_APP_BASE_URL + "/api/auth");
      dispatch({ type: USER_LOADED, payload: res.data });
      await new Promise((resolve) => setTimeout(resolve, 0));
    } catch (error) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // register user
  const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      state.loading = true;
      // console.log(process.env.REACT_APP_BASE_URL);
      const res = await axios.post(
        process.env.REACT_APP_BASE_URL + "/api/users",
        formData,
        config
      );
      // console.log("hi", res);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      // wait for dispatch to complete
      await new Promise((resolve) => setTimeout(resolve, 0));
      loadUser();
      state.loading = false;
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.data.msg,
      });
      alert("Registration Failed");
    }
  };

  // login
  const login = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      state.loading = true;
      const res = await axios.post(
        process.env.REACT_APP_BASE_URL + "/api/auth",
        formData,
        config
      );

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      await new Promise((resolve) => setTimeout(resolve, 0));

      await loadUser();
      console.log("User logged in.");
    } catch (error) {
      // console.log("In failure");
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.msg,
      });
      alert("Login Failed");
    }
  };

  // logout
  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  // clear errors
  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        AuthState,
        loadUser,
        login,
        logout,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
