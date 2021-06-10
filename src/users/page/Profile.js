import React, { useState, useEffect } from "react";
import { ContentLoader } from "../../shared/components/Loader";
import { isAuthenticated, userInfo } from "../../utils/authrelated";
import { Navigate, useParams } from "react-router-dom";
import { getUserData } from "../index";
import ProfileImage from "../../assets/avatar.jpg";
import BackgroundImage from "../../assets/background.jpg";
import DeleteAccount from "../components/DeleteAccount";
import EditAccount from "../components/EditAccount";

import "./Profile.css";

function Profile() {
  const { userId } = useParams();
  const [userData, setUserData] = useState("");

  useEffect(() => {
    getUserData({ userId, setUserData, userInfo });
    console.log("profile useEffect");
  }, [userId]);

  if (!isAuthenticated()) {
    return <Navigate to="/authenticate" />;
  }

  return (
    <>
      {userData ? (
        <section className="profile-card">
          <div className="profile-background">
            <img src={BackgroundImage} alt="backgroundImage" />
          </div>
          <img src={ProfileImage} alt="profileImg" className="profile-img" />
          <div className="profile-detail">
            <p className="name">{userData.name}</p>
            <p className="headline">Here will be the headline</p>
            <p className="email">{userData.email}</p>
            <p className="joined">
              <span>Joined:</span>{" "}
              {`${new Date(userData.createdAt).toDateString()}`}
            </p>
            {isAuthenticated() && userInfo().user._id === userData._id && (
              <div className="profile-control">
                <EditAccount />
                <DeleteAccount userId={userData._id} />
              </div>
            )}
          </div>
        </section>
      ) : (
        <ContentLoader />
      )}
    </>
  );
}

export default Profile;
