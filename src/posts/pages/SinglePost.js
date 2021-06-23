import React, {useEffect, useState} from 'react'
import PostCard from "../components/PostCard";
import {useParams, useNavigate } from "react-router-dom";
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import {getPostById, deletePost} from "../postApi";
import {ContentLoader} from "../../shared/components/Loader";
import {userInfo, isAuthenticated} from "../../utils/authrelated";
import { useGeneralContext } from '../../context-api/GeneralTaskProvider';
import "./SinglePost.css";
function SinglePost() {
    const {postId} = useParams();
    const {dispatch} = useGeneralContext();
    const [post,setPost] = useState("");
    let navigate = useNavigate();

    const handleDeletePost = () => {
        deletePost({ postId, userInfo, navigate, dispatch});
    }
    const deleteConfirm = () => {
        const answer = window.confirm(
          "Are you sure, you wanna delete this post ?"
        );
        if (answer) {
          handleDeletePost();
        }
      };
    const navigateToEditPage = () => {
        navigate(`/${userInfo().user.name.split(" ")[0]}/post/${postId}/edit`)
    }
    useEffect(()=>{
        getPostById({postId, setPost})
    },[postId])

    return (
        <>
        {!post && <ContentLoader />}
        {post && <section className="container single-post" >
            {isAuthenticated() && userInfo().user._id === post.postedBy._id &&<div className="post-control">
                <button className="edit icontype-btn" onClick={navigateToEditPage}>
                    <EditRoundedIcon />
                </button>
                <button className="delete icontype-btn" onClick={deleteConfirm}>
                    <DeleteRoundedIcon />
                </button>
            </div>}
            <PostCard data={post} />
        </section>}
        </>
    )
}

export default SinglePost
