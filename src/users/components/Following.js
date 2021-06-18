import React from "react";
import DefaultAvatar from "../../assets/avatar.jpg";
import { Link } from "react-router-dom";
function Following({ following }) {
  return (
    <div className="profile-tab__following">
      {following.length !== 0 &&
        following.map((user) => {
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
      {!following.length && (
        <h3
          style={{
            margin: "auto",
            fontWeight: "500",
          }}
        >
          you follow no one
        </h3>
      )}
    </div>
  );
}

export default Following;
