import React, { useEffect, useState } from "react";
import { isAuthenticated, userInfo } from "../../utils/authrelated";
import { Navigate } from "react-router-dom";
import { ContentLoader } from "../../shared/components/Loader";
import UserCard from "../components/UserCard";
import { getAllUsers } from "../index";
function Users() {
  const [users, setUsers] = useState("");
  const localStore = userInfo();
  useEffect(() => {
    getAllUsers(setUsers);
  }, []);
  if (!isAuthenticated()) {
    return <Navigate to="/authenticate" />;
  }

  return (
    <div className="container users-section">
      {users ? (
        <div className="users">
          {users
            .filter((user) => user._id !== localStore.user._id)
            .map((user) => (
              <UserCard key={user._id} data={user} />
            ))}
        </div>
      ) : (
        <ContentLoader />
      )}
    </div>
  );
}

export default Users;
