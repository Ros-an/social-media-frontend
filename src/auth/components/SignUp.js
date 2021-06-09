import React, { useState } from "react";
import { Loader } from "../../shared/components/Loader";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../../context-api/auth-context";

function SignUp({ toggleForm }) {
  const { dispatch } = useAuthContext();
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formField, setFormField] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = formField;
  const readyToSubmit = name && email && password && confirmPassword;

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
      return setErrorMessage("password must be of atleast 8 characters");
    }
    if (confirmPassword !== password) {
      return setErrorMessage("passwords do not match!");
    }
    if (readyToSubmit) {
      const user = {
        name,
        email,
        password,
      };
      setLoading(true);
      // post request to backend
      try {
        const { data, status } = await axios.post(
          `${process.env.REACT_APP_API_URL}/signup`,
          user
        );
        console.log(data, status);
        if (data.success && status === 201) {
          dispatch({
            type: "TOAST_OPEN",
            payload: "New account created successfully !! Now please login",
          });
        }
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
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="signup-form">
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
