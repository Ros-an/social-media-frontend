import Authenticate from "./auth/pages/Authenticate";
import { isAuthenticated } from "./utils/authrelated";
import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "./users/page/Profile";
import Users from "./users/page/Users";
import EditProfileForm from "./users/page/EditProfileForm";

function Home() {
  if (!isAuthenticated()) {
    return <Navigate to="/authenticate" />;
  }
  return <div className="container">roshan</div>;
}
function Routing() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/:user/:userId" element={<Profile />} />
        <Route path="/:user/edit/:userId" element={<EditProfileForm />} />
        <Route path="/authenticate" element={<Authenticate />} />
      </Routes>
    </>
  );
}

export default Routing;
