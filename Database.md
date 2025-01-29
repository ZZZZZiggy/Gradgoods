# Database Schema Documentation

## Collections

### Person Collection

```javascript
{
  "_id": ObjectId,
  "userName": String,
  "verified": Boolean,
  "email": String,
  "avatar": String,
  "address": {
    "street": String,
    "city": String,
    "zip": String,
    "location": {
      "type": "Point",
      "coordinates": [Number, Number] // [longitude, latitude]
    }
  },
  "createdAt": Date,
  "updatedAt": Date
}
```

### Product Collection

```javascript
{
  "_id": ObjectId,
  "ownerId": ObjectId,  // References Person._id
  "owner": String, // owner Name
  "name": String,
  "price": Number,
  "method": ["Pickup", "Delivery"],
  "dateBy": Date,
  "description": String,
  "images": [String],
  "status": {
    "isAccepted": Boolean,
    "acceptedBy": ObjectId,  // References Person._id
    "acceptedAt": Date
  },
  "location": {
    "type": "Point",
    "coordinates": [Number, Number]
  },
  "createdAt": Date,
  "updatedAt": Date
}
```

### Negotiation Collection

```javascript
{
  "_id": ObjectId,
  "productId": ObjectId,  // References Product._id
  "buyerId": ObjectId,    // References Person._id
  "sellerId": ObjectId,   // References Person._id
  "status": {
    "state": String,      // "pending" | "accepted" | "rejected" | "completed"
    "updatedAt": Date
  },
  "offers": [{
    "price": Number,
    "message": String,
    "createdAt": Date,
    "createdBy": ObjectId // References Person._id
  }],
  "createdAt": Date,
  "updatedAt": Date
}
```

## Indexes

### Person Collection

- `email`: Unique index
- `address.location`: 2dsphere index for geospatial queries

### Product Collection

- `ownerId`: Index for owner lookups
- `location`: 2dsphere index for geospatial queries
- `category`: Index for category filtering

### Negotiation Collection

- `productId`: Index for product lookups
- `buyerId`: Index for buyer history
- `sellerId`: Index for seller history

## Relationships

- Product.ownerId → Person.\_id
- Product.status.acceptedBy → Person.\_id
- Negotiation.productId → Product.\_id
- Negotiation.buyerId → Person.\_id
- Negotiation.sellerId → Person.\_id
- Negotiation.offers[].createdBy → Person.\_id
