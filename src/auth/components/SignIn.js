import axios from "axios";
import React, { useState } from "react";
import { Loader } from "../../shared/components/Loader";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useGeneralContext } from "../../context-api/GeneralTaskProvider";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";

function SignIn({ toggleForm }) {
  let navigate = useNavigate();
  const { state } = useLocation();
  const [errorMessage, setErrorMessage] = useState("");
  const [formField, setFormField] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setLoading] = useState(false);
  const [passwordVisibililty, setPasswordVisibility] = useState(false);
  const { dispatch } = useGeneralContext();

  const { email, password } = formField;
  const readyToSubmit = email && password;
  const authenticate = (jwt) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("jwt", JSON.stringify(jwt));
      navigate(state?.from ? state.from : "/");
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
    event?.preventDefault();
    if (readyToSubmit) {
      try {
        const user = {
          email,
          password,
        };
        setLoading(true);
        const { data, status } = await axios.post(
          `${process.env.REACT_APP_API_URL}/signin`,
          user
        );
        if (data.success && status === 200) {
          const { token, user } = data;
          authenticate({ user, token });
        }
      } catch (err) {
        setLoading(false);
        return setErrorMessage(err.response.data.message);
      }
      dispatch({ type: "SHOW_LOADER" });
    }
  };
  const signInAsGuest = () => {
    setFormField({
      email: "roshan@gmail.com",
      password: "@roshan12",
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
        />
        <span className="password-section">
          <input
            type={`${passwordVisibililty ? "text" : "password"}`}
            name="password"
            placeholder="Password"
            value={password}
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
        <button type="submit" disabled={readyToSubmit ? false : true}>
          {isLoading ? <Loader /> : "Sign In"}
        </button>
        <button className="signin-as-guest" onClick={signInAsGuest}>
          Sign In as Guest
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
