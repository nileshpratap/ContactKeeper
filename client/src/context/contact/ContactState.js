import React, { useReducer } from "react";

import contactContext from "./ContactContext";
import contactReducer from "./contactReducer";
import {
  GET_CONTACTS,
  CLEAR_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  CLEAR_IMAGE,
} from "../types";

import axios from "axios";

const ContactState = (props) => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
    file: null,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Get Contacts.
  const getContacts = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_BASE_URL + "/api/contacts"
      );
      dispatch({
        type: GET_CONTACTS,
        payload: res.data,
      });
      await new Promise((resolve) => setTimeout(resolve, 0));
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.msg,
      });
    }
  };

  // clear Contacts
  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };

  // Add contact
  const addContact = async (contact) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        process.env.REACT_APP_BASE_URL + "/api/contacts",
        contact,
        config
      );
      dispatch({
        type: ADD_CONTACT,
        payload: res.data,
      });
      return res.data._id;
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error,
      });
    }
  };

  // Delete contact
  const deleteContact = async (id) => {
    try {
      const res = await axios.delete(
        process.env.REACT_APP_BASE_URL + `/api/contacts/${id}`
      );
      dispatch({
        type: DELETE_CONTACT,
        payload: id,
      });

      console.log(res);
      // console.log(state.contacts);
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.msg,
      });
    }
  };

  // set current contact
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  // clear current contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
    clearImage();
  };

  // update contact
  const updateContact = async (contact) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      // console.log(contact);
      const res = await axios.put(
        process.env.REACT_APP_BASE_URL + `/api/contacts/${contact._id}`,
        contact,
        config
      );
      dispatch({
        type: UPDATE_CONTACT,
        payload: res.data,
      });
      clearImage();
      clearCurrent();
      return res.data._id;
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.msg,
      });
    }
  };

  const uploadImage = async (contact, file) => {
    // send image to backend
    console.log(state);
    // console.log(file, "frontend");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      // Create a new FormData object
      const formData = new FormData();
      console.log("hi ", file);
      formData.append("file", file); // Append the file to the form data

      ///////
      const res = await axios.put(
        process.env.REACT_APP_BASE_URL +
          `/api/contacts/uploadimage/${contact._id}`,
        formData,
        config
      );
      // console.log("hi", res);
      // set the contact from res data
      dispatch({
        type: UPDATE_CONTACT,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error,
      });
    }
    clearImage();
  };

  const clearImage = () => {
    dispatch({ type: CLEAR_IMAGE });
  };
  // filter contacts
  const filterContacts = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };

  // clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <contactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        file: state.file,
        clearFilter,
        filterContacts,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        getContacts,
        clearContacts,
        // handleFileChange,
        uploadImage,
        clearImage,
      }}
    >
      {props.children}
    </contactContext.Provider>
  );
};

export default ContactState;
