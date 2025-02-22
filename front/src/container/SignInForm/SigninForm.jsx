import Field from "../../component/field";
import Button from "../../component/button";
import { Link } from "react-router-dom";

const SigninForm = () => {
  return (
    <form className="page__section" method="POST">
      <div className="title-container">
        <h1 className="form__title">Sign in</h1>
        <p className="form__sub-title">Choose a registration method</p>
      </div>

      <div className="form">
        <div className="form__item">
          <Field label={`Email`} type={`email`} />
        </div>
        <div className="form__item">
          <Field
            label={`Password`}
            type={`password`}
            className={`border--error`}
            errorText={`This password is too simple`}
          />
        </div>

        <span>
          Already have an account?{" "}
          <Link to="/recovery" className="link">
            Recovery
          </Link>
        </span>

        <div className="btn-container">
          <Button type="submit">Sign Up</Button>
        </div>
      </div>
    </form>
  );
};

export default SigninForm;
