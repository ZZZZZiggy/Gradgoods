person:{
    "_id": "1",
    "userName": "Alice",
    "verified": true,
    "email": "alice@example.com",
    "avatar": "https://example.com/avatar1.jpg"
    "cart": {
        "items": [
            // only prroducts that are not accepted or accept id == user id
            negotiation1, negotiation2
            ]
    }
    "sell": {
        [
            // only prroducts that are not accepted or accept id == user id
            negotiation1, negotiation2
            ]
    }
    "address": {
      "street": "123 Main St",
      "city": "New York",
      "zip": "10001"
    }
}

product:{
    "_id": "1",
    "owner": "1",
    "name": "Product 1",
    "prize": 100,
    "method": "Delivery",
    "dateby": "2024-01-20",
    "description": "amazing product",
    "image": "/IMG_E103515C1907-1.jpeg",
    "acceptStatus": "{false, or person.ID}"
    "sentDate": "2024-01-20",
    "replyDate": "2024-01-21"
}
negotiation:
{
    "productId": "1",
    "negotiaterId": "1",
    "negotiation": {
        "status": "product.acceptStatus", // if accept id == user id, then show the product
        "replyDate": "default None, or 2024-01-21",
        "sentDate": "default None, or 2024-01-20",
        "text": "default None, or 'I want to buy this product'",
        "Newprize": 100
        }
    }
