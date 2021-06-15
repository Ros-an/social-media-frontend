import React, { useState, useEffect } from "react";
import { ContentLoader } from "../../shared/components/Loader";
import { isAuthenticated, userInfo } from "../../utils/authrelated";
import { useParams } from "react-router-dom";
import { getUserData } from "../index";
import ProfileImage from "../../assets/avatar.jpg";
import Image from "../components/Image";
import BackgroundImage from "../../assets/background.jpg";
import DeleteProfileBtn from "../components/DeleteProfileBtn";
import EditProfileBtn from "../components/EditProfileBtn";
import About from "../components/About";

import "./Profile.css";

function Profile() {
  const { userId } = useParams();
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserData({ userId, setUserData, userInfo, setLoading });
    console.log("profile useEffect");
  }, [userId]);
  return (
    <>
      {loading && <ContentLoader />}
      {userData && (
        <>
          <section className="profile-card">
            <div className="profile-background">
              <Image
                url={"background"}
                photo={BackgroundImage}
                id={userData._id}
                hasImage={userData.background}
              />
            </div>
            <Image
              url={"photo"}
              photo={ProfileImage}
              id={userData._id}
              hasImage={userData.userphoto}
              styling="profile-img"
            />
            <div className="profile-detail">
              <h3 className="name">{userData.name}</h3>
              <p className="email">{userData.email}</p>
              <p className="joined">
                <span>Joined:</span>{" "}
                {`${new Date(userData.createdAt).toDateString()}`}
              </p>
              {isAuthenticated() && userInfo().user._id === userData._id && (
                <div className="profile-control">
                  <EditProfileBtn />
                  <DeleteProfileBtn userId={userData._id} />
                </div>
              )}
            </div>
          </section>
          <About aboutInfo={userData.about} />
        </>
      )}
    </>
  );
}

export default Profile;
