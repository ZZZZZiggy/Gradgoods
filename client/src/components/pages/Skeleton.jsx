import React, { useEffect, useState } from "react";
import ProductCard from "../modules/Card";
import SearchProduct from "../modules/SearchProduct";
import FilterCard from "../modules/filter";
import Pagination from "../modules/Pagination";
import { get } from "../../utilities";

import "./Skeleton.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterStatus, setFilterStatus] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [noMatchMessage, setNoMatchMessage] = useState(false);
  const productsPerPage = 80;
  const [filterConditions, setFilterConditions] = useState({
    priceRange: { min: 0, max: 201 },
    method: "all",
    place: { min: 0, max: 5 },
    dateRange: null,
  });

  const handleFilterChange = () => {
    setFilterStatus((prev) => !prev);
  };

  const matchProduct = (value, filter) => {
    let filtered = [...products];

    // Text search
    if (value.trim() !== "") {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
    }

    // Apply filter conditions
    if (filter) {
      if (filter.method && filter.method !== "all") {
        filtered = filtered.filter((product) => product.method === filter.method);
      }
      if (filter.priceRange) {
        filtered = filtered.filter((product) => {
          if (filter.priceRange.max === 201) {
            return product.prize >= filter.priceRange.min;
          }
          return product.prize >= filter.priceRange.min && product.prize <= filter.priceRange.max;
        });
      }
      if (filter.place) {
        filtered = filtered.filter((product) => {
          if (filter.place.max === 5) {
            return product.diatance >= filter.place.min;
          }
          return product.diatance >= filter.place.min && product.diatance <= filter.place.max;
        });
      }
    }

    if (filtered.length === 0) {
      setNoMatchMessage(true);
      setFilteredProducts([]);
      setTimeout(() => {
        setNoMatchMessage(false);
        setFilteredProducts(products);
      }, 3000);
    } else {
      setFilteredProducts(filtered);
    }
  };

  const handleFilterUpdate = (newFilters) => {
    matchProduct("", newFilters);
    setFilterConditions(newFilters);
  };

  // fetch all products
  useEffect(() => {
    get("/api/products").then((productObjs) => {
      // filter out accepted products
      const availableProducts = productObjs.filter((product) => !product.status.isAccepted);
      setProducts(availableProducts);
      setFilteredProducts(availableProducts);
    });
  }, []);

  // product pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="page-wrapper">
      <div>
        <SearchProduct product={matchProduct} onFilterChange={handleFilterChange} />
      </div>
      {noMatchMessage && (
        <div className="no-match-message">
          No matching products found. Returning to all products...
        </div>
      )}
      <div className="product_container">
        {filterStatus && (
          <div className="filter_container">
            <FilterCard onFilterUpdate={handleFilterUpdate} />
          </div>
        )}
        <div className={`items_filter_${filterStatus ? "opened" : "closed"}`}>
          <div className="card_array">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} width="14rem" />
            ))}
          </div>
        </div>
      </div>
      <div className="pagination-fixed-container">
        <Pagination
          productsPerPage={productsPerPage}
          totalProducts={filteredProducts.length}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default App;
