import React from "react";
import { usePostContext } from "../../context-api/PostProvider";
import PostCard from "./PostCard";
import { ContentLoader } from "../../shared/components/Loader";
import { Loader } from "../../shared/components/Loader";

import "./Posts.css";

function Posts() {
  const { posts, postDispatch, btnLoader, postMessage} = usePostContext();
  const handlePageUpdate = () => {
    postDispatch({
      type: "UPADE_PAGE_NO"
    })
  }
  return (
    <>
    {posts.length === 0 ? <ContentLoader/> : <>
      {posts?.map((post) => (<PostCard data={post} key={post._id} />))}
      <div className="load-more__section">
      {!postMessage && (btnLoader ? <Loader /> : <button className="load-more" onClick={handlePageUpdate}>Load more</button>)}
      {postMessage && <h3>{postMessage}</h3>}
      </div>
    </>}
    </>
  );
}

export default Posts;
