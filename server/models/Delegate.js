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

    certificates: [
      {
        title: String,
        certificateNumber: String,
        issuedDate: Date,
        image: String,
      },
    ],

   awards: [
  {
    title: String,
    certificateNumber: String,
    issuedDate: Date,
    image: String,
  },
],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Delegate", delegateSchema);