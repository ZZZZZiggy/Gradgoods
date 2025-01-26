import React, { useEffect, useState } from "react";
import ProductCard from "../modules/Card";
import SearchProduct from "../modules/SearchProduct";

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
      image: "../favicon.png",
    };
    const product3 = {
      id: 3,
      owner: "seller3",
      name: "Product 3",
      prize: 300,
      description: "pick up by April 32",
      image: "../favicon.png",
    };
    const hardcodedProducts = [product1, product2, product3];

    setProducts(hardcodedProducts);
    setFilteredProducts(hardcodedProducts);
  }, []);

  return (
    <div>
      <div>{filterStatus ? <div>Filter Opened</div> : <div>Filter Closed</div>}</div>
      <div>
        <SearchProduct product={matchProduct} onFilterChange={handleFilterChange} />
      </div>
      <div className="d-flex flex-wrap gap-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default App;
