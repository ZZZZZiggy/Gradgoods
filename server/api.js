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
const PERSONID = 1; // Temporary user ID for testing
// datafiles

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
      items: [],
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
      items: [],
      lastUpdated: "2024-01-20",
    },
    createdAt: "2024-01-20",
    updatedAt: "2024-01-20",
  },
];

// Add helper function for distance calculation
const calculateDistance = (coords1, coords2) => {
  if (!coords1 || !coords2) return 0;

  const [lon1, lat1] = coords1;
  const [lon2, lat2] = coords2;

  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 10) / 10;
};

// import mongoose models
const ProductModel = require("./models/product");

// routers
router.get("/allproducts", async (req, res) => {
  try {
    const user = people.find((p) => p._id === PERSONID);
    const userLocation = user?.address?.location?.coordinates;

    const products = await ProductModel.find({});
    const productsWithDistance = products.map((product) => ({
      ...product.toObject(),
      distance: calculateDistance(userLocation, product.location?.coordinates) || 0,
    }));

    res.send(productsWithDistance);
  } catch (err) {
    console.error("Detailed error in /api/products:", err);
    res.status(500).send({ error: "Error fetching products" });
  }
});

router.get("/products", async (req, res) => {
  try {
    const user = people.find((p) => p._id === PERSONID);
    const userLocation = user?.address?.location?.coordinates;

    const products = await ProductModel.find({ ownerId: PERSONID });
    const productsWithDistance = products.map((product) => ({
      ...product.toObject(),
      distance: calculateDistance(userLocation, product.location?.coordinates) || 0,
    }));

    res.send(productsWithDistance);
  } catch (err) {
    console.error("Detailed error in /api/products:", err);
    res.status(500).send({ error: "Error fetching products" });
  }
});

// Modify the product creation route
router.post("/products", async (req, res) => {
  try {
    const buyer = people.find((p) => p._id === PERSONID);
    const buyerLocation = buyer?.address?.location?.coordinates;
    const currentDate = new Date().toISOString().split("T")[0];

    const newProduct = new ProductModel({
      ownerId: PERSONID,
      owner: "seller1",
      name: req.body.name,
      price: req.body.price,
      method: req.body.method,
      dateby: currentDate,
      description: req.body.description,
      image: req.body.image, // Expecting base64 string from frontend
      location: {
        type: "Point",
        coordinates: buyerLocation || [42.3601, -71.0942], // Use buyer's location or default to Boston
      },
      distance: calculateDistance(buyerLocation, buyerLocation) || 0,
    });

    const savedProduct = await newProduct.save();
    res.send(savedProduct);
  } catch (err) {
    console.log(`Error creating product: ${err}`);
    res.status(500).send({ error: "Error creating product", details: err.message });
  }
});

// Add two new endpoints
router.post("/products/edit", async (req, res) => {
  try {
    const { id, updates } = req.body;
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      { ...updates, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).send({ error: "Product not found" });
    }

    // Still handle cart price updates with in-memory people array
    if (updates.price !== updatedProduct.price) {
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

    res.send(updatedProduct);
  } catch (err) {
    console.error("Error editing product:", err);
    res.status(500).send({ error: "Error editing product" });
  }
});

router.post("/products/delete", async (req, res) => {
  try {
    const { id } = req.body;
    const deletedProduct = await ProductModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).send({ error: "Product not found" });
    }

    res.send(deletedProduct);
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).send({ error: "Error deleting product" });
  }
});

router.post("/products/accept-offer", async (req, res) => {
  try {
    const { productId, offerIndex } = req.body;
    console.log("Accepting offer:", { productId, offerIndex }); // 添加调试日志

    const product = await ProductModel.findById(productId);
    console.log("Found product:", product); // 添加调试日志

    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }

    if (!product.status?.offers || offerIndex >= product.status.offers.length) {
      return res.status(400).send({ error: "Invalid offer index" });
    }

    const acceptedOffer = product.status.offers[offerIndex];

    // Update product status
    product.status = {
      ...product.status,
      isAccepted: true,
      acceptedBy: acceptedOffer.buyerId,
      acceptedAt: new Date().toISOString(),
      acceptedOffer: acceptedOffer,
      offers: [], // Clear other offers
    };

    const updatedProduct = await product.save();
    res.send(updatedProduct);
  } catch (err) {
    console.error("Detailed error in accept-offer:", err); // 添加详细错误日志
    res.status(500).send({ error: "Error accepting offer", details: err.message });
  }
});

