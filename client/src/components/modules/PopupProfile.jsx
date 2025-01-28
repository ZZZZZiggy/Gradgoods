import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "./PopupProfile.css";

const PopupProfile = ({ isHovered }) => {
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationStep, setVerificationStep] = useState(1); // 1 for email, 2 for code
  const [verificationDetails, setVerificationDetails] = useState({
    email: "",
    code: "",
  });
  const [emailError, setEmailError] = useState("");
  const [codeError, setCodeError] = useState("");

  const validateEmail = (email) => {
    const eduEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.edu$/;
    return eduEmailRegex.test(email);
  };

  const handleVerificationClick = (e) => {
    e.preventDefault();
    setShowVerificationModal(true);
  };

  const handleCloseModal = () => {
    setShowVerificationModal(false);
    setVerificationStep(1);
    setVerificationDetails({ email: "", code: "" });
    setEmailError("");
    setCodeError("");
  };

  const handleVerifyEmail = () => {
    if (!validateEmail(verificationDetails.email)) {
      setEmailError("Please enter a valid .edu email address");
      return;
    }
    setEmailError("");
    // TODO: Send verification code to email
    console.log("Sending code to:", verificationDetails.email);
    setVerificationStep(2);
  };

  const handleVerifyCode = () => {
    if (!/^\d{6}$/.test(verificationDetails.code)) {
      setCodeError("Please enter a 6-digit verification code");
      return;
    }
    // TODO: Verify the code
    console.log("Verifying code:", verificationDetails.code);
    handleCloseModal();
  };

  return (
    <>
      <div className={`NavBar-popup ${isHovered ? "show" : ""}`}>
        {/* avatar */}
        <div className="popup-avatar">
          <Link to="/profile">
            <img src="/1.jpg" alt="Avatar" />
            {/* will be replaced with user's avatar */}
          </Link>
        </div>

        {/* middle area */}
        <div className="popup-items-center">
          {/* <div className="popup-item">
            <Link to="/orders">Orders</Link>
          </div> */}
          <div className="popup-item">
            <Link to="/cart">Cart</Link>
          </div>
          <div className="popup-item">
            <Link to="/sell">Sell</Link>
          </div>
        </div>

        {/* Logout, Verification */}
        <div className="popup-bottom">
          <div className="popup-bottom-item">
            <Link to="/home">Logout</Link>
          </div>
          <div className="popup-bottom-item">
            <Link to="#" onClick={handleVerificationClick}>
              Verification
            </Link>
          </div>
        </div>
      </div>

      <Modal
        show={showVerificationModal}
        onHide={handleCloseModal}
        centered
        className="verification-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {verificationStep === 1 ? "Email Verification" : "Enter Verification Code"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {verificationStep === 1 ? (
              <Form.Group className="mb-3">
                <Form.Label>Educational Email Address</Form.Label>
                <Form.Control
                  type="email"
                  value={verificationDetails.email}
                  onChange={(e) =>
                    setVerificationDetails({
                      ...verificationDetails,
                      email: e.target.value,
                    })
                  }
                  isInvalid={!!emailError}
                  placeholder="Enter your .edu email"
                />
                <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>
              </Form.Group>
            ) : (
              <Form.Group className="mb-3">
                <Form.Label>Verification Code</Form.Label>
                <p className="text-muted small">
                  A verification code has been sent to {verificationDetails.email}
                </p>
                <Form.Control
                  type="text"
                  value={verificationDetails.code}
                  onChange={(e) =>
                    setVerificationDetails({
                      ...verificationDetails,
                      code: e.target.value,
                    })
                  }
                  isInvalid={!!codeError}
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                />
                <Form.Control.Feedback type="invalid">{codeError}</Form.Control.Feedback>
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className="modal-cancel-button" onClick={handleCloseModal}>
            Cancel
          </button>
          <button
            className="modal-submit-button"
            onClick={verificationStep === 1 ? handleVerifyEmail : handleVerifyCode}
          >
            {verificationStep === 1 ? "Send Code" : "Verify"}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PopupProfile;
