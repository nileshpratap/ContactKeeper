import React, { useContext, Fragment, useEffect } from "react";
import ContactContext from "../../context/contact/ContactContext";
import ContactItem from "./ContactItem";
import Spinner from "../layout/Spinner.js";

const Contacts = () => {
  const { getContacts, loading, contacts, filtered } =
    useContext(ContactContext);

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);

  if (contacts && contacts.length === 0) {
    return <h4>Please add a contact.</h4>;
  }

  return (
    <Fragment>
      {contacts !== null && !loading ? (
        filtered !== null ? (
          filtered.map((contact) => {
            return <ContactItem key={contact.id} contact={contact} />;
          })
        ) : (
          contacts.map((contact) => {
            return <ContactItem key={contact.phone} contact={contact} />;
          })
        )
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Contacts;