router.post("/products/deny-offer", async (req, res) => {
  try {
    const { productId, offerIndex } = req.body;
    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }

    const offer = product.status.offers[offerIndex];
    offer.Accepted = false;

    // Update cart item status for the buyer
    const user = people.find((p) => p._id === offer.buyerId);
    if (user && user.cart) {
      const cartItem = user.cart.items.find((item) => item.productId === productId);
      if (cartItem) {
        cartItem.lastOfferAccepted = false;
      }
    }

    const updatedProduct = await product.save();
    res.send(updatedProduct);
  } catch (err) {
    console.error("Error denying offer:", err);
    res.status(500).send({ error: "Error denying offer" });
  }
});

router.post("/address", (req, res) => {
  try {
    const userId = PERSONID; // Using the test user ID
    const { street, city, zip, lat, lng } = req.body;

    const user = people.find((p) => p._id === userId);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    // Update user's address with the new format
    user.address = {
      street: street,
      city: city,
      zip: zip,
      location: {
        type: "Point",
        coordinates: [lat, lng], // [latitude, longitude]
      },
    };

    user.updatedAt = new Date().toISOString();

    res.send(user.address);
  } catch (err) {
    console.log(`Error saving address: ${err}`);
    res.status(500).send({ error: "Error saving address" });
  }
});

router.get("/address", (req, res) => {
  try {
    const userId = PERSONID; // Using the test user ID
    const user = people.find((p) => p._id === userId);

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    res.send(user.address || {});
  } catch (err) {
    console.log(`Error fetching address: ${err}`);
    res.status(500).send({ error: "Error fetching address" });
  }
});

router.get("/cart", async (req, res) => {
  try {
    console.log("Fetching cart for user:", PERSONID);
    const user = people.find((p) => p._id === PERSONID);

    if (!user || !user.cart) {
      return res.send({ items: [] });
    }

    const cartItems = await Promise.all(
      user.cart.items.map(async (item) => {
        const product = await ProductModel.findById(item.productId);
        if (!product) return null;

        // Update cart item status if product is accepted by this user
        if (product.status?.isAccepted && product.status?.acceptedBy === PERSONID) {
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
    );

    const cartWithDetails = {
      ...user.cart,
      items: cartItems.filter(Boolean),
    };

    res.send(cartWithDetails);
  } catch (err) {
    console.error("Detailed error in /api/cart:", err);
    res.status(500).send({ error: "Error fetching cart data", details: err.message });
  }
});

// Add to cart with pending status
router.post("/cart/add", async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = PERSONID;

    const user = people.find((p) => p._id === userId);
    const product = await ProductModel.findById(productId);

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
router.post("/cart/order", async (req, res) => {
  try {
    const { productId, price, message } = req.body;
    const userId = PERSONID;

    const user = people.find((p) => p._id === userId);
    const product = await ProductModel.findById(productId);

    if (!user || !product) {
      return res.status(404).send({ error: "User or product not found" });
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

    // Save product changes
    await product.save();

    // Update cart
    if (!user.cart) {
      user.cart = { items: [] };
    }

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
router.post("/cart/make-offer", async (req, res) => {
  try {
    const { productId, price, message } = req.body;
    const userId = PERSONID;

    const user = people.find((p) => p._id === userId);
    const product = await ProductModel.findById(productId);

    if (!user || !product) {
      return res.status(404).send({ error: "User or product not found" });
    }

    const now = new Date().toISOString();
    const newOffer = {
      price,
      message,
      createdAt: now,
      buyerId: userId,
      Accepted: null,
    };

    if (!product.status) {
      product.status = { offers: [] };
    }
    product.status.offers.push(newOffer);
    await product.save();

    // Update cart item status
    const cartItem = user.cart.items.find((item) => item.productId === productId);
    if (cartItem) {
      cartItem.status = "negotiating";
      cartItem.lastOfferAccepted = null;
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
console.log(people[0]);
module.exports = router;
