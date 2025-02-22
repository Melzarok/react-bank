import "./style.scss";

function Field({
  className,
  placeholder,
  label,
  name,
  type,
  onChange,
  errorText,
}) {
  const containerClass = `field__container ${
    className?.includes("border--error") ? "border--error" : ""
  }`;
  const inputClass = `field ${
    className?.includes("border--error") ? "" : className || ""
  }`;

  return (
    <div className={containerClass}>
      <label htmlFor={name} className="field__title">
        {label}
      </label>
      <input
        className={inputClass}
        placeholder={placeholder}
        name={name}
        type={type}
        onChange={onChange}
      />

      {errorText && <span>{errorText}</span>}
    </div>
  );
}

export default Field;
