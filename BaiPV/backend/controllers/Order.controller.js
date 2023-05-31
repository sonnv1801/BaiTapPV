const Order = require("../models/Order");
const Product = require("../models/Product");
const twilio = require("twilio");
const accountSid = "AC1b8353f16e5637165404ec4e0c879c74";
const authToken = "8547deaef6e194a16779390cd376fcb2";
const client = twilio(accountSid, authToken);

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

  // createOrderAndSendSms: async (req, res) => {
  //   try {
  //     const { customer, products, total, phoneNumber, message } = req.body;

  //     // Tạo đơn hàng
  //     const order = new Order({ customer, products, total });
  //     await order.save();

  //     // Gửi tin nhắn SMS
  //     client.messages
  //       .create({
  //         body: message,
  //         from: "+13159155708",
  //         to: phoneNumber,
  //       })
  //       .then((message) => {
  //         console.log(message.sid);
  //         res
  //           .status(201)
  //           .json({
  //             order,
  //             message: "Order created and SMS sent successfully",
  //           });
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         res.status(500).json({ message: "Failed to send SMS" });
  //       });
  //   } catch (error) {
  //     res.status(500).json({ message: "Failed to create order." });
  //   }
  // },

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

  sendSms: async (req, res) => {
    const { phoneNumber, message } = req.body;
    client.messages
      .create({
        body: message,
        from: "+13159155708",
        to: phoneNumber,
      })
      .then((message) => {
        console.log(message.sid);
        res.send("SMS sent successfully");
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send("Failed to send SMS");
      });
  },
};

module.exports = orderCotroller;
