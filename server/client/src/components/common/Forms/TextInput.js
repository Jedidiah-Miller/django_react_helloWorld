import React from 'react';


export default function TextInput(props) {
  const {name, label, required, onChange, value, errors} = props;
  return (
    <div className="input-group has-validation">
      <span className="input-group-text"></span>
      <div className={"form-floating" + (errors ? " is-invalid" : "")}>
        <input
          id="floatingInputGroup2"
          className={"form-control" + (errors ? " is-invalid" : "")}
          type="text"
          required={required}
          placeholder={label}
          name={name}
          onChange={onChange}
          value={value}
        />
        <label htmlFor="floatingInputGroup2">{label}</label>
      </div>
      <div className="invalid-feedback">
        {errors}
      </div>
    </div>
  )
}
