import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import ContactContext from "../../context/contact/ContactContext";
import "../../App.css";

const ContactItem = ({ contact }) => {
  // we just need the contact dispatch without state.
  const { _id, name, email, phone, type, profileimg } = contact;

  const contactContext = useContext(ContactContext);
  const { deleteContact, setCurrent, clearCurrent } = contactContext;

  const onDelete = (e) => {
    deleteContact(_id);
    clearCurrent();
  };
  useEffect(() => {
    return () => {};
  }, [profileimg]);

  return (
    <div className="card bg-light">
      {profileimg && (
        <img src={profileimg} className="round-img" alt="profile-img" />
      )}
      <div className="card-content">
        <h3 className="text-primary text-left">
          {name}{" "}
          <span
            style={{
              float: "right",
            }}
            className={
              "badge " +
              (type === "professional" ? "badge-success" : "badge-primary")
            }
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        </h3>
        <ul className="list">
          {email && (
            <li>
              <i className="fas fa-envelope-open" /> {email}
            </li>
          )}
          {phone && (
            <li>
              <i className="fas fa-phone" /> {phone}
            </li>
          )}
        </ul>
        <p>
          <button
            className="btn btn-dark btn-sm"
            onClick={() => setCurrent(contact)}
          >
            Edit
          </button>
          <button className="btn btn-danger btn-sm" onClick={onDelete}>
            Delete
          </button>
        </p>
      </div>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
