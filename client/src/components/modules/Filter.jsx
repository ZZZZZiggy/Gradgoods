import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";

const FilterCard = ({ onApplyFilter }) => {
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [category, setCategory] = useState("all");
  const [place, setPlace] = useState({ min: 0, max: 5 });
  const [dateRange, setDateRange] = useState({
    min: new Date().toISOString().split("T")[0],
    max: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  });

  const categories = ["Pickup", "Home Delivery"];

  const handleApply = () => {
    onApplyFilter({ priceRange, category, place, dateRange });
  };

  const handleReset = () => {
    setPriceRange({ min: 0, max: 1000 });
    setCategory("all");
  };
  const handlePlace = () => {
    setPlace({ min: 0, max: 5 });
  };
  return (
    <Card className="filter-card">
      <Card.Body>
        <Card.Title>Filter Products</Card.Title>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>
              Price Range: ${priceRange.min} - ${priceRange.max}
            </Form.Label>
            <div className="d-flex flex-column gap-2">
              <Form.Range
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) })}
                min={0}
                max={1000}
              />
              <Form.Range
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                min={0}
                max={1000}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <div>
              {categories.map((cat) => (
                <Form.Check
                  key={cat}
                  type="radio"
                  id={`category-${cat}`}
                  label={cat}
                  checked={category === cat}
                  onChange={() => setCategory(cat)}
                />
              ))}
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              Direction Range: {place.min} - {place.max} miles
            </Form.Label>
            <div className="d-flex flex-column gap-2">
              <Form.Range
                value={place.min}
                onChange={(e) => setPlace({ ...place, min: parseInt(e.target.value) })}
                min={0}
                max={5}
              />
              <Form.Range
                value={place.max}
                onChange={(e) => setPlace({ ...place, max: parseInt(e.target.value) })}
                min={0}
                max={5}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date Range</Form.Label>
            <div className="d-flex gap-2">
              <Form.Control
                type="date"
                value={dateRange.min}
                onChange={(e) => setDateRange({ ...dateRange, min: e.target.value })}
              />
              <Form.Control
                type="date"
                value={dateRange.max}
                onChange={(e) => setDateRange({ ...dateRange, max: e.target.value })}
              />
            </div>
          </Form.Group>
          <div className="d-flex gap-2">
            <Button variant="primary" onClick={handleApply}>
              Apply
            </Button>
            <Button variant="secondary" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default FilterCard;
