import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./style.css";
import numeral from "numeral";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  buyProduct,
  deleteCart,
  numberQuantity,
} from "../../redux/actions/product.action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Cart() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const cart = useSelector((state) => state.defaultReducer.cart);

  console.log(cart);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("token"));
  const dispatch = useDispatch();
  const renderQuantity = () => {
    return cart.reduce((sum, item) => {
      return (sum += item.quantity_cart);
    }, 0);
  };

  const renderAmount = () => {
    return cart.reduce((total, item) => {
      return (total += item.newPrice * item.quantity_cart);
    }, 0);
  };

  const handleBuyNow = () => {
    if (user === null) {
      navigate("/login");
      setOpen(false);
    } else {
      dispatch(buyProduct());
      navigate("/payment");
      setOpen(false);
    }
  };
  return (
    <div className="carts-nav">
      <Button
        onClick={handleOpen}
        style={{ margin: "0.5rem 0", background: "none", color: "white" }}
      >
        Giỏ Hàng {`(${renderQuantity()})`}
      </Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box
          sx={style}
          style={{
            width: "90%",
            height: "auto",
            border: "none",
            borderRadius: "5px",
            overflow: "scroll",
            height: "500px",
          }}
          id="container-carts"
        >
          <Typography
            id="keep-mounted-modal-title"
            variant="h6"
            component="h2"
            style={{
              textAlign: "center",
              color: "red",
              textTransform: "uppercase",
            }}
          >
            Giỏ Hàng Của Bạn!
          </Typography>
          {cart.length === 0 ? (
            <div id="cart-empty">
              <img
                src="https://hoanghamobile.com/Content/web/content-icon/no-item.png"
                alt="..."
              />
              <b>Hiện chưa có sản phẩm nào</b>
            </div>
          ) : (
            <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
              {cart.map((item, index) => (
                <div className="row" id="cart-container">
                  <div className="col-2">
                    <div className="cart-image">
                      <img src={item.image} alt={item.title} />
                    </div>
                  </div>
                  <div className="col-2">
                    <p>Tên: {item.title}</p>
                    <p>Kích thước: {`${item.size}`}</p>
                    <p>Màu sắc: {`${item.color}`}</p>
                  </div>
                  <div className="col-2">
                    <div className="quantity-cart-nav">
                      <button
                        onClick={() => {
                          dispatch(numberQuantity(item, false));
                        }}
                      >
                        -
                      </button>
                      <input type="text" value={item.quantity_cart} />
                      <button
                        onClick={() => {
                          dispatch(numberQuantity(item, true));
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="col-2">
                    <p>Giá: {`${numeral(item.newPrice).format("0,0")}đ`}</p>
                  </div>
                  <div className="col-2">
                    <p className="sum-carts">
                      {`${numeral(item.newPrice * item.quantity_cart).format(
                        "0,0"
                      )}đ`}
                    </p>
                  </div>
                  <div className="col-2">
                    <span style={{ float: "right" }}>
                      <DeleteIcon
                        style={{ color: "red" }}
                        onClick={() => {
                          dispatch(deleteCart(item));
                        }}
                      />
                    </span>
                  </div>
                </div>
              ))}
              <div className="row" id="sub-cart-nav">
                <div className="col-6">
                  <p></p>
                </div>
                <div className="col-6">
                  <p>
                    <span>Tổng Tiền:</span>
                    {`${renderAmount().toLocaleString()}đ`}
                  </p>
                  <p>
                    <button type="submit" id="btn-pay" onClick={handleBuyNow}>
                      Thanh Toán Ngay
                    </button>
                  </p>
                </div>
              </div>
            </Typography>
          )}
        </Box>
      </Modal>
    </div>
  );
}
