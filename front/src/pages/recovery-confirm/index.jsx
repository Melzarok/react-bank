import "./style.scss";
import BackButton from "../../component/back-button";
import RecoveryConfirm from "../../container/RecoveryConfirm/RecoveryConfirm";
const RecoveryConfirmPage = () => {
  return (
    <div className="page">
      <header>
        <BackButton />
      </header>

      <RecoveryConfirm />
    </div>
  );
};

export default RecoveryConfirmPage;
