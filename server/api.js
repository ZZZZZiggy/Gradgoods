/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Address = require("./models/address");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

// datafiles
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
  status: {
    isAccepted: false,
    acceptedBy: null,
    acceptedAt: null,
    offers: [
      // {
      //   price: 25,
      //   message: "I'm poor, but I want to buy this product",
      //   createdAt: "2024-01-20",
      //   buyerId: 2, // References Person._id
      //   offerStatus: false,
      // },
      // {
      //   price: 26,
      //   message: "I'm pooeewer, but I want to buy this product",
      //   createdAt: "2024-01-21",
      //   buyerId: 3, // References Person._id
      //   offerStatus: false,
      // },
    ],
  },
  createdAt: "2024-01-20",
  updatedAt: "2024-01-20",
  diatance: 1,
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
  status: {
    isAccepted: false,
    acceptedBy: null,
    acceptedAt: null,
    offers: [
      {
        price: 25,
        message: "I'm poor, but I want to buy this product",
        createdAt: "2024-01-20",
        buyerId: 2, // References Person._id
        Accepted: false,
      },
      {
        price: 26,
        message: "I'm pooeewer, but I want to buy this product",
        createdAt: "2024-01-21",
        buyerId: 3, // References Person._id
        Accepted: false,
      },
    ],
  },
  createdAt: "2024-01-20",
  updatedAt: "2024-01-20",
  diatance: 1,
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
  status: {
    isAccepted: false,
    acceptedBy: null,
    acceptedAt: null,
    offers: [
      {
        price: 25,
        message: "I'm poor, but I want to buy this product",
        createdAt: "2024-01-20",
        buyerId: 2, // References Person._id
        Accepted: false,
      },
      {
        price: 26,
        message: "I'm pooeewer, but I want to buy this product",
        createdAt: "2024-01-21",
        buyerId: 3, // References Person._id
        Accepted: false,
      },
    ],
  },
  createdAt: "2024-01-20",
  updatedAt: "2024-01-20",
  diatance: 1,
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
  status: {
    isAccepted: false,
    acceptedBy: null,
    acceptedAt: null,
    offers: [
      {
        price: 25,
        message: "I'm poor, but I want to buy this product",
        createdAt: "2024-01-20",
        buyerId: 2, // References Person._id
        Accepted: false,
      },
      {
        price: 26,
        message: "I'm pooeewer, but I want to buy this product",
        createdAt: "2024-01-21",
        buyerId: 3, // References Person._id
        Accepted: false,
      },
    ],
  },
  createdAt: "2024-01-20",
  updatedAt: "2024-01-20",
  diatance: 1,
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
  status: {
    isAccepted: false,
    acceptedBy: null,
    acceptedAt: null,
    offers: [
      {
        price: 25,
        message: "I'm poor, but I want to buy this product",
        createdAt: "2024-01-20",
        buyerId: 2, // References Person._id
        Accepted: false,
      },
      {
        price: 26,
        message: "I'm pooeewer, but I want to buy this product",
        createdAt: "2024-01-21",
        buyerId: 3, // References Person._id
        Accepted: false,
      },
    ],
  },
  createdAt: "2024-01-20",
  updatedAt: "2024-01-20",
  diatance: 1,
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
  status: {
    isAccepted: false,
    acceptedBy: null,
    acceptedAt: null,
    offers: [
      // {
      //   price: 25,
      //   message: "I'm poor, but I want to buy this product",
      //   createdAt: "2024-01-20",
      //   buyerId: 2, // References Person._id
      //   Accepted: false,
      // },
      // {
      //   price: 26,
      //   message: "I'm pooeewer, but I want to buy this product",
      //   createdAt: "2024-01-21",
      //   buyerId: 3, // References Person._id
      //   Accepted: false,
      // },
    ],
  },
  createdAt: "2024-01-20",
  updatedAt: "2024-01-20",
  diatance: 1,
};
const products = [product1, product2, product3, product4, product5, product6];
console.log(products);
const people = [
  {
    _id: 1,
    userName: "Laowang",
    verified: true,
    email: "xiang949@mit.edu",
    avatar: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
    address: {
      street: "String",
      city: "String",
      zip: "02139",
      location: {
        type: "Point",
        coordinates: [42.37254650364875, -71.09808551429043], // [longitude, latitude]
      },
    },
    createdAt: "2024-01-20",
    updatedAt: "2024-01-20",
    cart: {
      items: [
        {
          productId: 1, // 引用商品ID
          addedAt: "2024-01-20",
          quantity: 1,
          savedPrice: 100, // 保存加入购物车时的价格
          notes: "可选备注",
        },
      ],
      lastUpdated: "2024-01-20",
    },
  },
  {
    _id: 2,
    userName: "Xiaowang",
    verified: true,
    email: "xiang949@mit.edu",
    avatar: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
    address: {
      street: "String",
      city: "String",
      zip: "02139",
      location: {
        type: "Point",
        coordinates: [42.37254650364875, -71.09808551429043], // [longitude, latitude]
      },
    },
    cart: {
      items: [
        {
          productId: 1, // 引用商品ID
          addedAt: "2024-01-20",
          quantity: 1,
          savedPrice: 100, // 保存加入购物车时的价格
          notes: "可选备注",
        },
      ],
      lastUpdated: "2024-01-20",
    },
    createdAt: "2024-01-20",
    updatedAt: "2024-01-20",
  },
];

