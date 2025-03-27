import "./style.scss";
import BackButton from "../../component/back-button";
import RecoveryForm from "../../container/Recovery/recoveryForm";

const RecoveryPage = () => {
  return (
    <div className="page">
      <header>
        <BackButton />
      </header>

      <RecoveryForm />
    </div>
  );
};

export default RecoveryPage;
