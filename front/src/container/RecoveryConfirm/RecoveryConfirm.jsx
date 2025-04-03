import Field from "../../component/field";
import Button from "../../component/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RecoveryConfirm = () => {
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
  };

  return (
    <form className="page__section" method="POST" onSubmit={handleSubmit}>
      <div className="title-container">
        <h1 className="form__title">Recover password</h1>
        <p className="form__sub-title">Choose a recovery method</p>
      </div>

      <div className="form">
        <div className="form__item">
          <Field
            label={`Code`}
            type={`number`}
            className={
              isError
                ? "border--error"
                : "" + successMessage
                ? "border--success"
                : ""
            }
          />
        </div>
        <div className="form__item">
          <Field
            label="New password"
            type="password"
            className={isError ? "border--error" : ""}
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

export default RecoveryConfirm;
