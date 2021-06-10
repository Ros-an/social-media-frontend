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
