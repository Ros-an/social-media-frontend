import React, { useState } from "react";
import "./ProfileTab.css";
import Followers from "../components/Followers";
import Following from "../components/Following";
import PostByUser from "../../posts/components/PostByUser";

function ProfileTab({ data }) {
  const [active, setActive] = useState("posts");
  return (
    <>
      <nav className="profile-tab">
        <div
          className={`tab ${active === "posts" && "active-style"}`}
          onClick={() => setActive("posts")}
        >
          Posts
        </div>
        <div
          className={`tab ${active === "following" && "active-style"}`}
          onClick={() => setActive("following")}
        >
          Following
        </div>
        <div
          className={`tab ${active === "followers" && "active-style"}`}
          onClick={() => setActive("followers")}
        >
          Followers
        </div>
      </nav>
      <section className="profile-tab-body">
        {active === "posts" && <PostByUser id={data._id} />}
        {active === "following" && <Following {...data} />}
        {active === "followers" && <Followers {...data} />}
      </section>
    </>
  );
}

export default ProfileTab;
