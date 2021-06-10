import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../../utils/authrelated";
import { Navigate } from "react-router-dom";
import { ContentLoader } from "../../shared/components/Loader";
import UserCard from "../components/UserCard";
import { getAllUsers } from "../index";
import "./Users.css";
function Users() {
  const [users, setUsers] = useState("");

  useEffect(() => {
    getAllUsers(setUsers);
    console.log("users useEffec");
  }, []);
  if (!isAuthenticated()) {
    return <Navigate to="/authenticate" />;
  }

  return (
    <div className="container">
      {users ? (
        <div className="users">
          {users.map((user) => (
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
