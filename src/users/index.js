import axios from "axios";
export const getUserData = async (data) => {
  const { userId, setUserData, userInfo } = data;
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
