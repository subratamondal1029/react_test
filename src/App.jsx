import React, { useState } from "react";
import { Step, Button, Input } from "./components";
import "./App.css";

function App() {
  const defaultFormData = {
    name: "",
    email: "",
    gender: "",
    education: "",
    experience: "",
  };

  const steps = [
    {
      label: "Profile",
      fields: [
        { label: "Name", name: "name", type: "text" },
        { label: "Email", name: "email", type: "email" },
        { label: "Gender", name: "gender", type: "text" },
      ],
    },
    {
      label: "Education",
      fields: [{ label: "Degree", name: "education", type: "text" }],
    },
    {
      label: "Experience",
      fields: [
        { label: "Years of Experience", name: "experience", type: "number" },
      ],
    },
  ];

  const [step, setStep] = useState(1);
  const [data, setData] = useState(defaultFormData);

  const handleChangeStep = (step) => {
    setStep(step);
  };

  const handleChnage = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <>
      <div className="formContainer">
        <div className="steps">
          {steps.map((stepName, i) => (
            <Step
              name={stepName.label}
              step={i + 1}
              isActive={i + 1 === step}
              clickFunc={handleChangeStep}
              key={i}
            />
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          {steps[step - 1].fields.map((field, i) => (
            <Input
              key={i}
              label={field.label}
              name={field.name}
              type={field.type}
              value={data[field.name]}
              chnageFunc={handleChnage}
            />
          ))}
          <div className="buttons">
            {step > 1 && (
              <Button
                label="Back"
                clickFunc={() => handleChangeStep(step - 1)}
                type="button"
              />
            )}
            {step < steps.length && (
              <Button
                label="Next"
                clickFunc={() => handleChangeStep(step + 1)}
                type="button"
              />
            )}
            {step === steps.length && <Button label="Submit" type="submit" />}
          </div>
        </form>
      </div>
    </>
  );
}

export default App;
