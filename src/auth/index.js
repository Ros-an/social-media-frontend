import axios from "axios";

export const logoutUser = async (dispatch) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    dispatch({ type: "SHOW_LOADER" });
  }
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/signout`
    );

    console.log(response.data.message);
  } catch (err) {
    console.log(err.response);
  }
};
