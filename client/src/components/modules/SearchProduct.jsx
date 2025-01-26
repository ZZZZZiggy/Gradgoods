import React from "react";
import NewPostInput from "./NewPostInput";

// receives a function to filter the products
const SearchProduct = ({ onFilterChange, product }) => {
  const filterProduct = (value) => {
    product(value);
  };

  // renders the NewPostInput component with a default text and the filterProduct function
  return (
    <NewPostInput
      onSubmit={filterProduct}
      defaultText="Search Product"
      onFilterChange={onFilterChange}
    />
  );
};

export default SearchProduct;
