import axios from "axios";
export const getUserData = async ({ userId, setUserData, userInfo }) => {
  try {
    const { data, status } = await axios.get(
      `${process.env.REACT_APP_API_URL}/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${userInfo().token}`,
        },
      }
    );
    if (data.success && status === 200) {
      setUserData(data.user);
    }
  } catch (err) {
    console.log(err.response);
  }
};

export const deleteUserAccount = async ({
  logoutUser,
  dispatch,
  userId,
  userInfo,
}) => {
  try {
    const { data, status } = await axios.delete(
      `${process.env.REACT_APP_API_URL}/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${userInfo().token}`,
        },
      }
    );
    if (data.success && status === 200) {
      logoutUser(dispatch);
    }
  } catch (err) {
    console.log(err.response);
  }
};

export const getAllUsers = async (setUsers) => {
  try {
    const { data, status } = await axios.get(
      `${process.env.REACT_APP_API_URL}/users`
    );
    if (data.success && status === 200) {
      setUsers(data.users);
    }
  } catch (err) {
    console.log("Error:", err.response);
  }
};

export const userDataForEdit = async ({ userId, setData, userInfo }) => {
  try {
    const { data, status } = await axios.get(
      `${process.env.REACT_APP_API_URL}/user/edit/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${userInfo().token}`,
        },
      }
    );
    if (data.success && status === 200) {
      setData((prevValue) => ({
        ...prevValue,
        name: data.user.name,
        email: data.user.email,
        about: data.user.about,
      }));
    }
  } catch (err) {
    console.log(err.response);
  }
};

export const updateProfile = async ({
  userInfo,
  userId,
  formData,
  setNavigation,
  setErrorMessage,
  setLoading,
  updateLocalData,
}) => {
  try {
    const { data, status } = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/${userId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${userInfo().token}`,
        },
      }
    );
    if (data.success && status === 200) {
      if (data.result._id === userInfo().user._id) {
        const { name, email } = data.result;
        updateLocalData({ name, email });
      }
      setNavigation(true);
    }
  } catch (err) {
    console.log(err.response);
    setErrorMessage(err.response.data.message);
  } finally {
    setLoading(false);
  }
};

export const followUser = async ({
  userId,
  followId,
  userInfo,
  setUserData,
}) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/follow`,
      {
        userId,
        followId,
      },
      {
        headers: {
          Authorization: `Bearer ${userInfo().token}`,
        },
      }
    );
    if (data.success) {
      setUserData(data.user);
    }
  } catch (err) {
    console.log("this is error", err.response);
  }
};

export const unFollowUser = async ({
  userId,
  unFollowId,
  userInfo,
  setUserData,
}) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/unfollow`,
      {
        userId,
        unFollowId,
      },
      {
        headers: {
          Authorization: `Bearer ${userInfo().token}`,
        },
      }
    );
    if (data.success) {
      setUserData(data.user);
    }
  } catch (err) {
    console.log("this is error", err.response);
  }
};
