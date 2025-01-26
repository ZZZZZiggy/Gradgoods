import React, { useEffect, useState } from "react";
import ProductCard from "../modules/Card";
import SearchProduct from "../modules/SearchProduct";
import FilterCard from "../modules/Filter";
import "./Skeleton.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterStatus, setFilterStatus] = useState(false);

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
      setFilteredProducts(filtered);
    }
  };

  useEffect(() => {
    const product1 = {
      id: 1,
      owner: "seller1",
      name: "Product 1",
      prize: 100,
      description: "pick up by April 32",
      image: "/1.jpg",
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
      id: 1,
      owner: "seller1",
      name: "Product 1",
      prize: 100,
      description: "pick up by April 32",
      image: "/1.jpg",
    };
    const product5 = {
      id: 2,
      owner: "seller2",
      name: "Product 2",
      prize: 200,
      description: "pick up by April 32",
      image: "/1.jpg",
    };
    const product6 = {
      id: 3,
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

  return (
    <div>
      <div>
        <SearchProduct product={matchProduct} onFilterChange={handleFilterChange} />
      </div>
      <div className="container">
        {filterStatus ? (
          <div className="items_filter_opened">
            {/* <FilterCard /> */}
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} width="14.9rem" />
            ))}
          </div>
        ) : (
          <div className="items_filter_closed">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} width="14.9rem" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
