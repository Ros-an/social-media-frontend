import React, { useEffect, useState } from "react";
import { isAuthenticated, userInfo } from "../../utils/authrelated";
import { Navigate } from "react-router-dom";
import { ContentLoader } from "../../shared/components/Loader";
import UserCard from "../components/UserCard";
import { getAllUsers } from "../index";
import "./Users.css";
function Users() {
  const [users, setUsers] = useState("");
  const [filteredUser, setFilteredUser] = useState("");
  const [text, setText] = useState("");
  const localStore = userInfo();

  useEffect(() => {
    getAllUsers(setUsers);
  }, []);

  useEffect(() => {
    setFilteredUser(users);
  }, [users]);

  useEffect(() => {
    if (text) {
      const searchedUser = users.filter((user) =>
        user.name.toLowerCase().startsWith(text.toLowerCase())
      );
      setFilteredUser(searchedUser);
    } else {
      setFilteredUser(users);
    }
  }, [text, users]);

  if (!isAuthenticated()) {
    return <Navigate to="/authenticate" />;
  }

  return (
    <div className="container users-section">
      {filteredUser ? (
        <>
          <div className="search-box">
            <input
              type="text"
              placeholder="search user"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="users">
            {filteredUser.length === 0 && (
              <h3 className="no-user-found">no user found...</h3>
            )}
            {filteredUser
              ?.filter((user) => user._id !== localStore.user._id)
              .map((user) => (
                <UserCard key={user._id} data={user} />
              ))}
          </div>
        </>
      ) : (
        <ContentLoader />
      )}
    </div>
  );
}

export default Users;
