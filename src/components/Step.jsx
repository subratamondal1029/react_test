import React from "react";

const Step = ({ name, isActive, step, clickFunc }) => {
  return (
    <div
      className={`step ${isActive ? "active" : ""}`}
      onClick={() => clickFunc(step)}
    >
      {name}
    </div>
  );
};

export default Step;
