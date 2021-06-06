import axios from "axios";
import React, { useState } from "react";
import { Loader } from "../../shared/components/Loader";
import { Link, Navigate } from "react-router-dom";
import { useAuthContext } from "../../context-api/auth-context";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";

function SignIn({ toggleForm }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [formField, setFormField] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setLoading] = useState(false);
  const [passwordVisibililty, setPasswordVisibility] = useState(false);
  const [redirectToHome, setRedirect] = useState(false);
  const { dispatch } = useAuthContext();

  const { email, password } = formField;
  const readyToSubmit = email && password;

  const authenticate = (jwt, next) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("jwt", JSON.stringify(jwt));
      next();
    }
  };
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
      setLoading(true);
      try {
        const user = {
          email,
          password,
        };
        const { data, status } = await axios.post(
          "http://localhost:8080/signin",
          user
        );
        if (data.success && status === 200) {
          const { token, user } = data;
          authenticate({ user, token }, () => {
            setRedirect(true);
          });
        }
      } catch (err) {
        return setErrorMessage(err.response.data.message);
      } finally {
        setLoading(false);
      }
      dispatch({ type: "NAVLINK_CONTROL" });
    }
  };
  if (redirectToHome) {
    return <Navigate to="/" />;
  }
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
        <span className="password-section">
          <input
            type={`${passwordVisibililty ? "text" : "password"}`}
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <span
            className="password-visibility"
            onClick={() => setPasswordVisibility(!passwordVisibililty)}
          >
            {passwordVisibililty ? (
              <VisibilityOffIcon className="icon" />
            ) : (
              <VisibilityIcon className="icon" />
            )}
          </span>
        </span>
        <p className={`error ${errorMessage ? "display" : "hidden"}`}>
          {errorMessage}
        </p>
        <button disabled={readyToSubmit ? false : true}>
          {isLoading ? <Loader /> : "Login"}
        </button>
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
