import React from "react";
import TransitionsModal from "./CreatePostModal";
import Posts from "../components/Posts";
function Feed() {
  return (
    <section className="container feed">
      <TransitionsModal />
      <Posts />
    </section>
  );
}

export default Feed;
