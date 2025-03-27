import Field from "../../component/field";
import Button from "../../component/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RecoveryForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError(false);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:4000/recovery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(`Помилка при отправці кода: ${response.status}`);
      }

      setSuccessMessage("Код відправлено");
      navigate("/recovery-confirm", { state: { email } });
    } catch (error) {
      console.error("Помилка при відправці кода", error);
      setIsError(true);
      setErrorMessage("Помилка при відправці кода");
    }
  };

  return (
    <form className="page__section" method="POST" onSubmit={handleSubmit}>
      <div className="title-container">
        <h1 className="form__title">Recovery password</h1>
        <p className="form__sub-title">Choose a recovery method</p>
      </div>

      <div className="form">
        <div className="form__item">
          <Field
            label={`Email`}
            type={`email`}
            onChange={(e) => setEmail(e.target.value)}
            className={
              isError
                ? "border--error"
                : "" + successMessage
                ? "border--success"
                : ""
            }
          />
        </div>

        <div className="btn-container">
          <Button type="submit">Send Code</Button>
        </div>

        <div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}

          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
        </div>
      </div>
    </form>
  );
};

export default RecoveryForm;
