const Order = require("../models/Order");
const Product = require("../models/Product");

const orderCotroller = {
  getOrder: async (req, res) => {
    try {
      Order.find({})
        .sort({ createdAt: -1 })
        .exec((err, orders) => {
          if (err) {
            res.status(500).json(err);
          }
          res.status(200).json(orders);
        });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  createOrder: async (req, res) => {
    try {
      const { customer, products, total } = req.body;
      const order = new Order({ customer, products, total });
      await order.save();
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ message: "Failed to create order." });
    }
  },

  deleteOrder: async (req, res) => {
    try {
      Order.findByIdAndRemove(req.params.id, (err, orders) => {
        if (err) {
          res.status(404).json("Can't find Id");
        } else {
          res.status(200).json("Delete order successfully");
        }
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = orderCotroller;
