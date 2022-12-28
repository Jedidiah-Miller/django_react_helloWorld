import React from 'react';


export default function TextInput(props) {
  const {name, label, required, onChange, value, errors} = props;
  const inputId = name + '-input';
  return (
    <div className="input-group has-validation">
      <span className="input-group-text">*</span>
      <div className={"form-floating" + (errors ? " is-invalid" : "")}>
        <input
          id={inputId}
          className={"form-control" + (errors ? " is-invalid" : "")}
          type="text"
          required={required}
          placeholder={label}
          name={name}
          onChange={onChange}
          value={value}
        />
        <label htmlFor={inputId}>{label}</label>
      </div>
      <div className="invalid-feedback">
        {errors}
      </div>
    </div>
  )
}
