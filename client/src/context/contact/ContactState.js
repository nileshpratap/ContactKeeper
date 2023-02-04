import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import contactContext from "./ContactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: "2dc5dec1-5745-47f6-8c40-d5a1082b2575",
        name: "King",
        email: "king@gmail.com",
        phone: "1111-111-1983",
        type: "professional",
      },
      {
        id: "2dc5dec1-5745-47f6-9890-d5a1082b2575",
        name: "Raftar",
        email: "raftar@gmail.com",
        phone: "1111-111-1234",
        type: "professional",
      },
      {
        id: "2dc5rdc1-5745-47f6-8c40-d5a1082b2575",
        name: "Honey",
        email: "honey7@gmail.com",
        phone: "1111-111-9876",
        type: "professional",
      },
    ],
    current: null,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Add contact
  const addContact = (contact) => {
    contact.id = uuidv4();
    console.log(contact.id);
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  // Delete contact
  const deleteContact = (id) => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };

  // set current contact
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  // clear current contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // update contact
  const updateContact = (contact) => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };

  // filter contacts

  // clear filter

  return (
    <contactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
      }}
    >
      {props.children}
    </contactContext.Provider>
  );
};

export default ContactState;
