import React from "react";

const Button = ({ label, type, clickFunc }) => {
  return (
    <button className="formBtn" type={type} onClick={clickFunc}>
      {label}
    </button>
  );
};

export default Button;
