import Authenticate from "./auth/pages/Authenticate";
import { isAuthenticated } from "./utils/authrelated";
import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "./users/page/Profile";

function Home() {
  if (!isAuthenticated()) {
    return <Navigate to="/authenticate" />;
  }
  return <div>roshan</div>;
}
function Routing() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/:user/:userId" element={<Profile />} />
        <Route path="/authenticate" element={<Authenticate />} />
      </Routes>
    </>
  );
}

export default Routing;
