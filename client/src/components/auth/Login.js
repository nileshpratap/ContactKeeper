import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";
// import AlertContext from "../../context/alert/alertContext";

const Login = () => {
  // const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  let { login, error, clearErrors, isAuthenticated } = authContext;

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    //eslint-disable-next-line
  }, [isAuthenticated]);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill all the fields.");
    } else {
      await login({ email, password });
    }
  };

  useEffect(() => {
    if (error === "Invalid Credentials") {
      alert(error);
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated]);

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <form action="" onSubmit={handleSubmit}>
        <div className="form-group ">
          <label htmlFor="email">Email Address</label>
          <input
            className="rounded"
            type="email"
            name="email"
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            className="rounded"
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Login;
