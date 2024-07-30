import React from "react";

function FormInput({ type, name, label, status }) {
  return (
    <div className="w-full">
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">{`Write your ${name}`}</span>
        </div>
        <input
          type={type}
          name={name}
          placeholder={label}
          className={`input input-bordered w-full max-w-xs pl-10 ${status}`}
          required
        />
      </label>
    </div>
  );
}

export default FormInput;
