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
  prize: 100,
  method: "Delivery",
  dateby: "2024-01-20",
  description: "pick up by April 32",
  image: "/IMG_E103515C1907-1.jpeg",
  status: {
    isAccepted: false,
    acceptedBy: null,
    acceptedAt: null,
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
  prize: 200,
  method: "Delivery",
  dateby: "2024-01-20",
  description: "pick up by April 32",
  image: "/1.jpg",
  status: {
    isAccepted: true,
    acceptedBy: null,
    acceptedAt: null,
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
  prize: 300,
  method: "Delivery",
  dateby: "2024-01-20",
  description: "pick up by April 32",
  image: "/1.jpg",
  status: {
    isAccepted: false,
    acceptedBy: null,
    acceptedAt: null,
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
  prize: 100,
  method: "Delivery",
  dateby: "2024-01-20",
  description: "pick up by April 32",
  image: "/1.jpg",
  status: {
    isAccepted: false,
    acceptedBy: null,
    acceptedAt: null,
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
  prize: 200,
  method: "Delivery",
  dateby: "2024-01-20",
  description: "pick up by April 32",
  image: "/1.jpg",
  status: {
    isAccepted: false,
    acceptedBy: null,
    acceptedAt: null,
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
  prize: 300,
  method: "Delivery",
  dateby: "2024-01-20",
  description: "pick up by April 32",
  image: "/1.jpg",
  status: {
    isAccepted: false,
    acceptedBy: null,
    acceptedAt: null,
  },
  createdAt: "2024-01-20",
  updatedAt: "2024-01-20",
  diatance: 1,
};
const products = [product1, product2, product3, product4, product5, product6];

router.get("/products", (req, res) => {
  try {
    res.send(products);
  } catch (err) {
    console.log(`Error in /api/products: ${err}`);
    res.status(500).send({ error: "Error fetching products" });
  }
});

// 添加新商品
router.post("/products", (req, res) => {
  // 暂时移除 auth.ensureLoggedIn 方便测试
  try {
    const currentDate = new Date().toISOString().split("T")[0];
    const newProduct = {
      _id: products.length + 1,
      ownerId: 1, // 临时ID
      owner: "seller1", // 临时名称
      name: req.body.name,
      prize: req.body.prize,
      method: req.body.method,
      dateby: currentDate,
      description: req.body.description,
      image: req.body.image,
      status: {
        isAccepted: false,
        acceptedBy: null,
        acceptedAt: null,
      },
      createdAt: currentDate,
      updatedAt: currentDate,
      diatance: 1,
    };

    products.push(newProduct);
    console.log("New product added:", newProduct); // 添加调试日志
    res.send(newProduct);
  } catch (err) {
    console.log(`Error creating product: ${err}`);
    res.status(500).send({ error: "Error creating product" });
  }
});

router.post("/address", auth.ensureLoggedIn, async (req, res) => {
  try {
    const { formatted_address, lat, lng } = req.body;

    // Update or create address
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
