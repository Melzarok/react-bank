import { useState, useRef, useContext } from "react";
import Button from "../../component/button";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { saveSession } from "../../script/session";

import "./style.scss";

const SignupConfirm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const inputRefs = useRef([]);

  const handleInputChange = (index, value) => {
    value = value.replace(/[^0-9]/g, "");

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    // Сбрасываем ошибку при вводе
    setIsError(false);
    setError("");
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirmationCode = code.join("");
    const token = localStorage.getItem("sessionToken");

    try {
      const response = await fetch("http://localhost:4000/signup-confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          code: confirmationCode,
          email: email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setIsError(true);
        setError(data.message);
        return;
      }
      saveSession(data.session);

      setIsAuthenticated(true);
      navigate("/balance");
    } catch (err) {
      setIsError(true);
      setError("Помилка підтвердження");
    }
  };

  const handleResendCode = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/signup-confirm?renew=true&email=${email}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Помилка при відправці нового коду");
      }

      setCode(["", "", "", "", "", ""]);
      setError("");
      setIsError(false);
    } catch (err) {
      setIsError(true);
      setError("Помилка при відправці нового коду");
    }
  };

  return (
    <form className="page__section" onSubmit={handleSubmit}>
      <div className="title-container">
        <h1 className="form__title">Confirm account</h1>
        <p className="form__sub-title">
          Enter verification code
          {email && <span className="email-hint">sent to {email}</span>}
        </p>
      </div>

      <div className="form">
        <div className="verification-code">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={code[index]}
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`code-input ${isError ? "error" : ""}`}
            />
          ))}
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="btn-container">
          <Button type="submit">Verify</Button>
          <Button variant="outline" onClick={handleResendCode} type="button">
            Отримати новий код
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SignupConfirm;
