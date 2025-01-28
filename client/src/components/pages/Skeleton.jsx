import React, { useEffect, useState } from "react";
import ProductCard from "../modules/Card";
import SearchProduct from "../modules/SearchProduct";
import FilterCard from "../modules/filter";
import Pagination from "../modules/Pagination";

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
          // Fix: Use filter.place instead of filterConditions.place
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
    // 直接使用newFilters而不是等待状态更新
    matchProduct("", newFilters);
    // 更新状态供后续使用
    setFilterConditions(newFilters);
  };

  useEffect(() => {
    const product1 = {
      id: 1,
      owner: "seller1",
      name: "Product 1",
      prize: 100,
      method: "Delivery",
      dateby: "2024-01-20",
      description: "pick up by April 32",
      image: "/IMG_E103515C1907-1.jpeg",
      diatance: 1,
    };
    const product2 = {
      id: 2,
      owner: "seller2",
      name: "Product 2",
      prize: 200,
      method: "Delivery",
      dateby: "2024-01-20",
      description: "pick up by April 32",
      image: "/1.jpg",
      diatance: 1,
    };
    const product3 = {
      id: 3,
      owner: "seller3",
      name: "Product 3",
      prize: 300,
      method: "Delivery",
      dateby: "2024-01-20",
      description: "pick up by April 32",
      image: "/1.jpg",
      diatance: 1,
    };
    const product4 = {
      id: 4,
      owner: "seller1",
      name: "Product 1",
      prize: 100,
      method: "Delivery",
      dateby: "2024-01-20",
      description: "pick up by April 32",
      image: "/1.jpg",
      diatance: 1,
    };
    const product5 = {
      id: 5,
      owner: "seller2",
      name: "Product 2",
      prize: 200,
      method: "Delivery",
      dateby: "2024-01-20",
      description: "pick up by April 32",
      image: "/1.jpg",
      diatance: 1,
    };
    const product6 = {
      id: 6,
      owner: "seller3",
      name: "Product 3",
      prize: 300,
      method: "Delivery",
      dateby: "2024-01-20",
      description: "pick up by April 32",
      image: "/1.jpg",
      diatance: 1,
    };
    const hardcodedProducts = [product1, product2, product3, product4, product5, product6];

    setProducts(hardcodedProducts);
    setFilteredProducts(hardcodedProducts);
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
