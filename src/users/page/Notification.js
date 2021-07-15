import React, { useEffect, useState } from "react";
import { ContentLoader } from "../../shared/components/Loader";
import { userInfo } from "../../utils/authrelated";
import { getUserData } from "../index";
import "./Notification.css";
function Notification() {
  const [userData, setUserData] = useState();
  useEffect(() => {
    const userId = userInfo()?.user?._id;
    getUserData({ userId, setUserData, userInfo });
  }, []);
  return (
    <section className="notification">
      {userData ? (
        <>
          {userData.followers.length === 0 && (
            <h3 style={{ fontWeight: "400", textAlign: "center" }}>
              no notifcation...
            </h3>
          )}
          {userData.followers.length === 1 && (
            <p className="notify">{`${userData.followers[0].name} has started following you.`}</p>
          )}
          {userData.followers.length > 1 && (
            <p className="notify">{`${userData.followers[0].name} and ${
              userData.followers.length - 1
            } others have started following you.`}</p>
          )}
        </>
      ) : (
        <ContentLoader />
      )}
    </section>
  );
}

export default Notification;
