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
          productId: 1,
          addedAt: "2024-01-20",
          savedPrice: 100,
          currentPrice: 100,
          priceChanged: false,
          status: "pending",
        },
        {
          productId: 2,
          addedAt: "2024-01-20",
          savedPrice: 100,
          currentPrice: 100,
          priceChanged: false,
          status: "pending",
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
          productId: 1,
          addedAt: "2024-01-20",
          savedPrice: 100, // 保存加入购物车时的价格
          currentPrice: 100, // 当前商品实际价格
          priceChanged: false, // 标记价格是否发生变化
          status: "deal",
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

    // make sure to send back the new product
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

    // 如果价格发生变化，更新所有购物车中的该商品
    if (updates.price !== products[productIndex].price) {
      people.forEach((person) => {
        if (person.cart?.items) {
          person.cart.items = person.cart.items.map((item) => {
            if (item.productId === id) {
              return {
                ...item,
                currentPrice: updates.price,
                priceChanged: true,
              };
            }
            return item;
          });
        }
      });
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

const PERSONID = 1; // Temporary user ID for testing

router.get("/cart", (req, res) => {
  try {
    console.log("Fetching cart for user:", PERSONID);
    const user = people.find((p) => p._id === PERSONID);

    if (!user) {
      console.log("User not found:", PERSONID);
      return res.status(404).send({ error: "User not found" });
    }

    if (!user.cart) {
      console.log("No cart found for user:", PERSONID);
      return res.send({ items: [] });
    }

    const cartWithDetails = {
      ...user.cart,
      items: user.cart.items
        .map((item) => {
          const product = products.find((p) => p._id === item.productId);
          if (!product) {
            console.log("Product not found:", item.productId);
            return null;
          }

          // Update cart item status if product is accepted by this user
          if (product.status.isAccepted && product.status.acceptedBy === PERSONID) {
            item.status = "deal";
          }

          return {
            ...item,
            product,
            priceChange: {
              hasChanged: item.priceChanged,
              difference: product.price - item.savedPrice,
            },
          };
        })
        .filter(Boolean),
    };

    console.log("Successfully fetched cart:", cartWithDetails);
    res.send(cartWithDetails);
  } catch (err) {
    console.error("Detailed error in /api/cart:", err);
    res.status(500).send({ error: "Error fetching cart data", details: err.message });
  }
});

// Add to cart with pending status
router.post("/cart/add", (req, res) => {
  try {
    const { productId } = req.body;
    const userId = PERSONID; // 临时使用，之后改为 req.user._id

    const user = people.find((p) => p._id === userId);
    const product = products.find((p) => p._id === productId);

    if (!user || !product) {
      return res.status(404).send({ error: "User or product not found" });
    }

    // Add item to cart
    if (!user.cart) {
      user.cart = { items: [] };
    }

    // Check if item already exists in cart
    const existingItem = user.cart.items.find((item) => item.productId === productId);
    if (existingItem) {
      return res.status(400).send({ error: "Item already in cart" });
    }

    // Add new item
    const cartItem = {
      productId,
      addedAt: new Date().toISOString(),
      savedPrice: product.price,
      currentPrice: product.price,
      priceChanged: false,
      status: "pending",
    };

    user.cart.items.push(cartItem);
    user.cart.lastUpdated = new Date().toISOString();

    res.send(cartItem);
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).send({ error: "Error adding to cart" });
  }
});

// Direct order with offer
router.post("/cart/order", (req, res) => {
  try {
    const { productId, price, message } = req.body;
    const userId = PERSONID; // 临时使用，之后改为 req.user._id

    const user = people.find((p) => p._id === userId);
    const product = products.find((p) => p._id === productId);

    if (!user || !product) {
      return res.status(404).send({ error: "User or product not found" });
    }

    // Add item to cart with deal status
    if (!user.cart) {
      user.cart = { items: [] };
    }

    // Create new cart item
    const cartItem = {
      productId,
      addedAt: new Date().toISOString(),
      savedPrice: product.price,
      currentPrice: product.price,
      priceChanged: false,
      status: "deal",
    };

    // Update product status
    const now = new Date().toISOString();
    product.status = {
      isAccepted: true,
      acceptedBy: userId,
      acceptedAt: now,
      offers: [
        {
          price,
          message,
          createdAt: now,
          buyerId: userId,
          Accepted: true,
        },
      ],
    };

    // Update or add cart item
    const existingItemIndex = user.cart.items.findIndex((item) => item.productId === productId);
    if (existingItemIndex !== -1) {
      user.cart.items[existingItemIndex] = cartItem;
    } else {
      user.cart.items.push(cartItem);
    }

    user.cart.lastUpdated = now;

    res.send({ cartItem, product });
  } catch (err) {
    console.error("Error processing order:", err);
    res.status(500).send({ error: "Error processing order" });
  }
});

// Remove item from cart
router.post("/cart/remove", (req, res) => {
  try {
    const { productId } = req.body;
    const userId = PERSONID;

    const user = people.find((p) => p._id === userId);
    if (!user || !user.cart) {
      return res.status(404).send({ error: "Cart not found" });
    }

    // Remove item from cart
    user.cart.items = user.cart.items.filter((item) => item.productId !== productId);
    user.cart.lastUpdated = new Date().toISOString();

    res.send({ message: "Item removed successfully" });
  } catch (err) {
    console.error("Error removing from cart:", err);
    res.status(500).send({ error: "Error removing item from cart" });
  }
});

// Add offer to product and update cart status
router.post("/cart/make-offer", (req, res) => {
  try {
    const { productId, price, message } = req.body;
    const userId = PERSONID;

    const user = people.find((p) => p._id === userId);
    const product = products.find((p) => p._id === productId);

    if (!user || !product) {
      return res.status(404).send({ error: "User or product not found" });
    }

    // Add offer to product
    const now = new Date().toISOString();
    const newOffer = {
      price,
      message,
      createdAt: now,
      buyerId: userId,
      Accepted: false,
    };

    product.status.offers.push(newOffer);

    // Update cart item status
    const cartItem = user.cart.items.find((item) => item.productId === productId);
    if (cartItem) {
      cartItem.status = "negotiating";
    }

    res.send({ product, cartItem });
  } catch (err) {
    console.error("Error making offer:", err);
    res.status(500).send({ error: "Error making offer" });
  }
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
