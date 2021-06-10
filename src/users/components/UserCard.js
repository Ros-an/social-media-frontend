import React from "react";
import "./UserCard.css";
import DefaultAvatar from "../../assets/avatar.jpg";
import { Link } from "react-router-dom";

function UserCard({ data }) {
  return (
    <div className="user-card">
      <Link to={`/${data.name}/${data._id}`} className="user-card__info">
        <img src={DefaultAvatar} alt="user" />
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
