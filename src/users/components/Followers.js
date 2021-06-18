import React from "react";
import DefaultAvatar from "../../assets/avatar.jpg";
import { Link } from "react-router-dom";

function Followers({ followers, userphoto }) {
  return (
    <div className="profile-tab__followers">
      {followers.length !== 0 &&
        followers.map((user) => {
          return (
            <div key={user._id}>
              <div className="image-section">
                <img
                  src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
                  alt={user.name}
                  className="avatar-img"
                  onError={(i) => (i.target.src = `${DefaultAvatar}`)}
                />
              </div>
              <Link to={`/${user.name.split(" ")[0]}/${user._id}`}>
                {user.name}
              </Link>
            </div>
          );
        })}
      {followers.length === 0 && (
        <h3
          style={{
            margin: "auto",
            fontWeight: "500",
          }}
        >
          No Followers
        </h3>
      )}
    </div>
  );
}

export default Followers;
