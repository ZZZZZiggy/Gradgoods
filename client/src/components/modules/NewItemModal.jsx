import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const NewItemModal = ({ show, onHide, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    method: "Pickup",
    image: null,
    imagePreview: null,
  });
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Fetch user's address when modal opens
    if (show) {
      fetchUserAddress();
    }
  }, [show]);

  const fetchUserAddress = async () => {
    try {
      const response = await fetch("/api/address");
      const address = await response.json();
      if (address.location) {
        setUserLocation(address.location.coordinates);
      }
    } catch (err) {
      console.error("Error fetching address:", err);
    }
  };

  const compressImage = async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 600;
          const MAX_HEIGHT = 600;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height = Math.round((height * MAX_WIDTH) / width);
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = Math.round((width * MAX_HEIGHT) / height);
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          let quality = 0.7;
          let dataUrl;
          do {
            dataUrl = canvas.toDataURL("image/jpeg", quality);
            quality -= 0.1;
          } while (dataUrl.length > 800000 && quality > 0.1);

          resolve(dataUrl);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleLocalImageUpload = async (e) => {
    const file = e.target.files[0];
    const maxSize = 5 * 1024 * 1024;

    if (!file) return;

    if (file.size > maxSize) {
      alert("Please select an image under 5MB");
      return;
    }

    try {
      const compressedImage = await compressImage(file);

      if (compressedImage.length > 1024 * 1024) {
        alert("Image is too large even after compression. Please try a smaller image.");
        return;
      }

      setFormData({
        ...formData,
        image: compressedImage,
        imagePreview: URL.createObjectURL(file),
      });
    } catch (err) {
      console.error("Error processing image:", err);
      alert("Error uploading image. Please try a smaller image or different format.");
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.price || !formData.description || !formData.image) {
      alert("Please fill in all required fields and upload an image");
      return;
    }

    await onSubmit(formData);

    // Reset form
    setFormData({
      name: "",
      price: "",
      description: "",
      method: "Pickup",
      image: null,
      imagePreview: null,
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered className="product-modal">
      <Modal.Header closeButton className="modal-header">
        <Modal.Title className="modal-title">Add New Item</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <div className="image-upload-container">
          {formData.imagePreview ? (
            <img src={formData.imagePreview} alt="Preview" className="modal-image" />
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
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price ($)</Form.Label>
            <Form.Control
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              min="0"
              step="0.01"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Method</Form.Label>
            <Form.Select
              value={formData.method}
              onChange={(e) => setFormData({ ...formData, method: e.target.value })}
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
          onClick={handleSubmit}
          disabled={
            isSubmitting ||
            !formData.image ||
            !formData.name ||
            !formData.price ||
            !formData.description
          }
        >
          {isSubmitting ? "Creating..." : "Finish"}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewItemModal;
