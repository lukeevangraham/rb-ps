import react from "react";
import TextareaAutoSize from "react-textarea-autosize";

import classes from "./Input.module.scss";

const Input = ({
  elementType,
  elementConfig,
  value,
  changed,
  required,
  width,
}) => {
  let inputElement = null;

  
  const inputClasses = [classes.input];

  switch (elementType) {
    case "input":
      inputElement = (
        <input
          type="text"
          {...elementConfig}
          value={value}
          onChange={changed}
          name={elementConfig.placeholder}
          required={required ? true : null}
          style={{ width: width ? width : "100%" }}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <TextareaAutoSize
          {...elementConfig}
          value={value}
          onChange={changed}
          name={elementConfig.placeholder}
          required={required ? true : null}
          style={{ width: width ? width : "100%" }}
        />
      );
      break;

    default:
      break;
  }

  return (
    <div className={classes.Input__Group}>
      {inputElement}
      <label
        htmlFor={elementConfig.placeholder}
        className={classes.Input__Group__Label}
      >
        {elementConfig.placeholder}
      </label>
    </div>
  );
};

export default Input;
