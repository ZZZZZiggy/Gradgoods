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
// import mongoose models
const ProductModel = require("./models/product");
// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    console.log("User not logged in");
    return res.send({});
  }

  User.findById(req.user._id)
    .then((user) => {
      console.log("User logged in:", user);
      res.send(user);
    })
    .catch((err) => {
      console.log(`Error finding user: ${err}`);
      res.status(500).send({});
    });
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

// const people = [
//   {
//     _id: 1,
//     userName: "Laowang",
//     verified: true,
//     email: "xiang949@mit.edu",
//     avatar: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
//     address: {
//       street: "String",
//       city: "String",
//       zip: "02139",
//       location: {
//         type: "Point",
//         coordinates: [42.37254650364875, -71.09808551429043], // [longitude, latitude]
//       },
//     },
//     createdAt: "2024-01-20",
//     updatedAt: "2024-01-20",
//     cart: {
//       items: [],
//       lastUpdated: "2024-01-20",
//     },
//   },
//   {
//     _id: 2,
//     userName: "Xiaowang",
//     verified: true,
//     email: "xiang949@mit.edu",
//     avatar: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
//     address: {
//       street: "String",
//       city: "String",
//       zip: "02139",
//       location: {
//         type: "Point",
//         coordinates: [42.37254650364875, -71.09808551429043], // [longitude, latitude]
//       },
//     },
//     cart: {
//       items: [],
//       lastUpdated: "2024-01-20",
//     },
//     createdAt: "2024-01-20",
//     updatedAt: "2024-01-20",
//   },
// ];

// 将获取用户数据的逻辑封装在一个异步函数中
const getPeople = async () => {
  try {
    const formattedPeople = await User.find();
    return formattedPeople.map((person) => ({
      _id: person._id.toString(),
      userName: person.userName || "",
      verified: person.verified || false,
      email: person.email || "",
      avatar: person.avatar || "",
      address: {
        street: person?.address?.street || "",
        city: person?.address?.city || "",
        zip: person?.address?.zip || "",
        location: {
          type: person?.address?.location?.type || "Point",
          coordinates: person?.address?.location?.coordinates || [0, 0],
        },
      },
      createdAt: person.createdAt ? person.createdAt.toISOString().split("T")[0] : "",
      updatedAt: person.updatedAt ? person.updatedAt.toISOString().split("T")[0] : "",
      cart: {
        items: person?.cart?.items || [],
        lastUpdated: person?.cart?.lastUpdated
          ? person.cart.lastUpdated.toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
      },
    }));
  } catch (err) {
    console.error("Error fetching users:", err);
    return [];
  }
};

// initialize people data
let people = [];

// middleware to initialize people data
router.use(async (req, res, next) => {
  try {
    people = await getPeople();
    next();
  } catch (err) {
    console.error("Error initializing people data:", err);
    next(err);
  }
});

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

