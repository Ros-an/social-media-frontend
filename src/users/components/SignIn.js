import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function SignIn({ toggleForm }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [formField, setFormField] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formField;
  const readyToSubmit = email && password;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setErrorMessage("");
    setFormField((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (readyToSubmit) {
      try {
        const user = {
          email,
          password,
        };
        const { data, status } = await axios.post(
          "http://localhost:8080/signin",
          user
        );
        console.log(data, status);
      } catch (err) {
        return setErrorMessage(err.response.data.message);
      }
      console.log("ros");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <p className={`error ${errorMessage ? "display" : "hidden"}`}>
          {errorMessage}
        </p>
        <button disabled={readyToSubmit ? false : true}>Login</button>
        <p className="signup">
          Don't have an account ?
          <Link to="#" onClick={() => toggleForm()}>
            Sign Up.
          </Link>
        </p>
      </form>
    </>
  );
}

export default SignIn;
