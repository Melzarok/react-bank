import { useState } from "react";
import Field from "../../component/field";
import Button from "../../component/button";
import { Link, useNavigate } from "react-router-dom";
import "./style.scss";
import { saveSession } from "../../script/session";
import { useAuth } from "../../contexts/AuthContext";

const SignupForm = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Паролі не співпадають");
      setIsError(true);
    } else {
      setError("");
      setIsError(false);

      try {
        const userData = { email, password };
        const response = await fetch("http://localhost:4000/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        if (!response.ok) {
          throw new Error(`Ошибка сервера: ${response.status}`);
        }

        const data = await response.json();

        if (data.session) {
          saveSession(data.session);
          localStorage.setItem("sessionToken", data.session.token);
          console.log("ses", data.session);
        }

        setError("");
        setIsError(false);

        navigate("/signup-confirm", {
          state: { email },
        });

        return data;
      } catch (error) {
        console.error("Ошибка при регистрации:", error);
        setError(error.message || "Виникла помилка при реєстрації");
      }
    }
  };

  return (
    <form className="page__section" onSubmit={handleSubmit} method="POST">
      <div className="title-container">
        <h1 className="form__title">Sign up</h1>
        <p className="form__sub-title">Choose a registration method</p>
      </div>

      <div className="form">
        <div className="form__item">
          <Field
            label="Email"
            type="email"
            value={email}
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form__item">
          <Field
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={isError ? "border--error" : ""}
          />
        </div>
        <div className="form__item">
          <Field
            label="Password again"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={isError ? "border--error" : ""}
          />
        </div>

        <span>
          Already have an account?{" "}
          <Link to="/signin" className="link">
            Sign In
          </Link>
        </span>

        <div className="button-container">
          <Button type="submit">Sign Up</Button>

          {error && (
            <div className="warning">
              <span>!</span>
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default SignupForm;
