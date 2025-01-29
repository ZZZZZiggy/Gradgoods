import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const NewItemModal = ({ show, onHide, newItem, setNewItem, onSubmit }) => {
  const handleLocalImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // Create FileReader instance
        const reader = new FileReader();

        // Set up FileReader onload handler
        reader.onload = () => {
          const base64String = reader.result;
          // Update state with both base64 and preview
          setNewItem({
            ...newItem,
            image: base64String,
            imagePreview: URL.createObjectURL(file),
          });
        };

        // Set up error handler
        reader.onerror = (error) => {
          console.error("Error reading file:", error);
          alert("Error uploading image. Please try again.");
        };

        // Read the file as Data URL (base64)
        reader.readAsDataURL(file);
      } catch (err) {
        console.error("Error converting image:", err);
        alert("Error uploading image. Please try again.");
      }
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered className="product-modal">
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
                onChange={handleLocalImageUpload}
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
          {/* <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              value={
                userAddress
                  ? `${userAddress.street}, ${userAddress.city}, ${userAddress.zip}`
                  : "Loading address..."
              }
              disabled
            />
          </Form.Group> */}
        </div>
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <button
          className="modal-button primary"
          onClick={onSubmit}
          disabled={!newItem.image || !newItem.name || !newItem.price || !newItem.description}
        >
          Finish
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewItemModal;
