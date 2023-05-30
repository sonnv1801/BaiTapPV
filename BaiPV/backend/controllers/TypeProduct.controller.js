const TypeProduct = require("../models/TypeProduct");

const typeProduct = {
  getAllType: async (req, res) => {
    try {
      TypeProduct.find({}, (err, types) => {
        if (err) {
          res.status(500).json(err);
        }
        res.status(200).json(types);
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  createType: async (req, res) => {
    try {
      const newType = await new TypeProduct({
        name: req.body.name,
      });
      const type = await newType.save();
      res.status(200).json(type);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteType: async (req, res) => {
    try {
      TypeProduct.findByIdAndRemove(req.params.id, (err, type) => {
        if (err) {
          res.status(404).json("Can't find Id");
        } else {
          res.status(200).json("Delete product type successfully");
        }
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = typeProduct;
