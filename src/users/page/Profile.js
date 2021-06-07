import React, { useState, useEffect } from "react";
import { isAuthenticated, userInfo } from "../../utils/authrelated";
import { Navigate } from "react-router-dom";
function Profile() {
  const [user, setUser] = useState("");
  useEffect(() => {
    const data = userInfo();
    console.log(data);
    setUser(data);
  }, []);

  if (!isAuthenticated()) {
    return <Navigate to="/authenticate" />;
  }

  return (
    <div>
      {user && (
        <>
          <h3>Name: {user.user.name}</h3>
          <h4>Email: {user.user.email}</h4>
        </>
      )}
    </div>
  );
}

export default Profile;
