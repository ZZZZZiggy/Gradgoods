import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { get, post } from "../../utilities";
import "./PopupProfile.css";

const PopupProfile = ({ isHovered }) => {
  const navigate = useNavigate();
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationStep, setVerificationStep] = useState(1); // 1 for email, 2 for code
  const [verificationDetails, setVerificationDetails] = useState({
    email: "",
    code: "",
  });
  const [emailError, setEmailError] = useState("");
  const [codeError, setCodeError] = useState("");

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const autocompleteRef = useRef(null);
  const inputRef = useRef(null);

  const [user, setUser] = useState(null);

  useEffect(() => {
    get("/api/address").then((addr) => {
      if (addr.formatted_address) {
        setAddress(addr.formatted_address);
      }
    });
  }, []);

  useEffect(() => {
    if (showAddressModal && window.google) {
      console.log("Google Maps API loaded");
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: "US" },
        fields: ["address_components", "formatted_address", "geometry"],
        types: ["address"],
      });

      console.log("Autocomplete initialized");

      autocomplete.addListener("place_changed", () => {
        console.log("Place changed");
        const place = autocomplete.getPlace();
        console.log("Selected place:", place);
        if (place.geometry) {
          setAddress(place.formatted_address);
          setAddressError("");
        }
      });

      autocompleteRef.current = autocomplete;
    } else {
      console.log("Google Maps API not loaded", {
        showAddressModal,
        googleExists: !!window.google,
      });
    }
  }, [showAddressModal]);

  useEffect(() => {
    // 获取用户信息
    get("/api/whoami").then((userData) => {
      setUser(userData);
    });
  }, []);

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

  const handleAddressClick = (e) => {
    e.preventDefault();
    setShowAddressModal(true);
  };

  const handleCloseAddressModal = () => {
    setShowAddressModal(false);
    setAddressError("");
  };

  const handleSaveAddress = () => {
    if (!address.trim()) {
      setAddressError("Please enter a valid address");
      return;
    }

    const place = autocompleteRef.current?.getPlace();
    if (!place || !place.geometry) {
      setAddressError("Please select an address from the suggestions");
      return;
    }

    const addressData = {
      formatted_address: place.formatted_address,
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };

    post("/api/address", addressData)
      .then(() => {
        handleCloseAddressModal();
      })
      .catch((err) => {
        console.log("Error saving address:", err);
        setAddressError("Failed to save address. Please try again.");
      });
  };

  const handleNavigation = (path) => {
    return (e) => {
      e.preventDefault();
      navigate(path, { replace: true });
    };
  };

  const handleLogout = () => {
    post("/api/logout").then(() => {
      navigate("/");
    });
  };

  return (
    <>
      <div className={`NavBar-popup ${isHovered ? "show" : ""}`}>
        {/* avatar */}
        <div className="popup-avatar">
          <Link to="/cart">
            <img src={user?.avatar || "/1.jpg"} alt={user?.userName || "Avatar"} />
          </Link>
        </div>

        {/* middle area */}
        <div className="popup-items-center">
          {/* <div className="popup-item">
            <Link to="/orders">Orders</Link>
          </div> */}
          <div className="popup-item">
            <Link to="#" onClick={handleNavigation("/cart")}>
              Cart
            </Link>
          </div>
          <div className="popup-item">
            <Link to="#" onClick={handleNavigation("/sell")}>
              Sell
            </Link>
          </div>
          <div className="popup-item">
            <Link to="#" onClick={handleAddressClick}>
              Set Address
            </Link>
          </div>
        </div>

        {/* Logout, Verification */}
        <div className="popup-bottom">
          <div className="popup-bottom-item">
            <Link to="#" onClick={handleLogout}>
              Logout
            </Link>
          </div>
          <div className="popup-bottom-item">
            <Link to="#" onClick={handleVerificationClick}>
              Verification (No time to finish)
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

      <Modal
        show={showAddressModal}
        onHide={handleCloseAddressModal}
        centered
        className="address-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Set Your Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                ref={inputRef}
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                isInvalid={!!addressError}
                placeholder="Enter your address"
              />
              <Form.Control.Feedback type="invalid">{addressError}</Form.Control.Feedback>
              <Form.Text className="text-muted">
                Start typing and select an address from the suggestions
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className="modal-cancel-button" onClick={handleCloseAddressModal}>
            Cancel
          </button>
          <button className="modal-submit-button" onClick={handleSaveAddress}>
            Save Address
          </button>
          Save Address
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PopupProfile;
