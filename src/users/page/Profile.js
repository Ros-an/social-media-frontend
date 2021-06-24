import React, { useState, useEffect } from "react";
import { ContentLoader } from "../../shared/components/Loader";
import { isAuthenticated, userInfo } from "../../utils/authrelated";
import { useParams } from "react-router-dom";
import { getUserData, followUser, unFollowUser } from "../index";
import ProfileImage from "../../assets/avatar.jpg";
import Image from "../components/Image";
import BackgroundImage from "../../assets/background.jpg";
import DeleteProfileBtn from "../components/DeleteProfileBtn";
import EditProfileBtn from "../components/EditProfileBtn";
import About from "../components/About";
import FollowUnFollowBtn from "../components/FollowUnFollowBtn";
import ProfileTab from "../components/ProfileTab";
import "./Profile.css";

function Profile() {
  const { userId } = useParams();
  const [userData, setUserData] = useState("");
  const follow = () => {
    const userId = userInfo().user._id;
    const followId = userData._id;
    followUser({ userId, followId, userInfo, setUserData });
  };
  const unFollow = () => {
    const userId = userInfo().user._id;
    const unFollowId = userData._id;
    unFollowUser({ userId, unFollowId, userInfo, setUserData });
  };
  useEffect(() => {
    getUserData({ userId, setUserData, userInfo });
    console.log("profile useEffect");
  }, [userId]);
  return (
    <>
      {userData ? (
        <>
          <section className="profile-card">
            <div className="profile-background">
              <Image
                url={"background"}
                photo={BackgroundImage}
                id={userData._id}
              />
            </div>
            <Image
              url={"photo"}
              photo={ProfileImage}
              id={userData._id}
              styling="profile-img"
            />
            <div className="profile-detail">
              <h3 className="name">{userData.name}</h3>
              <p className="email">{userData.email}</p>
              <div className="profile-detail--one">
                <p className="follow-unfollow">
                  {`${userData.following.length}  Following, `}
                  {`  ${userData.followers.length}  Follower`}
                </p>
                <p className="joined">
                  <span>Joined:</span>{" "}
                  {`${new Date(userData.createdAt).toDateString()}`}
                </p>
              </div>
              <div className="profile-detail--two">
                {isAuthenticated() && userInfo().user._id === userData._id ? (
                  <>
                    <EditProfileBtn />
                    <DeleteProfileBtn userId={userData._id} />
                  </>
                ) : (
                  <FollowUnFollowBtn
                    data={userData}
                    follow={follow}
                    unFollow={unFollow}
                  />
                )}
              </div>
            </div>
          </section>
          <About aboutInfo={userData.about} />
          <ProfileTab data={userData} />
        </>
      ) : (
        <ContentLoader />
      )}
    </>
  );
}

export default Profile;
