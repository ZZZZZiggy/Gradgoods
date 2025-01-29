const CartItem = ({ item }) => {
  return (
    <div className="cart-item">
      {/* ...existing item details... */}
      <div className="price-section">
        {item.priceChange.hasChanged ? (
          <>
            <span className="original-price">${item.savedPrice}</span>
            <span
              className={`price-difference ${
                item.priceChange.difference > 0 ? "increased" : "decreased"
              }`}
            >
              {item.priceChange.difference > 0 ? "+" : ""}
              {item.priceChange.difference}
            </span>
            <span className="current-price">${item.product.price}</span>
          </>
        ) : (
          <span className="price">${item.savedPrice}</span>
        )}
      </div>
    </div>
  );
};
