import React from "react";

const ItemCard = ({ item, tab, onEdit, onDelete, onAccept, onDeny }) => {
  const renderCardStatus = () => {
    switch (tab) {
      case "available":
        return (
          <>
            <span className="status-text">
              {item.updatedAt !== item.createdAt
                ? `Updated on: ${item.updatedAt}`
                : `Listed on: ${item.createdAt}`}
            </span>
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

  if (tab === "negotiating" && item.status.offers && item.status.offers.length > 0) {
    return (
      <div className="offers-group">
        {item.status.offers.map((offer, index) => (
          <div key={`${item._id}-offer-${index}`} className="request-card">
            <div className="card-image">
              <img src={item.image} alt={item.name} />
            </div>

            <div className="card-details">
              <h3 className="product-name">{item.name}</h3>
              <p className="offer-buyer">Buyer ID: {offer.buyerId}</p>
              <p className="product-price">
                Offered Price: ${offer.price}
                <span className="original-price">(Original: ${item.price})</span>
              </p>
              <p className="offer-message">{offer.message}</p>
              <p className="offer-date">
                Offered on: {new Date(offer.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="card-status">
              <div className="button-group">
                <button className="edit-button" onClick={() => onAccept(item.id, index)}>
                  Accept Offer
                </button>
                <button className="delete-button" onClick={() => onDeny(item.id, index)}>
                  Deny Offer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

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
