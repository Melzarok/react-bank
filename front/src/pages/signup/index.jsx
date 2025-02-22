import "./style.scss";
import BackButton from "../../component/back-button";
import SignupForm from "../../container/SignUpForm/SignupForm";

const SignUpPage = () => {
  return (
    <div className="page">
      <header>
        <BackButton />
      </header>

      <SignupForm />
    </div>
  );
};

export default SignUpPage;
