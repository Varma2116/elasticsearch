const mongoose = require("mongoose");

const BaseEntitySchema = new mongoose.Schema(
  {
    createdDate: {
      type: Number, // Using `Long` equivalent in Java
      default: () => Date.now(),
    },
    lastModifiedDate: {
      type: Number,
      default: () => Date.now(),
    },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'lastModifiedDate' }, // Automatically handle createdDate and lastModifiedDate
  }
);

module.exports = BaseEntitySchema;
