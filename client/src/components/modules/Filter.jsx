import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";

const FilterCard = ({ onApplyFilter }) => {
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [category, setCategory] = useState("all");

  const categories = ["all", "electronics", "books", "furniture", "clothing"];

  const handleApply = () => {
    onApplyFilter({ priceRange, category });
  };

  const handleReset = () => {
    setPriceRange({ min: 0, max: 1000 });
    setCategory("all");
  };

  return (
    <Card className="filter-card">
      <Card.Body>
        <Card.Title>Filter Products</Card.Title>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Price Range</Form.Label>
            <div className="d-flex gap-2">
              <Form.Control
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
              />
              <Form.Control
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </Form.Select>
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
