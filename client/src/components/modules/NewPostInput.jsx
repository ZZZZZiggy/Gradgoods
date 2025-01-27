import React, { useState } from "react";
import "./NewPostInput.css";

const NewPostInput = ({ onSubmit, defaultText, onFilterChange }) => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit && onSubmit(value);
    setValue("");
  };
  const ShowFilter = () => {
    onFilterChange();
  };

  return (
    <div className="SearchBar">
      <button type="submit" className="NewPostInput-filter u-pointer" onClick={ShowFilter}>
        Filter
      </button>
      <input
        type="text"
        placeholder={defaultText}
        value={value}
        onChange={handleChange}
        className="NewPostInput-input"
      />
      <button type="submit" className="NewPostInput-button u-pointer" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default NewPostInput;
