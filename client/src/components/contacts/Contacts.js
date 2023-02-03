import React, { useContext, Fragment } from "react";
import ContactContext from "../../context/contact/ContactContext";
import ContactItem from "./ContactItem";

const Contacts = () => {
  const { contacts } = useContext(ContactContext);

  return (
    <Fragment>
      {contacts.map((contact) => {
        return <ContactItem key={contact.phone} contact={contact} />;
      })}
    </Fragment>
  );
};

export default Contacts;
