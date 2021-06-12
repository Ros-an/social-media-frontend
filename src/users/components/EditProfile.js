import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";
import { userInfo } from "../../utils/authrelated";

function EditProfile() {
  return (
    <Link
      to={`/${userInfo().user.name}/edit/${userInfo().user._id}/`}
      title="Edit Profile"
    >
      <EditIcon style={{ color: "var(--color-lightblue)" }} />
      <small style={{ color: "black" }}>Edit</small>
    </Link>
  );
}

export default EditProfile;
