import React, { useState, useEffect } from "react";
import { ContentLoader } from "../../shared/components/Loader";
import { isAuthenticated, userInfo } from "../../utils/authrelated";
import { Navigate, useParams } from "react-router-dom";
import { getUserData } from "../index";
function Profile() {
  const { userId } = useParams();
  const [userData, setUserData] = useState("");

  useEffect(() => {
    if (!userData) {
      getUserData({ userId, setUserData, userInfo });
    }
  }, [userData, userId]);

  if (!isAuthenticated()) {
    return <Navigate to="/authenticate" />;
  }

  return (
    <div className="container">
      {userData ? (
        <>
          <h3>Name: {userData.name}</h3>
          <h4>Email: {userData.email}</h4>
          <h5>Joined {`${new Date(userData.createdAt).toDateString()}`}</h5>
        </>
      ) : (
        <ContentLoader />
      )}
    </div>
  );
}

export default Profile;
