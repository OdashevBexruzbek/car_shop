import React from "react";

function RecipeInput({ type, name, label, labelText }) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700">
        {labelText}
      </label>
      <input
        type={type}
        name={name}
        placeholder={label}
        className="input input-bordered w-full"
        required
      />
    </div>
  );
}

export default RecipeInput;
