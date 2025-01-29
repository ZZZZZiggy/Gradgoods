import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "./Cart.css";
import { post } from "../../utilities";

const Sell = () => {
  const [activeTab, setActiveTab] = useState("available");
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [requestDetails, setRequestDetails] = useState({
    price: "",
    message: "",
  });
  const [sentRequests, setSentRequests] = useState(new Set());
  const tabs = ["available", "negotiating", "deal"];

  const [requests, setRequests] = useState([
    {
      id: 1,
      image: "/1.jpg",
      name: "Sample Product 1",
      price: 99.99,
      description: "Product description here",
      listDate: new Date().toLocaleDateString(),
      status: "available", // new status for available items
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
      status: "available",
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
      status: "available",
    },
  ]);

  const [showNewItemModal, setShowNewItemModal] = useState(false);
  const [newItem, setNewItem] = useState({
    image: null,
    imagePreview: null,
    name: "",
    price: "",
    description: "",
    method: "Pickup", // default method
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewItem({
        ...newItem,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleNewItemSubmit = async () => {
    const currentDate = new Date().toISOString().split("T")[0];
    const newItemWithDefaults = {
      _id: Date.now(), // 临时ID
      ownerId: 1, // TODO: 应该从用户信息中获取
      owner: "seller1", // TODO: 应该从用户信息中获取
      name: newItem.name,
      prize: parseFloat(newItem.price),
      method: newItem.method,
      dateby: currentDate,
      description: newItem.description,
      image: newItem.imagePreview,
      status: {
        isAccepted: false,
        acceptedBy: null,
        acceptedAt: null,
      },
      createdAt: currentDate,
      updatedAt: currentDate,
      diatance: 1, // TODO: 应该根据用户地址计算
    };

    try {
      // 发送到服务器
      const savedProduct = await post("/api/products", newItemWithDefaults);
      setRequests((prev) => [...prev, savedProduct]);
      setShowNewItemModal(false);
      // 重置表单
      setNewItem({
        image: null,
        imagePreview: null,
        name: "",
        price: "",
        description: "",
        method: "Pickup",
      });
    } catch (err) {
      console.error("Failed to create product:", err);
      // TODO: 显示错误消息给用户
    }
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
    console.log("Sending request for item:", selectedItem.id, requestDetails);
    setSentRequests((prev) => new Set([...prev, selectedItem.id]));
    handleCloseRequestModal();
  };

  const handleAccept = (itemId) => {
    setRequests((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            acceptStatus: true,
            replyDate: new Date().toLocaleDateString(),
          };
        }
        return item;
      })
    );
  };

  const handleDeny = (itemId) => {
    setRequests((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            acceptStatus: false,
            replyDate: new Date().toLocaleDateString(),
          };
        }
        return item;
      })
    );
  };

  const handleEdit = (itemId) => {
    const item = requests.find((item) => item.id === itemId);
    setEditItem({
      ...item,
      imagePreview: item.image,
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = () => {
    setRequests((prev) =>
      prev.map((item) => {
        if (item.id === editItem.id) {
          return {
            ...editItem,
            image: editItem.imagePreview,
          };
        }
        return item;
      })
    );

    // 清理工作
    if (editItem.imagePreview && editItem.imagePreview !== editItem.image) {
      URL.revokeObjectURL(editItem.imagePreview);
    }
    setShowEditModal(false);
    setEditItem(null);
  };

  const handleEditImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 释放旧的预览URL
      if (editItem.imagePreview && editItem.imagePreview !== editItem.image) {
        URL.revokeObjectURL(editItem.imagePreview);
      }
      setEditItem({
        ...editItem,
        image: file, // 保存文件对象
        imagePreview: URL.createObjectURL(file), // 创建新的预览URL
      });
    }
  };

  const handleDelete = (itemId) => {
    setRequests((prev) => prev.filter((item) => item.id !== itemId));
  };

  const filteredRequests = {
    available: requests.filter((item) => item.status === "available"),
    negotiating: requests.filter((item) => item.acceptStatus === false),
    deal: requests.filter((item) => item.acceptStatus === true),
  };

  const renderCardStatus = (item, tab) => {
    switch (tab) {
      case "available":
        return (
          <>
            <span className="status-text">Listed on: {item.listDate}</span>
            <div className="button-group">
              <button className="edit-button" onClick={() => handleEdit(item.id)}>
                Edit Listing
              </button>
              <button className="delete-button" onClick={() => handleDelete(item.id)}>
                Delete Listing
              </button>
            </div>
          </>
        );

      case "negotiating":
        return (
          <div className="button-group">
            <button className="edit-button" onClick={() => handleAccept(item.id)}>
              Accept
            </button>
            <button className="delete-button" onClick={() => handleDeny(item.id)}>
              Deny
            </button>
          </div>
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
      <div className="header-container">
        <h1 className="cart-title">My Items</h1>
        <button className="add-item-button" onClick={() => setShowNewItemModal(true)}>
          <i className="fas fa-plus"></i>
        </button>
      </div>

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
        {filteredRequests[activeTab]?.map((item) => (
          <div key={item.id} className="request-card">
            <div className="card-image">
              <img src={item.image} alt={item.name} />
            </div>

            <div className="card-details">
              <h3 className="product-name">{item.name}</h3>
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

      <Modal
        show={showNewItemModal}
        onHide={() => setShowNewItemModal(false)}
        centered
        className="product-modal"
      >
        <Modal.Header closeButton className="modal-header">
          <Modal.Title className="modal-title">Add New Item</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <div className="image-upload-container">
            {newItem.imagePreview ? (
              <img src={newItem.imagePreview} alt="Preview" className="modal-image" />
            ) : (
              <label className="image-upload-label">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
                <i className="fas fa-cloud-upload-alt"></i>
                <span>Click to upload image</span>
              </label>
            )}
          </div>
          <div className="modal-details">
            <Form.Group className="mb-3">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                type="text"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price ($)</Form.Label>
              <Form.Control
                type="number"
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                min="0"
                step="0.01"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Method</Form.Label>
              <Form.Select
                value={newItem.method}
                onChange={(e) => setNewItem({ ...newItem, method: e.target.value })}
              >
                <option value="Pickup">Pickup</option>
                <option value="Delivery">Delivery</option>
              </Form.Select>
            </Form.Group>
          </div>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <button
            className="modal-button primary"
            onClick={handleNewItemSubmit}
            disabled={!newItem.image || !newItem.name || !newItem.price || !newItem.description}
          >
            Finish
          </button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
        className="product-modal"
      >
        <Modal.Header closeButton className="modal-header">
          <Modal.Title className="modal-title">Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <div className="image-upload-container" style={{ cursor: "pointer" }}>
            <label className="image-upload-label" style={{ width: "100%", height: "100%" }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleEditImageUpload}
                style={{ display: "none" }}
              />
              {editItem?.imagePreview ? (
                <img src={editItem.imagePreview} alt="Preview" className="modal-image" />
              ) : (
                <>
                  <i className="fas fa-cloud-upload-alt"></i>
                  <span>Click to upload image</span>
                </>
              )}
            </label>
          </div>
          <div className="modal-details">
            <Form.Group className="mb-3">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                type="text"
                value={editItem?.name || ""}
                onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price ($)</Form.Label>
              <Form.Control
                type="number"
                value={editItem?.price || ""}
                onChange={(e) => setEditItem({ ...editItem, price: e.target.value })}
                min="0"
                step="0.01"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editItem?.description || ""}
                onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Method</Form.Label>
              <Form.Select
                value={editItem?.method || "Pickup"}
                onChange={(e) => setEditItem({ ...editItem, method: e.target.value })}
              >
                <option value="Pickup">Pickup</option>
                <option value="Delivery">Delivery</option>
              </Form.Select>
            </Form.Group>
          </div>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <button className="modal-cancel-button" onClick={() => setShowEditModal(false)}>
            Cancel
          </button>
          <button
            className="modal-submit-button"
            onClick={handleEditSubmit}
            disabled={!editItem?.name || !editItem?.price || !editItem?.description}
          >
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Sell;
