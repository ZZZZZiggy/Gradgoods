import React, { useState } from "react";
import { Form } from "react-bootstrap";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import "./filter.css";

const FilterCard = ({ onFilterUpdate }) => {
  const [priceRange, setPriceRange] = useState({ min: 0, max: 201 });
  const [method, setMethod] = useState("all");
  const [place, setPlace] = useState({ min: 0, max: 5 });

  const today = new Date();
  const oneYearLater = new Date();
  oneYearLater.setFullYear(today.getFullYear() + 1);

  const [dateRange, setDateRange] = useState({
    min: today.toISOString().split("T")[0],
    max: oneYearLater.toISOString().split("T")[0],
  });

  const categories = ["Pickup", "Delivery"];

  const handleApply = () => {
    onFilterUpdate({ priceRange, method, place, dateRange });
  };

  const handleReset = () => {
    setPriceRange({ min: 0, max: 201 });
    setPlace({ min: 0, max: 5 });
    setDateRange({
      min: today.toISOString().split("T")[0],
      max: oneYearLater.toISOString().split("T")[0],
    });
    setMethod("all");
  };
  return (
    <div className="filter-wrapper">
      <div className="filter-content">
        <h2 className="filter-title" style={{ marginBottom: "var(--l)" }}>
          Filtered By
        </h2>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="filter-subtitle">Price Range:</Form.Label>
            <div className="range-container">
              <div className="price-labels-container">
                {priceRange.min === priceRange.max ? (
                  <span
                    className="price-label single-value"
                    style={{
                      left: `${(priceRange.min / 201) * 100}%`,
                      transform: "translateX(-50%)",
                    }}
                  >
                    ${priceRange.min === 201 && priceRange.max === 201 ? "200+" : priceRange.min}
                  </span>
                ) : (
                  <>
                    <span
                      className="price-label"
                      style={{
                        left: `${(priceRange.min / 201) * 100}%`,
                        transform: "translateX(-50%)",
                      }}
                    >
                      ${priceRange.min}
                    </span>
                    <span
                      className="price-label"
                      style={{
                        left: `${(priceRange.max / 201) * 100}%`,
                        transform: "translateX(-50%)",
                      }}
                    >
                      ${priceRange.max === 201 ? "200+" : priceRange.max}
                    </span>
                  </>
                )}
              </div>
              <div className="range-control-container">
                <div className="range-input-container">
                  <RangeSlider
                    className="range-slider"
                    value={[priceRange.min, priceRange.max]}
                    onInput={(values) => setPriceRange({ min: values[0], max: values[1] })}
                    min={0}
                    max={201}
                  />
                </div>
              </div>
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="filter-subtitle">Date:</Form.Label>
            <div className="date-container">
              <Form.Control
                type="date"
                value={dateRange.max}
                min={dateRange.min}
                max={oneYearLater.toISOString().split("T")[0]}
                onChange={(e) => setDateRange({ ...dateRange, max: e.target.value })}
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="filter-subtitle">Method</Form.Label>
            <div className="method-container">
              {categories.map((cat) => (
                <div className="custom-checkbox-container" key={cat}>
                  <input
                    type="radio"
                    id={`category-${cat}`}
                    name="category"
                    className="custom-checkbox"
                    checked={method === cat}
                    onChange={() => setMethod(cat)}
                  />
                  <label htmlFor={`category-${cat}`}>{cat}</label>
                </div>
              ))}
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="filter-subtitle">Distance in: {place.max} miles</Form.Label>
            <div className="range-container">
              <div className="range-control-container">
                <div className="range-start-point"></div>
                <div className="range-input-container">
                  <RangeSlider
                    className="range-slider single-thumb"
                    value={[0, place.max]}
                    onInput={(values) => setPlace({ min: 0, max: values[1] })}
                    min={0}
                    max={5}
                    step={0.5}
                    rangeSlideDisabled={true}
                  />
                </div>
              </div>
            </div>
          </Form.Group>
        </Form>
        <div className="button-container-fixed">
          <button type="button" className="custom-button apply-button" onClick={handleApply}>
            Apply
          </button>
          <button type="button" className="custom-button reset-button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterCard;
