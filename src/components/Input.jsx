import React, { useId } from "react";

const Input = ({
  label,
  name,
  type = "text",
  value,
  changeFunc,
  error = "",
  options = [],
}) => {
  const id = useId();

  return (
    <div className="field">
      <label htmlFor={id}>{label} :</label>
      {type === "radio" ? (
        options.map((option, i) => (
          <div key={i}>
            <input
              type={type}
              value={option}
              name={name}
              id={`${id}-${i}`}
              checked={value === option}
              onChange={changeFunc}
            />{" "}
            <label htmlFor={`${id}-${i}`}>{option}</label>
          </div>
        ))
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={changeFunc}
          id={id}
          key={id}
        />
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Input;
