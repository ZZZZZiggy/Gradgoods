import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "./Cart.css";

// ...existing code...

const Cart = () => {
  const { userId } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState("pending");
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [requestDetails, setRequestDetails] = useState({
    price: "",
    message: "",
  });
  const [cartData, setCartData] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const tabs = ["pending", "negotiating", "deal"];

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/cart");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch cart data");
      }

      console.log("Received cart data:", data);
      setCartData(data);
    } catch (err) {
      console.error("Error fetching cart:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update the filtering logic
  const filteredItems = {
    pending: cartData.items.filter(
      (item) => item.status === "pending" && !item.product.status.isAccepted
    ),
    negotiating: cartData.items.filter(
      (item) => item.status === "negotiating" && !item.product.status.isAccepted
    ),
    deal: cartData.items.filter(
      (item) =>
        item.status === "deal" ||
        (item.product.status.isAccepted && item.product.status.acceptedBy === PERSONID)
    ),
  };

  const handleRemoveFromCart = async (id) => {
    try {
      const response = await fetch("/api/cart/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: id }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || "Failed to remove item");
        return;
      }

      await fetchCartData(); // Refresh cart data after successful removal
    } catch (err) {
      console.error("Error removing item:", err);
      alert("Failed to remove item from cart");
    }
  };

  const handleProductClick = (item) => {
    setSelectedProduct(item);
    setShowProductModal(true);
  };

  const handleCloseProductModal = () => {
    setShowProductModal(false);
    setSelectedProduct(null);
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

  const handleSendRequest = async () => {
    try {
      const response = await fetch("/api/cart/make-offer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: selectedItem.productId,
          price: Number(requestDetails.price),
          message: requestDetails.message,
          Accepted: null,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || "Failed to send request");
        return;
      }

      await fetchCartData(); // Refresh cart data after successful offer
      handleCloseRequestModal();
    } catch (err) {
      console.error("Error sending request:", err);
      alert("Failed to send request");
    }
  };

  const isOfferDenied = (item) => {
    const offers = item.product?.status?.offers || [];
    if (item.status === "negotiating" && offers.length === 0) {
      return true;
    }

    if (offers.length > 0) {
      // 移除对 product.status 的引用
      const myOffer = offers.find((offer) => offer.buyerId === userId);
      return myOffer?.isDenied === true; // 添加可选链操作符
    }

    return false;
  };

  const renderCardStatus = (item, tab) => {
    switch (tab) {
      case "pending":
        return (
          <>
            {item.priceChange?.hasChanged && (
              <span className="price-change-alert">
                Price {item.priceChange.difference > 0 ? "increased" : "decreased"} by $
                {Math.abs(item.priceChange.difference)}
              </span>
            )}
            <button className="edit-button" onClick={() => handleShowRequestModal(item)}>
              Send Request
            </button>
            <button className="delete-button" onClick={() => handleRemoveFromCart(item.productId)}>
              Remove
            </button>
          </>
        );

      case "negotiating":
        const offerDenied = isOfferDenied(item);
        return (
          <>
            <span className="status-text">
              {offerDenied ? "Offer Denied - Please Resend" : "Under Negotiation"}
            </span>
            <div className="button-group">
              {offerDenied && (
                <button className="resend-button" onClick={() => handleShowRequestModal(item)}>
                  Resend Offer
                </button>
              )}
              <button
                className="cancel-button"
                onClick={() => handleRemoveFromCart(item.productId)}
              >
                Cancel Deal
              </button>
            </div>
          </>
        );

      case "deal":
        return (
          <>
            <span className="status-text">Deal Confirmed</span>
            <span className="ready-status">Ready for {item.product.method}</span>
          </>
        );

      default:
        return null;
    }
  };

  const totalItems = cartData.items
    ? cartData.items.filter((item) => item.status !== "deal").length
    : 0;

  if (loading) return <div>Loading cart data...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="cart-container">
      <h1 className="cart-title">My Cart ({totalItems} total)</h1>

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
        {filteredItems[activeTab]?.map((item) => (
          <div key={item.productId} className="request-card">
            <div className="card-image" onClick={() => handleProductClick(item)}>
              <img src={item.product.image} alt={item.product.name} />
            </div>

            <div className="card-details">
              <h3 className="product-name" onClick={() => handleProductClick(item)}>
                {item.product.name}
              </h3>
              <p className="product-price">${item.currentPrice}</p>
              <p className="product-description">{item.product.description}</p>
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
