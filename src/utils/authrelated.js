export const isAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem("jwt"));
  // console.log("token", user);
  if (user) {
    return true;
  }
  return false;
};

export const userInfo = () => {
  return JSON.parse(localStorage.getItem("jwt"));
};

export const updateLocalData = ({ name, email }) => {
  let existing = localStorage.getItem("jwt");
  existing = JSON.parse(existing);
  existing.user.name = name;
  existing.user.email = email;
  localStorage.setItem("jwt", JSON.stringify(existing));
};
