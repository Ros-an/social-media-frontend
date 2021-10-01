import React, { useEffect, useState } from "react";
import { ContentLoader } from "../../shared/components/Loader";
import { userInfo } from "../../utils/authrelated";
import { getUserData } from "../index";
import FollowerNotification from "../components/notification/FollowerNotification";
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
              no notification...
            </h3>
          )}
          <FollowerNotification userData={userData} />
        </>
      ) : (
        <ContentLoader />
      )}
    </section>
  );
}

export default Notification;
