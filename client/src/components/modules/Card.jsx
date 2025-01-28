import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import "./Card.css";

// this function receives a product object(the hard coded product or from database) and returns a card component
const ProductCard = ({ product }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleAddToCart = () => {
    // Future cart functionality
    console.log("Added to cart:", product);
  };
  const handleOrder = () => {
    // Future order functionality
    console.log("Ordered:", product);
  };

  return (
    <>
      <Card className="card">
        <Card.Img variant="top" src={product.image} className="image" />
        <Card.Body className="body">
          <div className="header">
            <Card.Title className="cardh2">{product.name}</Card.Title>
            <Card.Text className="content">{product.description}</Card.Text>
          </div>
          <div className="footer">
            <Card.Title className="prize">${product.prize}</Card.Title>
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
              <strong>Price:</strong> ${product.prize}
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
