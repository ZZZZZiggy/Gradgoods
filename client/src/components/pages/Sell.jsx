import React, { useState } from "react";
import { post } from "../../utilities";
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

  const [newItem, setNewItem] = useState({
    image: null,
    imagePreview: null,
    name: "",
    price: "",
    description: "",
    method: "Pickup", // default method
  });

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

  // construct new product
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
          <ItemCard
            key={item.id}
            item={item}
            tab={activeTab}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAccept={handleAccept}
            onDeny={handleDeny}
          />
        ))}
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
        newItem={newItem}
        setNewItem={setNewItem}
        handleImageUpload={handleImageUpload}
        onSubmit={handleNewItemSubmit}
      />

      <EditItemModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        editItem={editItem}
        setEditItem={setEditItem}
        handleEditImageUpload={handleEditImageUpload}
        onSubmit={handleEditSubmit}
      />
    </div>
  );
};

export default Sell;
