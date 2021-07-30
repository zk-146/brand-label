import React from "react";

function InputTextArea({ value, setValue }) {
  return (
    <textarea
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
      }}
      rows="8"
      placeholder="Description"
      className="create__descriptionInput"
      type="text"
    />
  );
}

export default InputTextArea;
