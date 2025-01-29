import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import "./Card.css";

// this function receives a product object(the hard coded product or from database) and returns a card component
const ProductCard = ({ product }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleAddToCart = async () => {
    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: product._id }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || "Failed to add to cart");
        return;
      }

      alert("Successfully added to cart!");
      handleClose();
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add to cart");
    }
  };

  const handleOrder = async () => {
    try {
      const response = await fetch("/api/cart/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product._id,
          price: product.price,
          message: "I want to buy this product",
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || "Failed to process order");
        return;
      }

      alert("Order processed successfully!");
      handleClose();
    } catch (err) {
      console.error("Error processing order:", err);
      alert("Failed to process order");
    }
  };

  return (
    <>
      <Card className="card">
        <Card.Img variant="top" src={product.image} className="image" />
        <Card.Body className="body">
          <div className="header">
            <Card.Title className="cardh2">{product.name}</Card.Title>
            <Card.Text className="content">
              {product.method} by {product.dateby}
            </Card.Text>
          </div>
          <div className="footer">
            <Card.Title className="prize">${product.price}</Card.Title>
            <Button className="button" variant="primary" onClick={handleOpen}>
              Interseted
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleClose} className="product-modal">
        <Modal.Header closeButton className="modal-header">
          <Modal.Title className="modal-title">{product.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <img src={product.image} alt={product.name} className="modal-image" />
          <div className="modal-details">
            <p className="modal-description">
              <strong>Description:</strong> {product.description}
            </p>
            <p className="modal-price">
              <strong>Price:</strong> ${product.price}
            </p>
            <p className="modal-owner">
              <strong>Owner:</strong> {product.owner}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <button className="modal-button secondary" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button className="modal-button primary" onClick={handleOrder}>
            Order
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductCard;
