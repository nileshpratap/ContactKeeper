import React, { useContext, Fragment, useEffect } from "react";
import ContactContext from "../../context/contact/ContactContext";
import ContactItem from "./ContactItem";
import Spinner from "../layout/Spinner.js";
import { CSSTransition, TransitionGroup } from "react-transition-group";

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
      <TransitionGroup>
        {contacts !== null && Array.isArray(contacts) && !loading ? (
          filtered !== null ? (
            filtered.map((contact) => {
              return (
                <CSSTransition key={contact.id} timeout={500} classNames="item">
                  <ContactItem contact={contact} />
                </CSSTransition>
              );
            })
          ) : (
            contacts.map((contact) => {
              return (
                <CSSTransition key={contact.id} timeout={500} classNames="item">
                  <ContactItem contact={contact} />
                </CSSTransition>
              );
            })
          )
        ) : loading ? (
          <Spinner />
        ) : (
          <div></div>
        )}
      </TransitionGroup>
    </Fragment>
  );
};

export default Contacts;
