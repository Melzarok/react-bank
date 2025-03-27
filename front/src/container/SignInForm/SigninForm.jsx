import Field from "../../component/field";
import Button from "../../component/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const SigninForm = () => {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError(false);
    setErrorMessage("");

    if (!email || !password) {
      setIsError(true);
      setErrorMessage("Пожалуйста, заполните все поля");
      return;
    }

    try {
      await login(email, password);
      navigate("/balance");
    } catch (error) {
      setIsError(true);
      setErrorMessage("Неверный email или пароль");
    }
  };

  return (
    <form className="page__section" method="POST" onSubmit={handleSubmit}>
      <div className="title-container">
        <h1 className="form__title">Sign in</h1>
        <p className="form__sub-title">Choose a registration method</p>
      </div>

      <div className="form">
        <div className="form__item">
          <Field
            label={`Email`}
            type={`email`}
            className={isError ? "border--error" : ""}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form__item">
          <Field
            label={`Password`}
            type={`password`}
            className={isError ? "border--error" : ""}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {errorMessage && <span className="error-message">{errorMessage}</span>}

        <span>
          Already have an account?{" "}
          <Link to="/recovery" className="link">
            Recovery
          </Link>
        </span>

        <div className="btn-container">
          <Button type="submit">Login</Button>
        </div>
      </div>
    </form>
  );
};

export default SigninForm;
