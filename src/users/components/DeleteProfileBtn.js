import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteUserAccount } from "../index";
import { logoutUser } from "../../auth/index";
import { userInfo } from "../../utils/authrelated";
import { useGeneralContext } from "../../context-api/GeneralTaskProvider";

function DeleteProfileBtn({ userId }) {
  const { dispatch } = useGeneralContext();
  const deleteAccount = () => {
    deleteUserAccount({ logoutUser, dispatch, userId, userInfo });
  };
  const deleteConfirm = () => {
    const answer = window.confirm(
      "Are you sure, you wanna delete your account ?"
    );
    console.log(answer);
    if (answer) {
      deleteAccount();
    }
  };
  return (
    <div
      className="delete-account"
      title="Delete Account"
      onClick={() => deleteConfirm()}
    >
      <DeleteIcon style={{ color: "red" }} />
      <small style={{ color: "black", textDecoration: "underline" }}>
        Delete
      </small>
    </div>
  );
}

export default DeleteProfileBtn;
