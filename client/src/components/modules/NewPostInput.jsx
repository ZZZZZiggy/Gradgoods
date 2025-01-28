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
      <button type="button" className="NewPostInput-filter u-pointer" onClick={ShowFilter}>
        <i className="fas fa-bars"></i>
      </button>
      <input
        type="text"
        placeholder={defaultText}
        value={value}
        onChange={handleChange}
        className="NewPostInput-input"
      />
      <button type="button" className="NewPostInput-button u-pointer" onClick={handleSubmit}>
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
};

export default NewPostInput;
