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
      console.log("post created", data);
      setData({
        post: "",
      });
      setModalToggle(false);
      postDispatch({ type: "RELOAD" });
    }
  } catch (err) {
    console.log("found error", err.response);
  } finally {
    setLoading(false);
  }
};
