import React, { useEffect, useRef } from "react";
import "./UserCard.css";
import DefaultAvatar from "../../assets/avatar.jpg";
import { Link } from "react-router-dom";

function UserCard({ data }) {
  const imageRef = useRef();
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
        to={`/${data.name.split(" ")[0]}/${data._id}`}
        className="user-card__info"
      >
        <div className="image">
          <img src={DefaultAvatar} ref={imageRef} alt="user" />
        </div>
        <div className="user-detail">
          <p className="user-name">{data.name}</p>
          <p>
            <small>Here will be the user headline</small>
          </p>
        </div>
      </Link>
      <button>Follow</button>
    </div>
  );
}

export default UserCard;
