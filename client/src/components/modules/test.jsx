const product1 = {
  _id: 1,
  ownerId: 1,
  owner: "seller1",
  name: "Product 1",
  price: 100,
  method: "Delivery",
  dateby: "2024-01-20",
  description: "pick up by April 32",
  image: "/IMG_E103515C1907-1.jpeg",
  location: {
    type: "Point",
    coordinates: [42.3601, -71.0942], // Boston coordinates
  },
  distance: 0,
  status: {
    isAccepted: false,
    acceptedBy: null,
    acceptedAt: null,
    offers: [],
  },
  createdAt: "2024-01-20",
  updatedAt: "2024-01-20",
};
const product2 = {
  _id: 2,
  ownerId: 2,
  owner: "seller2",
  name: "Product 2",
  price: 200,
  method: "Delivery",
  dateby: "2024-01-20",
  description: "pick up by April 32",
  image: "/1.jpg",
  location: {
    type: "Point",
    coordinates: [42.3736, -71.1097], // Cambridge coordinates
  },
  distance: 0,
  status: {
    isAccepted: false,
    acceptedBy: null,
    acceptedAt: null,
    offers: [],
  },
  createdAt: "2024-01-20",
  updatedAt: "2024-01-20",
};
const product3 = {
  _id: 3,
  ownerId: 3,
  owner: "seller3",
  name: "Product 3",
  price: 300,
  method: "Delivery",
  dateby: "2024-01-20",
  description: "pick up by April 32",
  image: "/1.jpg",
  location: {
    type: "Point",
    coordinates: [42.3654, -71.1033], // MIT coordinates
  },
  distance: 0,
  status: {
    isAccepted: false,
    acceptedBy: null,
    acceptedAt: null,
    offers: [],
  },
  createdAt: "2024-01-20",
  updatedAt: "2024-01-20",
};
const product4 = {
  _id: 4,
  ownerId: 1,
  owner: "seller1",
  name: "Product 1",
  price: 100,
  method: "Delivery",
  dateby: "2024-01-20",
  description: "pick up by April 32",
  image: "/1.jpg",
  location: {
    type: "Point",
    coordinates: [42.377, -71.1167], // Harvard coordinates
  },
  distance: 0,
  status: {
    isAccepted: false,
    acceptedBy: null,
    acceptedAt: null,
    offers: [],
  },
  createdAt: "2024-01-20",
  updatedAt: "2024-01-20",
};
const product5 = {
  _id: 5,
  ownerId: 2,
  owner: "seller2",
  name: "Product 2",
  price: 200,
  method: "Delivery",
  dateby: "2024-01-20",
  description: "pick up by April 32",
  image: "/1.jpg",
  location: {
    type: "Point",
    coordinates: [42.3505, -71.1054], // Brookline coordinates
  },
  distance: 0,
  status: {
    isAccepted: false,
    acceptedBy: null,
    acceptedAt: null,
    offers: [],
  },
  createdAt: "2024-01-20",
  updatedAt: "2024-01-20",
};
const product6 = {
  _id: 6,
  ownerId: 3,
  owner: "seller3",
  name: "Product 3",
  price: 300,
  method: "Delivery",
  dateby: "2024-01-20",
  description: "pick up by April 32",
  image: "/1.jpg",
  location: {
    type: "Point",
    coordinates: [42.3875, -71.0995], // Somerville coordinates
  },
  distance: 0,
  status: {
    isAccepted: false,
    acceptedBy: null,
    acceptedAt: null,
    offers: [],
  },
  createdAt: "2024-01-20",
  updatedAt: "2024-01-20",
};
const products = [product1, product2, product3, product4, product5, product6];
