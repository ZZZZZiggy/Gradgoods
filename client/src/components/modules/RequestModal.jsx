import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const RequestModal = ({ show, onHide, requestDetails, setRequestDetails, onSubmit }) => {
  return (
    <Modal show={show} onHide={onHide} centered className="request-modal">
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
        <button className="modal-cancel-button" onClick={onHide}>
          Cancel
        </button>
        <button className="modal-submit-button" onClick={onSubmit}>
          Send Request
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default RequestModal;
