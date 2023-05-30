const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer: {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullname: {
      type: String,
      required: true,
      default: "Khách Hàng Ẩn Tên",
    },
    phone: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      default: "Tạm thời không có ghi chú cho đơn này",
    },
  },
  products: {
    type: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        title: {
          type: String,
          require: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        newPrice: {
          type: Number,
          require: true,
        },
        color: { type: String, required: true },
        size: { type: String, required: true },
      },
    ],
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Order", orderSchema);
