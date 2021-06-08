import "./Toast.css";
import { useAuthContext } from "../../context-api/auth-context";

function Toast() {
  const { closeToast, toastMessage, toast } = useAuthContext();
  if (toast) {
    console.log("close toast");
    setTimeout(() => closeToast(), 3000);
  }
  return (
    <div className={`toast ${toast && "toast-open"}`}>
      <p>-- {`${toastMessage}`}! --</p>
    </div>
  );
}

export default Toast;
