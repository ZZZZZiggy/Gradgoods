import React, { useEffect, useState } from "react";
import ProductCard from "../modules/Card";
import SearchProduct from "../modules/SearchProduct";
import FilterCard from "../modules/filter";
import Pagination from "../modules/Pagination";

// import RangeSlider from "react-range-slider-input";
// import "react-range-slider-input/dist/style.css";

import "./Skeleton.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterStatus, setFilterStatus] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [noMatchMessage, setNoMatchMessage] = useState(false);
  const productsPerPage = 80;

  const handleFilterChange = () => {
    setFilterStatus((prev) => !prev);
  };

  const matchProduct = (value) => {
    if (value.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      if (filtered.length === 0) {
        setNoMatchMessage(true);
        setFilteredProducts([]);

        // Reset after 3 seconds
        setTimeout(() => {
          setNoMatchMessage(false);
          setFilteredProducts(products);
        }, 3000);
      } else {
        setFilteredProducts(filtered);
      }
    }
  };

  useEffect(() => {
    const product1 = {
      id: 1,
      owner: "seller1",
      name: "Product 1",
      prize: 100,
      description: "pick up by April 32",
      image: "/IMG_E103515C1907-1.jpeg",
    };
    const product2 = {
      id: 2,
      owner: "seller2",
      name: "Product 2",
      prize: 200,
      description: "pick up by April 32",
      image: "/1.jpg",
    };
    const product3 = {
      id: 3,
      owner: "seller3",
      name: "Product 3",
      prize: 300,
      description: "pick up by April 32",
      image: "/1.jpg",
    };
    const product4 = {
      id: 4,
      owner: "seller1",
      name: "Product 1",
      prize: 100,
      description: "pick up by April 32",
      image: "/1.jpg",
    };
    const product5 = {
      id: 5,
      owner: "seller2",
      name: "Product 2",
      prize: 200,
      description: "pick up by April 32",
      image: "/1.jpg",
    };
    const product6 = {
      id: 6,
      owner: "seller3",
      name: "Product 3",
      prize: 300,
      description: "pick up by April 32",
      image: "/1.jpg",
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
            <FilterCard />
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
