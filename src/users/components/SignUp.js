import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function SignUp({ toggleForm }) {
  const [formField, setFormField] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    errorMessage: "",
  });
  const { name, email, password, confirmPassword, errorMessage } = formField;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormField((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      return setFormField((prevValue) => ({
        ...prevValue,
        errorMessage: "passwords do not match!",
      }));
    }
    if (name && email && password) {
      const user = {
        name,
        email,
        password,
      };
      try {
        const { data, status } = await axios.post(
          "http://localhost:8080/signup",
          user
        );
        console.log(data);
      } catch (err) {
        console.log(err);
      }
      setFormField({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        errorMessage: "",
      });
    } else {
      setFormField((prevValue) => ({
        ...prevValue,
        errorMessage: "no field should be empty",
      }));
    }
  };
  return (
    <>
      <form>
        {/* onSubmit={} */}
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
        <p className={errorMessage !== "" ? "display" : "hidden"}>
          {errorMessage}
        </p>
        <button type="submit" onClick={handleSubmit}>
          Sign Up
        </button>
        <p className="signup">
          Already have an account ?
          <Link to="#" onClick={() => toggleForm()}>
            Sign in.
          </Link>
        </p>
      </form>
    </>
  );
}

export default SignUp;
