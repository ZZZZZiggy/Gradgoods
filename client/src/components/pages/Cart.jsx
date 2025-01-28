import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "./Cart.css";

const Cart = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [requestDetails, setRequestDetails] = useState({
    price: "",
    message: "",
  });
  const [sentRequests, setSentRequests] = useState(new Set());
  const tabs = ["pending", "negotiating", "deal"];
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Combined sample data
  const allRequests = [
    {
      id: 1,
      image: "/IMG_E103515C1907-1.jpeg",
      name: "Sample Product 1",
      price: 99.99,
      description: "Product description here",
      sentDate: "2024-01-20",
      acceptStatus: null, // pending
      method: "Pickup",
    },
    {
      id: 4,
      image: "/1.jpg",
      name: "Sample Product 1",
      price: 99.99,
      description: "Product description here",
      sentDate: "2024-01-20",
      acceptStatus: null, // pending
      method: "Pickup",
    },
    {
      id: 5,
      image: "/1.jpg",
      name: "Sample Product 1",
      price: 99.99,
      description: "Product description here",
      sentDate: "2024-01-20",
      acceptStatus: null, // pending
      method: "Pickup",
    },
    {
      id: 2,
      image: "/1.jpg",
      name: "Sample Product 2",
      price: 149.99,
      description: "Product description here",
      sentDate: "2024-01-20",
      replyDate: "2024-01-21",
      acceptStatus: false, // negotiating
      method: "Delivery",
    },
    {
      id: 3,
      image: "/1.jpg",
      name: "Sample Product 3",
      price: 199.99,
      description: "Product description here",
      sentDate: "2024-01-20",
      replyDate: "2024-01-21",
      acceptStatus: true, // deal
      method: "Pickup",
    },
  ];

  const [requests, setRequests] = useState(allRequests);

  const handleRemoveFromCart = (id) => {
    setRequests((prev) => prev.filter((item) => item.id !== id));
  };

  const handleProductClick = (item) => {
    setSelectedProduct(item);
    setShowProductModal(true);
  };

  const handleCloseProductModal = () => {
    setShowProductModal(false);
    setSelectedProduct(null);
  };

  // Filter requests based on status
  const sampleRequests = {
    pending: requests.filter((item) => item.acceptStatus === null),
    negotiating: requests.filter((item) => item.acceptStatus === false),
    deal: requests.filter((item) => item.acceptStatus === true),
  };

  const handleCancel = (id) => {
    console.log("Cancelling deal for item:", id);
  };

  const handleShowRequestModal = (item) => {
    setSelectedItem(item);
    setShowRequestModal(true);
  };

  const handleCloseRequestModal = () => {
    setShowRequestModal(false);
    setRequestDetails({ price: "", message: "" });
  };

  const handleSendRequest = () => {
    // Here you would typically send the request to your backend
    console.log("Sending request for item:", selectedItem.id, requestDetails);
    setSentRequests((prev) => new Set([...prev, selectedItem.id]));
    handleCloseRequestModal();
  };

  const renderCardStatus = (item, tab) => {
    switch (tab) {
      case "pending":
        return sentRequests.has(item.id) ? (
          <>
            <span className="status-text">Request Sent</span>
            <span className="sent-date">{new Date().toLocaleDateString()}</span>
            <button className="delete-button" onClick={() => handleRemoveFromCart(item.id)}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button className="edit-button" onClick={() => handleShowRequestModal(item)}>
              Send Request
            </button>
            <button className="delete-button" onClick={() => handleRemoveFromCart(item.id)}>
              Remove
            </button>
          </>
        );

      case "negotiating":
        return (
          <>
            <span className="status-text">Request Denied</span>
            <span className="sent-date">Replied on: {item.replyDate}</span>
            <div className="button-group">
              <button className="resend-button" onClick={() => handleShowRequestModal(item)}>
                Resend Request
              </button>
              <button className="cancel-button" onClick={() => handleRemoveFromCart(item.id)}>
                Cancel Deal
              </button>
            </div>
          </>
        );

      case "deal":
        return (
          <>
            <span className="status-text">Deal Confirmed</span>
            <span className="sent-date">Confirmed on: {item.replyDate}</span>
            <span className="ready-status">
              Ready for {item.method === "Pickup" ? "Pickup" : "Delivery"}
            </span>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">My Purchase Requests</h1>

      <div className="tabs-container">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="requests-container">
        {sampleRequests[activeTab]?.map((item) => (
          <div key={item.id} className="request-card">
            <div className="card-image" onClick={() => handleProductClick(item)}>
              <img src={item.image} alt={item.name} />
            </div>

            <div className="card-details">
              <h3 className="product-name" onClick={() => handleProductClick(item)}>
                {item.name}
              </h3>
              <p className="product-price">${item.price}</p>
              <p className="product-description">{item.description}</p>
            </div>

            <div className="card-status">{renderCardStatus(item, activeTab)}</div>
          </div>
        ))}
      </div>

      <Modal
        show={showRequestModal}
        onHide={handleCloseRequestModal}
        centered
        className="request-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Send Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Your Offer Price ($)</Form.Label>
              <Form.Control
                type="number"
                value={requestDetails.price}
                onChange={(e) => setRequestDetails({ ...requestDetails, price: e.target.value })}
                min="0"
                step="0.01"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={requestDetails.message}
                onChange={(e) => setRequestDetails({ ...requestDetails, message: e.target.value })}
                placeholder="Enter your message to the seller..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className="modal-cancel-button" onClick={handleCloseRequestModal}>
            Cancel
          </button>
          <button className="modal-submit-button" onClick={handleSendRequest}>
            Send Request
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={showProductModal} onHide={handleCloseProductModal} className="product-modal">
        <Modal.Header closeButton className="modal-header">
          <Modal.Title className="modal-title">{selectedProduct?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <img src={selectedProduct?.image} alt={selectedProduct?.name} className="modal-image" />
          <div className="modal-details">
            <p className="modal-description">
              <strong>Description:</strong> {selectedProduct?.description}
            </p>
            <p className="modal-price">
              <strong>Price:</strong> ${selectedProduct?.price}
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Cart;
