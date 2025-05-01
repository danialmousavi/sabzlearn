import React, { useEffect, useReducer } from "react";
import "./Input.css";
import validator from "../../validators/validators";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.value,
        isValid: validator(action.value, action.validations),
      };
    default:
      return state;
  }
};

export default function Input(props) {
  const [mainInput, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
  });

  const { value, isValid } = mainInput;
  const { id } = props;

  useEffect(() => {
    props.onInputHandler(id, value, isValid);
  }, [value]);

  const handleChangeInput = (e) => {
    dispatch({
      type: "CHANGE",
      value: e.target.value,
      isValid: true,
      validations: props.validations,
    });
  };

  const element =
    props.element === "input" ? (
      <input
        className={`${props.className} ${
          isValid ? "success" : "error"
        }`}
        type={props.type}
        placeholder={props.placeholder}
        onChange={handleChangeInput}
        value={value}
      />
    ) : (
      <textarea
        className={`${props.className} ${
          isValid ? "success" : "error"
        }`}
        placeholder={props.placeholder}
        onChange={handleChangeInput}
        value={value}
      />
    );

  return <div>{element}</div>;
}
