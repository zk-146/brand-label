import "./Button.css";

import React from "react";

function Button({ value, handleClick, customClass }) {
  return (
    <input
      className={"btn " + customClass}
      type="button"
      value={value}
      onClick={(event) => {
        handleClick(event);
      }}
    />
  );
}

export default Button;
