import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import "./Card.css";

const ProductCard = ({ product, width = "14.9rem" }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <Card style={{ width }} className="card">
        <Card.Img variant="top" src={product.image} className="image" />
        <Card.Body className="body">
          <div className="header">
            <Card.Title className="cardh2">{product.name}</Card.Title>
            <Card.Text className="content">{product.description}</Card.Text>
          </div>
          <div className="footer">
            <Card.Title className="prize">${product.prize}</Card.Title>
            <Button className="button" variant="primary" onClick={handleOpen}>
              Reserve
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>{product.name}</h5>
          <p>
            <strong>Description:</strong> {product.description}
          </p>
          <p>
            <strong>Price:</strong> ${product.prize}
          </p>
          <p>
            <strong>Owner:</strong> {product.owner}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Confirm Reservation
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductCard;
