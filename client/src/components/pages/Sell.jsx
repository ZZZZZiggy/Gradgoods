import React, { useEffect, useState } from "react";
import { post, get } from "../../utilities";
import RequestModal from "../modules/RequestModal";
import NewItemModal from "../modules/NewItemModal";
import EditItemModal from "../modules/EditItemModal";
import ItemCard from "../modules/ItemCard";
import "./Cart.css";

const Sell = () => {
  const [activeTab, setActiveTab] = useState("available");
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [requestDetails, setRequestDetails] = useState({ price: "", message: "" });
  const [sentRequests, setSentRequests] = useState(new Set());
  const [showNewItemModal, setShowNewItemModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const tabs = ["available", "negotiating", "deal"];

  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [operationError, setOperationError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const productObjs = await get("/api/products");

        if (!productObjs || productObjs.length === 0) {
          setRequests([]);
          return;
        }

        // Remove the filter since backend already filters by PERSONID
        const categorizedProducts = productObjs.map((product) => ({
          ...product,
          id: product._id,
          listDate: product.createdAt,
          price: product.price || 0,
        }));

        console.log("User's products loaded:", categorizedProducts.length);
        setRequests(categorizedProducts);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const [newItem, setNewItem] = useState({
    image: null,
    imagePreview: null,
    name: "",
    price: "",
    description: "",
    method: "Pickup", // default method
  });

  // Remove the handleImageUpload function as we're using the one in NewItemModal

  // construct new product
  const handleNewItemSubmit = async (newItemData) => {
    try {
      setIsSubmitting(true);
      setOperationError(null);

      const savedProduct = await post("/api/products", {
        name: newItemData.name,
        price: parseFloat(newItemData.price),
        method: newItemData.method,
        description: newItemData.description,
        image: newItemData.image,
      });

      // 添加到本地状态
      setRequests((prev) => [...prev, { ...savedProduct, id: savedProduct._id }]);
      setShowNewItemModal(false);
    } catch (err) {
      setOperationError(err.message || "Failed to create product. Please try again.");
      console.error("Error creating product:", err);
    } finally {
      setIsSubmitting(false);
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

  const handleAccept = async (itemId, offerIndex) => {
    try {
      setIsSubmitting(true);
      setOperationError(null);

      const response = await post("/api/products/accept-offer", {
        productId: itemId,
        offerIndex: offerIndex,
      });

      if (response.success) {
        setRequests(
          response.allProducts.map((product) => ({
            ...product,
            id: product._id,
            listDate: product.createdAt,
            price: product.price || 0,
          }))
        );
      } else {
        throw new Error(response.error || "Failed to accept offer");
      }
    } catch (err) {
      setOperationError("Failed to accept offer. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeny = async (itemId, offerIndex) => {
    try {
      setIsSubmitting(true);
      setOperationError(null);

      const response = await post("/api/products/deny-offer", {
        productId: itemId,
        offerIndex: offerIndex,
      });

      if (response.success) {
        setRequests(
          response.allProducts.map((product) => ({
            ...product,
            id: product._id,
            listDate: product.createdAt,
            price: product.price || 0,
          }))
        );
      } else {
        throw new Error(response.error || "Failed to deny offer");
      }
    } catch (err) {
      setOperationError("Failed to deny offer. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (itemId) => {
    const item = requests.find((item) => item.id === itemId);
    setEditItem({
      ...item,
      imagePreview: item.image,
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = async () => {
    try {
      setIsSubmitting(true);
      setOperationError(null);

      // Prepare updates
      const updates = {
        ...editItem,
        image: editItem.imagePreview,
        updatedAt: new Date().toISOString().split("T")[0],
      };

      // Send to server
      const response = await post("/api/products/edit", {
        id: editItem.id,
        updates: updates,
      });

      // Update local state
      setRequests((prev) => prev.map((item) => (item.id === editItem.id ? response : item)));

      // Cleanup
      if (editItem.imagePreview && editItem.imagePreview !== editItem.image) {
        URL.revokeObjectURL(editItem.imagePreview);
      }
      setShowEditModal(false);
      setEditItem(null);
    } catch (err) {
      setOperationError("Failed to edit product. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (editItem.imagePreview && editItem.imagePreview !== editItem.image) {
        URL.revokeObjectURL(editItem.imagePreview);
      }
      setEditItem({
        ...editItem,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleDelete = async (itemId) => {
    try {
      setIsSubmitting(true);
      setOperationError(null);

      const response = await post("/api/products/delete", { id: itemId });

      if (response) {
        setRequests((prev) => prev.filter((item) => item._id !== itemId));
        setShowNewItemModal(false);
      } else {
        throw new Error("Failed to delete product");
      }
    } catch (err) {
      setOperationError("Failed to delete product. Please try again.");
      console.error("Delete error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredRequests = {
    available: requests.filter(
      (item) =>
        !item.status?.isAccepted && (!item.status?.offers || item.status.offers.length === 0)
    ),
    negotiating: requests.filter(
      (item) => !item.status?.isAccepted && item.status?.offers && item.status.offers.length > 0
    ),
    deal: requests.filter((item) => item.status?.isAccepted),
  };

  return (
    <div className="cart-container">
      {error && <div className="error-message">{error}</div>}
      {operationError && <div className="error-message">{operationError}</div>}
      {isLoading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        <>
          <div className="header-container">
            <h1 className="cart-title">My Items ({requests.length} total)</h1>
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
                {tab.charAt(0).toUpperCase() + tab.slice(1)} ({filteredRequests[tab].length})
              </button>
            ))}
          </div>

          <div className="requests-container">
            {filteredRequests[activeTab]?.length === 0 ? (
              <div className="no-items-message">No items in this category</div>
            ) : (
              filteredRequests[activeTab]?.map((item) => (
                <ItemCard
                  key={item._id}
                  item={item}
                  tab={activeTab}
                  onEdit={handleEdit}
                  onDelete={() => handleDelete(item._id)}
                  onAccept={handleAccept}
                  onDeny={handleDeny}
                />
              ))
            )}
          </div>

          <RequestModal
            show={showRequestModal}
            onHide={handleCloseRequestModal}
            requestDetails={requestDetails}
            setRequestDetails={setRequestDetails}
            onSubmit={handleSendRequest}
          />

          <NewItemModal
            show={showNewItemModal}
            onHide={() => setShowNewItemModal(false)}
            onSubmit={handleNewItemSubmit}
            isSubmitting={isSubmitting}
          />

          <EditItemModal
            show={showEditModal}
            onHide={() => setShowEditModal(false)}
            editItem={editItem}
            setEditItem={setEditItem}
            handleEditImageUpload={handleEditImageUpload}
            onSubmit={handleEditSubmit}
          />
        </>
      )}
    </div>
  );
};

export default Sell;
