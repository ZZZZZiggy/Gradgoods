import React from "react";
import NewPostInput from "./NewPostInput";

const SearchProduct = ({ product }) => {
  const filterProduct = (value) => {
    product(value);
  };

  return <NewPostInput onSubmit={filterProduct} defaultText="Search Product" />;
};

export default SearchProduct;
