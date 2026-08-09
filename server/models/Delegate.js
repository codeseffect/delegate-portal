const mongoose = require("mongoose");

const delegateSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    designation: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      default: "",
    },

    profileImage: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    summit: {
      type: String,
      required: true,
    },

    summitYear: {
      type: Number,
      required: true,
    },

    summitGroup: {
      type: String,
      default: "",
    },

    recognitions: [
  {
    category: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    certificateNumber: {
      type: String,
      default: "",
    },

    issuedDate: {
      type: Date,
    },

    image: {
      type: String,
      default: "",
    },
  },
],


  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Delegate", delegateSchema);