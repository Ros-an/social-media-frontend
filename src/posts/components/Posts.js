import axios from "axios";
import React, { useEffect, useCallback } from "react";
import { usePostContext } from "../../context-api/PostProvider";
import PostCard from "./PostCard";
import { ContentLoader } from "../../shared/components/Loader";

import "./Posts.css";

function Posts() {
  const { posts, loader, postDispatch } = usePostContext();
  const getAllPosts = useCallback(async () => {
    try {
      const { data, status } = await axios.get(
        `${process.env.REACT_APP_API_URL}/posts`
      );
      if (data.success && status === 200) {
        postDispatch({ type: "LOAD_POST_DATA", payload: data.posts });
      }
    } catch (err) {
      console.log(err.response);
    }
  }, [postDispatch]);
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts, loader]);
  return (
    <>
      {posts.length === 0 && <ContentLoader />}
      {posts && posts.map((post) => <PostCard data={post} key={post._id} />)}
    </>
  );
}

export default Posts;
