import backButton from "./back-button.svg";
import "./style.scss";

function BackButton() {
  function back() {
    return window.history.back();
  }

  return (
    <div className="back-button" onClick={back}>
      <img src={backButton} alt="<" width="24" height="24"></img>
    </div>
  );
}

export default BackButton;
