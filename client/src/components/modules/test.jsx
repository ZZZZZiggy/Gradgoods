.product_container {
    display: flex;
    width: 80%;
    justify-content: center;
    margin: 0 auto; /* Add this line to center the container */
  }
  .filter_container {
    flex-direction: column;
    width: max(min(30%, calc(14rem)), 28rem);
    padding: var(--margin);
    margin: 0 auto;
  }
  .items_filter_opened {
    width: clamp(60%, 70%, 90%);
    margin: 0 auto;
    display: flex;
    justify-content: center;
  }

  .items_filter_closed {
    width: clamp(60%, 90%, 100%);
    margin: 0 auto;
    display: flex;
    justify-content: center;
  }
  .card_array {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
    gap: var(--s);
    padding: var(--margin);
    justify-items: center;
  }
