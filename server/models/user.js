const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    googleId: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: true,
    },
    avatar: {
      type: String,
      default: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
    },
    address: {
      formatted_address: {
        type: String,
        required: false,
      },
      location: {
        type: {
          type: String,
          enum: ["Point"],
          default: "Point",
        },
        coordinates: {
          type: [Number],
          default: [0, 0],
        },
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
    },
    cart: {
      items: [
        {
          productId: String,
          addedAt: String,
          savedPrice: Number,
          currentPrice: Number,
          priceChanged: Boolean,
          status: {
            type: String,
            enum: ["pending", "negotiating", "deal"],
          },
          lastOfferAccepted: Boolean,
          acceptby: {
            type: String,
            default: "",
          },
        },
      ],
      lastUpdated: String,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure 2dsphere index is created
UserSchema.index({ "address.location": "2dsphere" });

// Add pre-save middleware for debugging
UserSchema.pre("save", function (next) {
  console.log("Saving user with address:", this.address);
  next();
});

module.exports = mongoose.model("User", UserSchema);
