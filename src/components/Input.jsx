import React, { useId } from "react";

const Input = ({ label, name, type, value, chnageFunc }) => {
  const id = useId();
  return (
    <div className="field">
      <label htmlFor={id}>{label} :</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={chnageFunc}
        id={id}
      />
    </div>
  );
};

export default Input;
