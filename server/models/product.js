const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    ownerId: {
      type: Number,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    method: {
      type: String,
      required: true,
      enum: ["Pickup", "Delivery"],
    },
    dateby: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    distance: {
      type: Number,
      default: 0,
    },
    status: {
      isAccepted: {
        type: Boolean,
        default: false,
      },
      acceptedBy: {
        type: Number,
        default: null,
      },
      acceptedAt: {
        type: String,
        default: null,
      },
      offers: [
        {
          price: Number,
          message: String,
          createdAt: String,
          buyerId: Number,
          Accepted: Boolean,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

// create model
module.exports = mongoose.model("ProductModel", ProductSchema);
