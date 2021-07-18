import axios from "axios";

export const createPost = async ({
  userInfo,
  formData,
  setLoading,
  setModalToggle,
  postDispatch,
  setData,
}) => {
  try {
    setLoading(true);
    const { data, status } = await axios.post(
      `${process.env.REACT_APP_API_URL}/post/new/${userInfo().user._id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${userInfo().token}`,
        },
      }
    );
    if (data.success && status === 200) {
      setData({
        post: "",
      });
      setModalToggle(false);
      postDispatch({ type: "ADD_POST", payload: data.result });
    }
  } catch (err) {
    console.log("found error", err.response);
  } finally {
    setLoading(false);
  }
};

export const deletePost = async ({
  userInfo,
  postId,
  navigate,
  dispatch,
  postDispatch,
}) => {
  try {
    const { data, status } = await axios.delete(
      `${process.env.REACT_APP_API_URL}/post/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${userInfo().token}`,
        },
      }
    );
    if (data.success && status === 200) {
      dispatch({
        type: "TOAST_OPEN",
        payload: "Deletion of selected post: Successfull !",
      });
      navigate(`/${userInfo().user.name.split(" ")[0]}/${userInfo().user._id}`);
      postDispatch({ type: "REMOVE", payload: postId });
    }
  } catch (err) {
    console.log("found error", err.response);
  }
};

export const getPostById = async ({ postId, setPost }) => {
  try {
    const { data, status } = await axios.get(
      `${process.env.REACT_APP_API_URL}/post/${postId}`
    );
    if (data.success && status === 200) {
      setPost(data.post);
    }
  } catch (err) {
    console.log("found error", err.response);
  }
};

export const getPostForEdit = async ({ postId, setData }) => {
  try {
    const { data, status } = await axios.get(
      `${process.env.REACT_APP_API_URL}/post/${postId}`
    );
    if (data.success && status === 200) {
      setData((prevValue) => ({
        ...prevValue,
        post: data.post.post,
      }));
    }
  } catch (err) {
    console.log("found error", err.response);
  }
};

export const updatePost = async ({
  userInfo,
  postId,
  formData,
  setNavigation,
  setErrorMessage,
  postDispatch,
  setLoading,
}) => {
  try {
    const { data, status } = await axios.post(
      `${process.env.REACT_APP_API_URL}/post/${postId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${userInfo().token}`,
        },
      }
    );
    if (data.success && status === 200) {
      postDispatch({ type: "RELOAD" });
      setNavigation(true);
    }
  } catch (err) {
    console.log(err.response);
    setErrorMessage(err.response.data.message);
  } finally {
    setLoading(false);
  }
};

export const addToLikeList = async ({
  userInfo,
  postId,
  userId,
  setUpdate,
  postDispatch,
}) => {
  try {
    const { data, status } = await axios.post(
      `${process.env.REACT_APP_API_URL}/post/like`,
      {
        postId,
        userId,
      },
      {
        headers: {
          Authorization: `Bearer ${userInfo().token}`,
        },
      }
    );
    if (data.success && status === 200) {
      setUpdate(data.post);
      postDispatch({ type: "UPDATE", payload: data.post });
    }
  } catch (err) {
    console.log(err.response);
  }
};

export const removeFromLikeList = async ({
  userInfo,
  postId,
  userId,
  setUpdate,
  postDispatch,
}) => {
  try {
    const { data, status } = await axios.post(
      `${process.env.REACT_APP_API_URL}/post/unlike`,
      {
        postId,
        userId,
      },
      {
        headers: {
          Authorization: `Bearer ${userInfo().token}`,
        },
      }
    );
    if (data.success && status === 200) {
      setUpdate(data.post);
      postDispatch({ type: "UPDATE", payload: data.post });
    }
  } catch (err) {
    console.log(err.response);
  }
};

export const addComment = async ({
  userInfo,
  postId,
  userId,
  text,
  setText,
  setLoader,
  postDispatch,
  setUpdate,
}) => {
  try {
    setLoader(true);
    const { data, status } = await axios.post(
      `${process.env.REACT_APP_API_URL}/post/comment`,
      {
        postId,
        userId,
        comment: { text },
      },
      {
        headers: {
          Authorization: `Bearer ${userInfo().token}`,
        },
      }
    );
    if (data.success && status === 200) {
      setText("");
      setUpdate(data.comment.comments);
      postDispatch({ type: "UPDATE", payload: data.comment });
    }
  } catch (err) {
    console.log(err.response);
  }
  setLoader(false);
};
