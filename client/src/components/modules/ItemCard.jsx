import React from "react";

const ItemCard = ({ item, tab, onEdit, onDelete, onAccept, onDeny }) => {
  const renderCardStatus = () => {
    switch (tab) {
      case "available":
        return (
          <>
            <span className="status-text">Listed on: {item.listDate}</span>
            <div className="button-group">
              <button className="edit-button" onClick={() => onEdit(item.id)}>
                Edit Listing
              </button>
              <button className="delete-button" onClick={() => onDelete(item.id)}>
                Delete Listing
              </button>
            </div>
          </>
        );

      case "negotiating":
        return (
          <div className="button-group">
            <button className="edit-button" onClick={() => onAccept(item.id)}>
              Accept
            </button>
            <button className="delete-button" onClick={() => onDeny(item.id)}>
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
    <div className="request-card">
      <div className="card-image">
        <img src={item.image} alt={item.name} />
      </div>

      <div className="card-details">
        <h3 className="product-name">{item.name}</h3>
        <p className="product-price">${item.price}</p>
        <p className="product-description">{item.description}</p>
      </div>

      <div className="card-status">{renderCardStatus()}</div>
    </div>
  );
};

export default ItemCard;
