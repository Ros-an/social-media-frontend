export const isAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem("jwt"));
  // console.log("token", user);
  if (user) {
    return true;
  }
  return false;
};
