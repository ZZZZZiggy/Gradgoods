const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
    },
    address: {
      street: String,
      city: String,
      zip: String,
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
    },
    cart: {
      items: [
        {
          productId: Number,
          addedAt: String,
          savedPrice: Number,
          currentPrice: Number,
          priceChanged: Boolean,
          status: {
            type: String,
            enum: ["pending", "negotiating", "deal"],
          },
          lastOfferAccepted: Boolean,
        },
      ],
      lastUpdated: String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.index({ "address.location": "2dsphere" });

module.exports = mongoose.model("User", UserSchema);
