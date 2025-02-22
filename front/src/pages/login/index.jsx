import "./style.scss";
import BackButton from "../../component/back-button";
import SigninForm from "../../container/SignInForm/SigninForm";

const SignInPage = () => {
  return (
    <div className="page">
      <header>
        <BackButton />
      </header>

      <SigninForm />
    </div>
  );
};

export default SignInPage;
