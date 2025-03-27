import "./style.scss";
import BackButton from "../../component/back-button";
import SigninForm from "../../container/SignInForm/SigninForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SignInPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.session) {
      navigate("/");
    }
  }, [navigate]);

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
