import Field from "../../component/field";
import Button from "../../component/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

import { useCookies } from "react-cookie";

const SigninForm = () => {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(["test1"]);

  const handleSetCookie = () => {
    setCookie("testCookie", "Hello, World!", { path: "/", maxAge: 180 }); // Устанавливаем cookie на 1 час
    console.log("Cookie установлено: testCookie = Hello, World!");
  };

  const handleGetCookie = () => {
    const cookieValue = cookies.testCookie;
    console.log("Полученное значение cookie:", cookieValue);
    alert(`Cookie значение: ${cookieValue || "Cookie не найдено"}`);
  };

  const handleRemoveCookie = () => {
    removeCookie("testCookie", { path: "/" });
    console.log("Cookie удалено: testCookie");
  };

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

        <div style={{ padding: "20px", fontFamily: "Arial" }}>
          <h1>Тест работы с Cookies</h1>
          <button onClick={handleSetCookie} style={{ margin: "5px" }}>
            Установить Cookie
          </button>
          <button onClick={handleGetCookie} style={{ margin: "5px" }}>
            Получить Cookie
          </button>
          <button onClick={handleRemoveCookie} style={{ margin: "5px" }}>
            Удалить Cookie
          </button>
        </div>
      </div>
    </form>
  );
};

export default SigninForm;
