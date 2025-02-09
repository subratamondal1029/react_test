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

  // Steps array contains objects with label and fields
  const steps = [
    {
      label: "Profile",
      fields: [
        // Each field is an object with label, name, type, and
        // optional options for radio buttons
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

  // Validation rules object with nested arrays of rules
  const validationRules = {
    name: [
      // Each rule is an object with required, pattern, or custom
      // properties and message property
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
  const validateStepData = (
    formData,
    currentFields = steps[step - 1].fields,
    rules = validationRules
  ) => {
    const errors = {};

    currentFields.forEach(({ name }) => {
      if (rules[name]) {
        const fieldRules = rules[name];
        const value = formData[name]?.trim() || formData[name];

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

    const firstErrorKey = Object.keys(errors)[0];
    if (firstErrorKey) {
      const firstErrorStepIndex = steps.findIndex((step) =>
        step.fields.some((field) => field.name === firstErrorKey)
      );

      setStep(firstErrorStepIndex + 1);
    }
    setErrors(errors);

    return firstErrorKey ? false : true;
  };

  const [step, setStep] = useState(1);
  const [data, setData] = useState(defaultFormData);
  const [errors, setErrors] = useState({});

  // Function to handle step changes
  const handleChangeStep = (selectedStep) => {
    if (selectedStep < step) {
      // If going back, just change the step
      setStep(selectedStep);
    } else {
      // If going forward, validate the current step
      const isValid = validateStepData(data);

      if (isValid) {
        // If no errors, change the step
        setStep(selectedStep);
      }
    }
  };

  // Function to handle field changes
  const handleChnage = (e) => {
    const newData = { ...data, [e.target.name]: e.target.value };
    validateStepData(newData);
    setData((prev) => newData);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const allFields = steps.flatMap((step) => step.fields);
    const isValid = validateStepData(data, allFields);

    if (isValid) {
      console.log(data);
      alert(`Form Submited successfully ${data.name}`);
    }
  };

  return (
    <>
      <div className="formContainer">
        <div className="steps">
          {steps.map((stepName, i) => (
            // Step component displays the label and handles step changes
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
            // Input component displays the label, value, and error message
            // and handles changes to the field
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
              // Button component displays the label and handles clicks
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
            {step === steps.length && (
              // Submit button is only visible when on the last step
              <Button label="Submit" type="submit" />
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default App;
