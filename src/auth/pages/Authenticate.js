import React, { useState } from "react";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import { isAuthenticated } from "../../utils/authrelated";
import "./Authenticate.css";
import { Navigate } from "react-router-dom";

function Authenticate() {
  const [addClass, setClass] = useState(true);
  function toggleForm() {
    setClass((prev) => !prev);
  }
  if (isAuthenticated()) {
    return <Navigate to="/" />;
  }
  return (
    <>
      {!isAuthenticated() && (
        <section className="authenticate">
          <div className={addClass ? "container" : "container active"}>
            <div className="user signinBx">
              <div className="imgBx">
                <div>
                  <p className="heading">Welcome back</p>
                  <p className="para">
                    {" "}
                    To keep connected with us please login with your personal
                    information
                  </p>
                </div>
              </div>
              <div className="formBx">
                {/* login form */}
                <SignIn toggleForm={toggleForm} />
              </div>
            </div>
            {/* ********************************************************************************* */}

            <div className="user signupBx">
              <div className="formBx">
                {/* signup form */}
                <SignUp toggleForm={toggleForm} />
              </div>
              <div className="imgBx">
                <div>
                  <p className="heading">Hello friend</p>
                  <p className="para">
                    Enter you personal details and start your journey with us
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Authenticate;
