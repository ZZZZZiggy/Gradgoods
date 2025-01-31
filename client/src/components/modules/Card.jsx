import React, { useState, useEffect } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import "./Card.css";

// this function receives a product object(the hard coded product or from database) and returns a card component
const ProductCard = ({ product }) => {
  const [showModal, setShowModal] = useState(false);
  const [distance, setDistance] = useState(null);

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  // Fetch user location and calculate distance
  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const response = await fetch("/api/whoami");
        const userData = await response.json();

        if (userData.address?.location?.coordinates && product.location?.coordinates) {
          const [userLat, userLon] = userData.address.location.coordinates;
          const [productLat, productLon] = product.location.coordinates;

          const dist = calculateDistance(userLat, userLon, productLat, productLon);
          setDistance(dist);
        }
      } catch (err) {
        console.error("Error fetching user location:", err);
      }
    };

    fetchUserLocation();
  }, [product]);

  // Add helper function to convert km to miles
  const kmToMiles = (km) => {
    return (km * 0.621371).toFixed(1);
  };

  // Add function to generate Google Maps link
  const getGoogleMapsLink = (location) => {
    if (!location?.coordinates) return null;
    const [lat, lng] = location.coordinates;
    return `https://www.google.com/maps?q=${lat},${lng}`;
  };

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
            <p className="modal-location">
              <strong>Owner:</strong> {product.owner}
            </p>
            <p className="modal-location">
              <strong>Distance:</strong>{" "}
              {distance ? `${kmToMiles(distance)} miles` : "Distance not available"}
            </p>
            {product.location && (
              <p className="modal-location">
                <strong>Location:</strong>{" "}
                <a
                  href={getGoogleMapsLink(product.location)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="maps-link"
                >
                  View on Google Maps <i className="fas fa-map-marker-alt"></i>
                </a>
              </p>
            )}
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
