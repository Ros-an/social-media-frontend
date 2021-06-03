import React from "react";
import { Link } from "react-router-dom";

function SignIn({ toggleForm }) {
  return (
    <>
      <form>
        {/* onSubmit={} */}
        <h2>Sign In</h2>
        <input type="email" name="" placeholder="Email" />
        <input type="password" name="" placeholder="Password" />
        <p className={`error`}></p>
        <button>Login</button>
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
