import React, { useEffect, useState } from "react";

const InputText = ({
  value,
  setValue,
  password,
  customClass,
  placeholder,
  email,
  ...props
}) => {
  const [type, setType] = useState("text");

  useEffect(() => {
    const checkType = () => {
      if (email) {
        setType("email");
      }
      if (password) {
        setType("password");
      }
    };
    checkType();
  }, [email, password]);

  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
      }}
      className={customClass}
      type={type}
      {...props}
    />
  );
};

export default InputText;
