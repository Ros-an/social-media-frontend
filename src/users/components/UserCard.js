import React, { useEffect, useRef, useState } from "react";
import "./UserCard.css";
import DefaultAvatar from "../../assets/avatar.jpg";
import { Link } from "react-router-dom";
import { userInfo } from "../../utils/authrelated";
import { unFollowUser, followUser } from "../index";
import FollowUnFollowBtn from "./FollowUnFollowBtn";

function UserCard({ data }) {
  const [userData, setUserData] = useState(data);
  const imageRef = useRef();
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
    if (data.userphoto) {
      imageRef.current.src = `${process.env.REACT_APP_API_URL}/user/photo/${data._id}`;
    } else {
      imageRef.current.src = `${DefaultAvatar}`;
    }
  });
  return (
    <div className="user-card">
      <Link
        to={`/${userData.name.split(" ")[0]}/${userData._id}`}
        className="user-card__info"
      >
        <div className="image">
          <img src={DefaultAvatar} ref={imageRef} alt="user" />
        </div>
        <div className="user-detail">
          <p className="user-name">{userData.name}</p>
          <p>
            <small>
              {userData.about ? `${userData.about.substring(0, 20)}...` : ""}
            </small>
          </p>
        </div>
      </Link>
      <FollowUnFollowBtn
        disableBtn={true}
        data={userData}
        follow={follow}
        unFollow={unFollow}
      />
    </div>
  );
}

export default UserCard;
