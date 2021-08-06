import React from "react";
import { usePostContext } from "../../context-api/PostProvider";
import PostCard from "./PostCard";
import { ContentLoader } from "../../shared/components/Loader";

import "./Posts.css";

function Posts() {
  const { posts } = usePostContext();
  
  return (
    <>
    {posts.length === 0 ? <ContentLoader/> : posts?.map((post) => (<PostCard data={post} key={post._id} />))}
    </>
  );
}

export default Posts;
