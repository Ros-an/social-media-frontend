import Authenticate from "./auth/pages/Authenticate";
import { Routes, Route } from "react-router-dom";
import Profile from "./users/page/Profile";
import Users from "./users/page/Users";
import EditProfile from "./users/page/EditProfile";
import PrivateRoute from "./private/PrivateRoute";
function Home() {
  return <div className="container">roshan</div>;
}
function Routing() {
  return (
    <>
      <Routes>
        <PrivateRoute exact path="/" element={<Home />} />
        <PrivateRoute path="/users" element={<Users />} />
        <PrivateRoute path="/:user/:userId" element={<Profile />} />
        <PrivateRoute path="/:user/edit/:userId" element={<EditProfile />} />
        <Route path="/authenticate" element={<Authenticate />} />
      </Routes>
    </>
  );
}

export default Routing;
