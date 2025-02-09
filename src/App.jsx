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
        {
          label: "Gender",
          name: "gender",
          type: "radio",
          options: ["Male", "Female"],
        },
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

  const validationRules = {
    name: [
      { required: true, message: "Name is required." },
      { min: 3, message: "Name must be at least 3 characters." },
    ],
    email: [
      { required: true, message: "Email is required." },
      {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Invalid email format.",
      },
    ],
    gender: [
      { required: true, message: "Gender is required." },
      {
        custom: (value) => ["male", "female"].includes(value.toLowerCase()),
        message: "Invalid gender selection.",
      },
    ],
    education: [{ required: true, message: "Education is required." }],
    experience: [{ required: true, message: "Experience is required." }],
  };

  // Generic validation function
  const validateStepData = (formData, rules, currentFields) => {
    const errors = {};

    currentFields.forEach(({ name }) => {
      if (rules[name]) {
        const fieldRules = rules[name];
        const value = formData[name]?.trim?.() || formData[name];

        for (const rule of fieldRules) {
          if (rule.required && !value) {
            errors[name] = rule.message;
            break;
          }
          if (rule.min && value.length < rule.min) {
            errors[name] = rule.message;
            break;
          }
          if (rule.pattern && !rule.pattern.test(value)) {
            errors[name] = rule.message;
            break;
          }
          if (rule.custom && !rule.custom(value)) {
            errors[name] = rule.message;
            break;
          }
        }
      }
    });

    return errors;
  };

  const [step, setStep] = useState(1);
  const [data, setData] = useState(defaultFormData);
  const [errors, setErrors] = useState({});

  const handleChangeStep = (selectedStep) => {
    if (selectedStep < step) {
      setStep(selectedStep);
    } else {
      const stepErrors = validateStepData(
        data,
        validationRules,
        steps[step - 1].fields
      );

      setErrors(stepErrors);

      if (Object.keys(stepErrors).length === 0) {
        setStep(selectedStep);
      }
    }
  };

  const handleChnage = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allFields = steps.flatMap((step) => step.fields);
    const errors = validateStepData(data, validationRules, allFields);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      console.log(data);
      alert(`Form Submited successfully ${data.name}`);
    } else {
      console.log(errors);
      const firstErrorKey = Object.keys(errors)[0];
      const firstErrorStepIndex = steps.findIndex((step) =>
        step.fields.some((field) => field.name === firstErrorKey)
      );

      setStep(firstErrorStepIndex + 1);
    }
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
              error={errors[field.name]}
              options={field?.options}
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
