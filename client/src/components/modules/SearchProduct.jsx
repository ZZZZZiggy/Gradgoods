import React from "react";
import NewPostInput from "./NewPostInput";

// receives a function to filter the products, value comes from NewPostInput,
// which calls the function handleSubmit, is the value of the input
const SearchProduct = ({ onFilterChange, product }) => {
  const filterProduct = (value, filter_condition) => {
    // calls the function product, which is passed as a prop from the parent component
    // == ==> product(value) === matchProduct(value)
    product(value, filter_condition);
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
