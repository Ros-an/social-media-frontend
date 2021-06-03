import React, { useState } from "react";
import Loader from "../../shared/components/Loader";
import { Link } from "react-router-dom";
import axios from "axios";

function SignUp({ toggleForm }) {
  const [isLoading, setLoading] = useState(false);
  const [success, setSuccess] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [formField, setFormField] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = formField;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setErrorMessage("");
    setFormField((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.length < 3) {
      return setErrorMessage("username length atleast 3");
    }
    if (password.length < 8) {
      return setErrorMessage("password length atleast 8!");
    }
    if (confirmPassword !== password) {
      return setErrorMessage("passwords do not match!");
    }
    if (name && email && password && confirmPassword) {
      const user = {
        name,
        email,
        password,
      };
      setLoading(true);
      // post request to backend
      try {
        const { data } = await axios.post("http://localhost:8080/signup", user);
        console.log(data);
        setSuccess(true);
      } catch (err) {
        return setErrorMessage(err.response.data.message);
      } finally {
        setLoading(false);
      }
      setFormField({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setErrorMessage("");
    }
  };
  const readyToSubmit = name && email && password && confirmPassword;
  return (
    <>
      <form onSubmit={handleSubmit} className="signup-form">
        {success && (
          <p className="success-message">Signup successful! Please Signin.</p>
        )}
        <h2>Create an account</h2>
        <input
          onChange={handleChange}
          type="text"
          name="name"
          placeholder="Username"
          value={name}
        />
        <input
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="Email Address"
          value={email}
        />
        <input
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="Create Password"
          value={password}
        />
        <input
          onChange={handleChange}
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
        />
        <p className={`error ${errorMessage ? "display" : "hidden"}`}>
          {errorMessage}
        </p>
        <button type="submit" disabled={readyToSubmit ? false : true}>
          {isLoading ? <Loader /> : "Sign Up"}
        </button>
        <p className="signup">
          Already have an account ?
          <Link
            to="#"
            onClick={() => {
              setSuccess(false);
              toggleForm();
            }}
          >
            Sign in.
          </Link>
        </p>
      </form>
    </>
  );
}

export default SignUp;
