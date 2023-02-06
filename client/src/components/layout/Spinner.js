import React from "react";
import spinner from "./Spinner-1s-200px.gif";

const Spinner = () => (
  <img
    src={spinner}
    style={{ width: "200px", margin: "auto", display: "block" }}
    alt="Loading..."
  />
);

export default Spinner;