router.get("/products", (req, res) => {
  try {
    // 详细的调试日志
    res.send(products);
  } catch (err) {
    console.error("Detailed error in /api/products:", err);
    res.status(500).send({ error: "Error fetching products" });
  }
});

router.post("/products", (req, res) => {
  try {
    const currentDate = new Date().toISOString().split("T")[0];
    const _id = products.length + 1;

    const newProduct = {
      _id,
      ownerId: 1,
      owner: "seller1",
      name: req.body.name,
      price: req.body.price,
      method: req.body.method,
      dateby: currentDate,
      description: req.body.description,
      image: req.body.image,
      status: {
        isAccepted: false,
        acceptedBy: null,
        acceptedAt: null,
        offers: [],
      },
      createdAt: currentDate,
      updatedAt: currentDate,
      diatance: 1,
    };

    products.push(newProduct);

    // 确保返回的对象包含所有必要字段
    res.send(newProduct);
  } catch (err) {
    console.log(`Error creating product: ${err}`);
    res.status(500).send({ error: "Error creating product" });
  }
});

// Add two new endpoints
router.post("/products/edit", (req, res) => {
  try {
    const { id, updates } = req.body;
    const productIndex = products.findIndex((p) => p._id === id);

    if (productIndex === -1) {
      return res.status(404).send({ error: "Product not found" });
    }

    // Update the product
    products[productIndex] = {
      ...products[productIndex],
      ...updates,
      updatedAt: new Date().toISOString().split("T")[0],
    };

    res.send(products[productIndex]);
  } catch (err) {
    console.error("Error editing product:", err);
    res.status(500).send({ error: "Error editing product" });
  }
});

router.post("/products/delete", (req, res) => {
  try {
    const { id } = req.body;
    const productIndex = products.findIndex((p) => p._id === id);

    if (productIndex === -1) {
      return res.status(404).send({ error: "Product not found" });
    }

    // Remove the product
    const deletedProduct = products.splice(productIndex, 1)[0];
    res.send(deletedProduct);
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).send({ error: "Error deleting product" });
  }
});

router.post("/products/accept-offer", (req, res) => {
  try {
    const { productId, offerIndex } = req.body;
    const productIndex = products.findIndex((p) => p._id === productId);

    if (productIndex === -1) {
      return res.status(404).send({ error: "Product not found" });
    }

    const product = products[productIndex];
    const acceptedOffer = product.status.offers[offerIndex];

    // Update product status
    products[productIndex] = {
      ...product,
      status: {
        ...product.status,
        isAccepted: true,
        acceptedBy: acceptedOffer.buyerId,
        acceptedAt: new Date().toISOString(),
        acceptedOffer: acceptedOffer,
        offers: [], // Clear other offers
      },
    };

    res.send(products[productIndex]);
  } catch (err) {
    console.error("Error accepting offer:", err);
    res.status(500).send({ error: "Error accepting offer" });
  }
});

router.post("/products/deny-offer", (req, res) => {
  try {
    const { productId, offerIndex } = req.body;
    const productIndex = products.findIndex((p) => p._id === productId);

    if (productIndex === -1) {
      return res.status(404).send({ error: "Product not found" });
    }

    const product = products[productIndex];
    const updatedOffers = [...product.status.offers];
    updatedOffers.splice(offerIndex, 1);

    // Update product
    products[productIndex] = {
      ...product,
      status: {
        ...product.status,
        offers: updatedOffers,
      },
    };

    res.send(products[productIndex]);
  } catch (err) {
    console.error("Error denying offer:", err);
    res.status(500).send({ error: "Error denying offer" });
  }
});

router.post("/address", auth.ensureLoggedIn, async (req, res) => {
  try {
    const { formatted_address, lat, lng } = req.body;

    const address = await Address.findOneAndUpdate(
      { userId: req.user._id },
      {
        formatted_address,
        lat,
        lng,
        updatedAt: Date.now(),
      },
      { upsert: true, new: true }
    );

    res.send(address);
  } catch (err) {
    console.log(`Error saving address: ${err}`);
    res.status(500).send({ error: "Error saving address" });
  }
});

router.get("/address", auth.ensureLoggedIn, async (req, res) => {
  try {
    const address = await Address.findOne({ userId: req.user._id });
    res.send(address || {});
  } catch (err) {
    console.log(`Error fetching address: ${err}`);
    res.status(500).send({ error: "Error fetching address" });
  }
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
