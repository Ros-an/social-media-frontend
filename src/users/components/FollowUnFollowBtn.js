import React from "react";
import "./FollowUnFollowBtn.css";
import { userInfo } from "../../utils/authrelated";
function FollowUnFollowBtn({ data, follow, unFollow }) {
  let match;
  if (data) {
    const jwt = userInfo();
    match = data.followers.some((follow) => follow._id === jwt.user._id);
  }

  return (
    <div className="follow-unfollow">
      {match ? (
        <button className="unfollow" onClick={() => unFollow()}>
          Unfollow
        </button>
      ) : (
        <button className="follow" onClick={() => follow()}>
          Follow
        </button>
      )}
    </div>
  );
}

export default FollowUnFollowBtn;
