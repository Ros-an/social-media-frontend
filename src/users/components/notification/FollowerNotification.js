import React from "react";

function FollowerNotification({ userData }) {
  return (
    <>
      {userData.followers.length === 1 && (
        <p className="notify">{`${userData.followers[0].name} has started following you.`}</p>
      )}
      {userData.followers.length > 1 && (
        <p className="notify">{`${userData.followers[0].name} and ${
          userData.followers.length - 1
        } others have started following you.`}</p>
      )}
    </>
  );
}

export default FollowerNotification;
