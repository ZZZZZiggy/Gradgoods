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
    console.log("Filter conditions:", filter); // Add debug logging

    // Text search
    if (value.trim() !== "") {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
    }

    // Apply filter conditions
    if (filter) {
      // Method filter
      if (filter.method && filter.method !== "all") {
        console.log("Filtering by method:", filter.method);
        filtered = filtered.filter((product) => product.method === filter.method);
      }

      // Price range filter
      if (filter.priceRange && typeof filter.priceRange.min === "number") {
        console.log("Filtering by price:", filter.priceRange);
        filtered = filtered.filter((product) => {
          if (filter.priceRange.max === 201) {
            return product.price >= filter.priceRange.min;
          }
          return product.price >= filter.priceRange.min && product.price <= filter.priceRange.max;
        });
      }

      // Place (distance) filter
      if (filter.place && typeof filter.place.min === "number") {
        console.log("Filtering by distance:", filter.place);
        filtered = filtered.filter((product) => {
          if (filter.place.max === 5) {
            return product.distance >= filter.place.min;
          }
          return product.distance >= filter.place.min && product.distance <= filter.place.max;
        });
      }

      // Date range filter (if needed)
      if (filter.dateRange) {
        console.log("Filtering by date:", filter.dateRange);
        // Add date filtering logic here if needed
      }
    }

    console.log("Filtered results:", filtered.length);

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

  // Add calculate distance function
  const calculateDistance = (coords1, coords2) => {
    if (!coords1 || !coords2) return 0;
    const [lat1, lon1] = coords1;
    const [lat2, lon2] = coords2;
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (Math.round(R * c * 10) / 10) * 0.621371;
  };

  // Modify useEffect to fetch user location and calculate distances
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await get("/api/whoami");
        const userLocation = userData?.address?.location?.coordinates;
        console.log("User location:", userLocation);

        const productObjs = await get("/api/allproducts");

        const productsWithDistance = productObjs.map((product) => ({
          ...product,
          distance: userLocation
            ? calculateDistance(userLocation, product.location.coordinates)
            : null,
        }));
        console.log("Products with distance:", productsWithDistance);

        const availableProducts = productsWithDistance.filter(
          (product) => !product.status?.isAccepted
        );

        setProducts(availableProducts);
        console.log("Available products:", availableProducts);
        setFilteredProducts(availableProducts);
        console.log("Filtered products:", availableProducts);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
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
