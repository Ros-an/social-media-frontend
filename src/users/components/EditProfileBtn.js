import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";
import { userInfo } from "../../utils/authrelated";

function EditProfileBtn() {
  return (
    <Link
      to={`/${userInfo().user.name.split(" ")[0]}/${userInfo().user._id}/edit`}
      title="Edit Profile"
    >
      <button className="icontype-btn">
            <EditIcon style={{ color: "var(--color-lightblue)" }} />
      </button>
    </Link>
  );
}

export default EditProfileBtn;
