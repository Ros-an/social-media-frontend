import React from "react";
import { isAuthenticated } from "../../utils/authrelated";
import { Navigate } from "react-router-dom";

function Users() {
  if (!isAuthenticated()) {
    return <Navigate to="/authenticate" />;
  }
  return (
    <div className="container">
      <h1>This is user's page</h1>
    </div>
  );
}

export default Users;