// routers
router.get("/allproducts", async (req, res) => {
  try {
    const user = people.find((p) => p._id === req.user._id.toString());
    console.log("User found:", user);
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
  if (!req.user) {
    return res.status(401).send({ error: "Not logged in" });
  }
  try {
    const user = people.find((p) => p._id === req.user._id.toString());
    const userLocation = user?.address?.location?.coordinates;

    const products = await ProductModel.find({ ownerId: req.user._id });
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
  if (!req.user) {
    return res.status(401).send({ error: "Not logged in" });
  }
  try {
    const buyer = people.find((p) => p._id === req.user._id.toString());
    const buyerLocation = buyer?.address?.location?.coordinates;
    const currentDate = new Date().toISOString().split("T")[0];

    const newProduct = new ProductModel({
      ownerId: req.user._id,
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
    console.log("Accepting offer:", { productId, offerIndex });

    const product = await ProductModel.findById(productId);
    console.log("Found product:", product);

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
    console.error("Detailed error in accept-offer:", err);
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

    if (!product.status.offers || offerIndex >= product.status.offers.length) {
      return res.status(400).send({ error: "Invalid offer index" });
    }

    // Remove the denied offer from the offers array
    product.status.offers.splice(offerIndex, 1);
    const updatedProduct = await product.save();
    res.send(updatedProduct);
  } catch (err) {
    console.error("Error denying offer:", err);
    res.status(500).send({ error: "Error denying offer" });
  }
});

router.post("/address", async (req, res) => {
  if (!req.user) {
    return res.status(401).send({ error: "Not logged in" });
  }

  try {
    const { formatted_address, lat, lng } = req.body;
    console.log("Received address update:", { formatted_address, lat, lng });

    // Validate coordinates
    if (!lat || !lng || isNaN(lat) || isNaN(lng)) {
      return res.status(400).send({ error: "Invalid coordinates" });
    }

    const updateData = {
      "address.formatted_address": formatted_address,
      "address.location": {
        type: "Point",
        coordinates: [parseFloat(lng), parseFloat(lat)],
      },
      "address.updatedAt": new Date(),
    };

    // console.log("Update data:", updateData);
    // console.log("User ID:", req.user._id);

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      console.log("User not found:", req.user._id);
      return res.status(404).send({ error: "User not found" });
    }
    console.log("Updated user:", updatedUser);
    res.send(updatedUser.address);
  } catch (err) {
    console.error("Detailed error saving address:", err);
    console.error("Error stack:", err.stack);
    res.status(500).send({
      error: "Error saving address",
      details: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
});

router.get("/address", (req, res) => {
  if (!req.user) {
    return res.status(401).send({ error: "Not logged in" });
  }
  try {
    const userId = req.user._id; // Using the test user ID
    const user = people.find((p) => p._id === userId.toString());

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
  if (!req.user) {
    return res.status(401).send({ error: "Not logged in" });
  }
  try {
    console.log("Fetching cart for user:", req.user._id);

    // get user from database
    const user = await User.findById(req.user._id);
    console.log("User from database:", user);

    if (!user || !user.cart) {
      return res.send({ items: [] });
    }

    // get product details for each item in the cart
    const cartItems = await Promise.all(
      user.cart.items.map(async (item) => {
        const product = await ProductModel.findById(item.productId);
        console.log("Found product:", product);

        if (!product) {
          console.log("Product not found for id:", item.productId);
          return null;
        }

        // check if product status is accepted by current user
        const status =
          product.status?.isAccepted &&
          product.status?.acceptedBy.toString() === req.user._id.toString()
            ? "deal"
            : item.status;

        return {
          ...item.toObject(), // concert Mongoose document to plain JS object
          product: product.toObject(),
          status,
          priceChange: {
            hasChanged: item.priceChanged,
            difference: product.price - item.savedPrice,
          },
        };
      })
    );

    console.log("Processed cart items:", cartItems);

    const cartWithDetails = {
      items: cartItems.filter(Boolean),
      lastUpdated: user.cart.lastUpdated,
    };

    // update in-memory people array
    const memoryUser = people.find((p) => p._id === req.user._id.toString());
    if (memoryUser) {
      memoryUser.cart = cartWithDetails;
    }

    res.send(cartWithDetails);
  } catch (err) {
    console.error("Detailed error in /api/cart:", err);
    console.error("Error stack:", err.stack);
    res.status(500).send({
      error: "Error fetching cart data",
      details: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
});

// Add to cart with pending status
router.post("/cart/add", async (req, res) => {
  if (!req.user) {
    return res.status(401).send({ error: "Not logged in" });
  }
  try {
    const { productId } = req.body;
    console.log("Adding to cart:", { productId });
    const userId = req.user._id;

    const user = await User.findById(userId);
    const product = await ProductModel.findById(productId);

    if (!user || !product) {
      return res.status(404).send({ error: "User or product not found" });
    }

    if (!user.cart) {
      user.cart = { items: [] };
    }

    // check if item already in cart
    const existingItem = user.cart.items.find((item) => item.productId.toString() === productId);
    if (existingItem) {
      return res.status(400).send({ error: "Item already in cart" });
    }

    // add item to cart
    const cartItem = {
      productId,
      addedAt: new Date().toISOString(),
      savedPrice: product.price,
      currentPrice: product.price,
      priceChanged: false,
      status: "pending",
    };

    // update cart
    user.cart.items.push(cartItem);
    user.cart.lastUpdated = new Date().toISOString();

    // save
    const updatedUser = await user.save();
    console.log("Cart updated in database:", updatedUser.cart);

    // Update in-memory people array
    const memoryUser = people.find((p) => p._id === userId.toString());
    if (memoryUser) {
      memoryUser.cart = updatedUser.cart;
    }

    res.send(cartItem);
  } catch (err) {
    console.error("Detailed error adding to cart:", err);
    console.error("Error stack:", err.stack);
    res.status(500).send({
      error: "Error adding to cart",
      details: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
});

// Direct order with offer
router.post("/cart/order", async (req, res) => {
  if (!req.user) {
    return res.status(401).send({ error: "Not logged in" });
  }
  try {
    const { productId, price, message } = req.body;
    const userId = req.user._id;

    console.log("Processing order with data:", { productId, price, message, userId });

    // Get fresh data from database
    const user = await User.findById(userId);
    const product = await ProductModel.findById(productId);

    if (!user || !product) {
      console.log("Not found:", { user: !!user, product: !!product });
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

    // Update product status with proper validation
    const now = new Date().toISOString();
    const updatedStatus = {
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

    // Update product
    product.status = updatedStatus;
    const savedProduct = await product.save();
    console.log("Saved product:", savedProduct);

    // Update user's cart
    if (!user.cart) {
      user.cart = { items: [], lastUpdated: now };
    }

    const existingItemIndex = user.cart.items.findIndex(
      (item) => item.productId.toString() === productId.toString()
    );

    if (existingItemIndex !== -1) {
      user.cart.items[existingItemIndex] = cartItem;
    } else {
      user.cart.items.push(cartItem);
    }
    user.cart.lastUpdated = now;

    // Save user changes
    const savedUser = await user.save();
    console.log("Saved user cart:", savedUser.cart);

    // Update in-memory data
    const memoryUser = people.find((p) => p._id === userId.toString());
    if (memoryUser) {
      memoryUser.cart = savedUser.cart;
    }

    res.send({
      cartItem,
      product: savedProduct.toObject(),
      success: true,
    });
  } catch (err) {
    console.error("Detailed error processing order:", err);
    console.error("Error stack:", err.stack);
    res.status(500).send({
      error: "Error processing order",
      details: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
});

// Remove item from cart
router.post("/cart/remove", (req, res) => {
  if (!req.user) {
    return res.status(401).send({ error: "Not logged in" });
  }
  try {
    const { productId } = req.body;
    const userId = req.user._id;

    const user = people.find((p) => p._id === userId.toString());
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
  if (!req.user) {
    return res.status(401).send({ error: "Not logged in" });
  }
  try {
    const { productId, price, message } = req.body;
    const userId = req.user._id;

    const user = people.find((p) => p._id === userId.toString());
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
