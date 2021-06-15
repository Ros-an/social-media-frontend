import axios from "axios";
export const getUserData = async ({
  userId,
  setUserData,
  userInfo,
  setLoading,
}) => {
  try {
    setLoading(true);
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
  } finally {
    setLoading(false);
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
      console.log("data after delete", data);
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
      console.log(data);
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
      setNavigation(true);
    }
  } catch (err) {
    console.log(err.response);
    setErrorMessage(err.response.data.message);
  } finally {
    setLoading(false);
  }
};
