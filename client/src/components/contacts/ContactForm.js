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
  const [file, setFile] = useState(null);

  const {
    addContact,
    current,
    clearCurrent,
    updateContact,
    uploadImage,
    // handleFileChange,
  } = contactContext;

  useEffect(() => {
    if (current) {
      console.log("current is not empty");
      setContact(current);
    } else {
      console.log("current is empty");
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal",
      });
    }
  }, [contactContext, current]);

  const { name, email, phone, type } = contact;

  const handleFileChange = (event) => {
    // set the file
    let currfile = event.target.files[0];
    console.log(file);
    if (
      currfile.type.startsWith("image/" || currfile.type === "image/gif") &&
      currfile.size < 4 * 1024 * 1024
    ) {
      // console.log("The file is valid");
      // dispatch({ type: SET_PROFILEIMG, payload: event.target[0] });
      // state.file = event.target.files[0];
      setFile(event.target.files[0]);
    } else {
      // return if image is invalid
      event.target.value = null;
      alert("file can't be accepted");
    }
  };
  const onChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    let id;
    if (current === null) {
      id = await addContact(contact);
    } else {
      id = await updateContact(contact);
    }
    contact._id = id;
    console.log(file);
    if (file !== null) uploadImage(contact, file);
    setFile(null);

    setContact({
      name: "",
      email: "",
      phone: "",
      type: "personal",
    });
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form action="" onSubmit={handleOnSubmit}>
      <h2 className="text-primary">
        {current ? "Edit Contact" : "Add Contact"}
      </h2>
      <label className="forminput">
        Name:
        <input
          type="text"
          placeholder="Adipurush"
          name="name"
          value={name}
          onChange={onChange}
          required
          className="rounded"
        />
      </label>

      <label className="forminput">
        Email:
        <input
          type="email"
          placeholder="heaven@yahoo.com"
          name="email"
          value={email}
          onChange={onChange}
          required
          className="rounded"
        />
      </label>

      <label className="forminput">
        Phone:
        <input
          type="text"
          placeholder="475-809-3378"
          name="phone"
          value={phone}
          onChange={onChange}
          className="rounded"
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
      {/* file input */}
      <div>
        <label className="file" />
        <span>choose a photo or gif to quickly identify contacts</span>
        <input
          type="file"
          id="file"
          className="file"
          aria-label="File browser example"
          onChange={(e) => {
            handleFileChange(e);
          }}
          style={{ marginTop: "12px" }}
        />
      </div>
      <div>
        {current && (
          // <div className="btn btn-light btn-block">
          <button
            // style={{ border: "0.5px solid #002a4" }}
            className="btn-ternary btn-block"
            onClick={clearAll}
          >
            Clear
          </button>
          // </div>
        )}
        <input
          type="submit"
          value={current ? "Update Contact" : "Add Contact"}
          className="btn btn-primary btn-block"
        />
      </div>
    </form>
  );
};

export default ContactForm;
