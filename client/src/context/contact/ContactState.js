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
        name: "King",
        email: "king@gmail.com",
        phone: "1111-111-1983",
        type: "professional",
      },
      {
        name: "Raftar",
        email: "raftar@gmail.com",
        phone: "1111-111-1234",
        type: "professional",
      },
      {
        name: "Honey",
        email: "honey7@gmail.com",
        phone: "1111-111-9876",
        type: "professional",
      },
    ],
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Add contact
  const addContact = (contact) => {
    contact.id = uuidv4();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  // Delete contact

  // set current contact

  // clear current contact

  // update contact

  // filter contacts

  // clear filter

  return (
    <contactContext.Provider
      value={{
        contacts: state.contacts,
        addContact,
      }}
    >
      {props.children}
    </contactContext.Provider>
  );
};

export default ContactState;
