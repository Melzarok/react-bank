import BackButton from "../../component/back-button";
import SignupConfirm from "../../container/Signup-Confirm/SignupConfirm";

const SignupConfirmPage = () => {
  return (
    <div className="page">
      <header>
        <BackButton />
      </header>

      <SignupConfirm />
    </div>
  );
};

export default SignupConfirmPage;
