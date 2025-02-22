import "./style.scss";

const Button = ({ children, onClick, variant = "filled" }) => {
  return (
    <button onClick={onClick} className={`btn btn--purple-${variant}`}>
      {children}
    </button>
  );
};

export default Button;
