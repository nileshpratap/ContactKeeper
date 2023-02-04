import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/ContactContext";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });
  const { addContact, current, clearCurrent, updateContact } = contactContext;

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({ name: "", email: "", phone: "", type: "personal" });
    }
  }, [contactContext, current]);

  const { name, email, phone, type } = contact;

  const onChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    console.log(contact);
    setContact({ name: "", email: "", phone: "", type: "personal" });
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form action="" onSubmit={handleOnSubmit}>
      <h2 className="text-primary">
        {current ? "Edit Contact" : "Add Contact"}
      </h2>
      <label>
        Name:
        <input
          type="text"
          placeholder="John Doe"
          name="name"
          value={name}
          onChange={onChange}
        />
      </label>

      <label>
        Email:
        <input
          type="email"
          placeholder="johnd@yahoo.com"
          name="email"
          value={email}
          onChange={onChange}
        />
      </label>

      <label>
        Phone:
        <input
          type="text"
          placeholder="475-809-3378"
          name="phone"
          value={phone}
          onChange={onChange}
        />
      </label>

      <h4>Contact Type</h4>
      <label>
        Personal
        <input
          type="radio"
          name="type"
          value="personal"
          checked={type === "personal"}
          onChange={onChange}
        />
      </label>
      <label>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Professional
        <input
          type="radio"
          name="type"
          value="professional"
          checked={type === "professional"}
          onChange={onChange}
        />
      </label>
      <div>
        <label>
          {current ? "Edit Contact" : "Add Contact"}
          <input
            type="submit"
            value={current ? "Update Contact" : "Add Contact"}
            className="btn btn-primary btn-block"
          />
        </label>
      </div>
      {current && (
        <div className="btn btn-light btn-block">
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
