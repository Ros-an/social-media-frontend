import Authenticate from "./auth/pages/Authenticate";
import { Routes, Route } from "react-router-dom";
import Profile from "./users/page/Profile";
import Users from "./users/page/Users";
import EditProfile from "./users/page/EditProfile";
import EditPost from "./posts/pages/EditPost";
import PrivateRoute from "./private/PrivateRoute";
import Feed from "./posts/pages/Feed";
import SinglePost from "./posts/pages/SinglePost";
function Routing() {
  return (
    <>
      <Routes>
        <PrivateRoute exact path="/" element={<Feed />} />
        <PrivateRoute path="/users" element={<Users />} />
        <PrivateRoute path="/:user/:userId" element={<Profile />} />
        <PrivateRoute path="/:user/:userId/edit" element={<EditProfile />} />
        <PrivateRoute path="/:user/post/:postId/edit" element={<EditPost />} />
        <PrivateRoute path="/:user/post/:postId" element={<SinglePost />} />
        <Route path="/authenticate" element={<Authenticate />} />
      </Routes>
    </>
  );
}

export default Routing;
