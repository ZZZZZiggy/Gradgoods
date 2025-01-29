import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const EditItemModal = ({
  show,
  onHide,
  editItem,
  setEditItem,
  handleEditImageUpload,
  onSubmit,
}) => {
  return (
    <Modal show={show} onHide={onHide} centered className="product-modal">
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
        <button className="modal-cancel-button" onClick={onHide}>
          Cancel
        </button>
        <button
          className="modal-submit-button"
          onClick={onSubmit}
          disabled={!editItem?.name || !editItem?.price || !editItem?.description}
        >
          Save Changes
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditItemModal;
