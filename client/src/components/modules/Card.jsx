import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";

const ProductCard = ({ product }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={product.image} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>${product.prize}</Card.Text>
          <Button variant="primary" onClick={handleOpen}>
            Reserve
          </Button>
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
