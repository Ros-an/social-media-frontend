import "./Toast.css";
import { useGeneralContext } from "../../context-api/GeneralTaskProvider";

function Toast() {
  const { closeToast, toastMessage, toast } = useGeneralContext();
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
