import "./style.scss";

const Button = ({ children, onClick, variant = "filled" }) => {
  return (
    <button className={`btn btn--purple-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
