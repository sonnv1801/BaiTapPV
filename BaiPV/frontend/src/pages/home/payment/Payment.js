import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import "./style.css";
import QRCode from "qrcode.react";
import Form from "react-bootstrap/Form";
import numeral from "numeral";
import { useNavigate, useParams } from "react-router-dom";
import { createOrder } from "../../../redux/actions/order.action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("token"));
  const cart = JSON.parse(localStorage.getItem("carts"));
  const [order, setOrder] = useState(null);

  const datacart = JSON.stringify(cart);

  const renderAmount = () => {
    return cart?.reduce((total, item) => {
      return (total += item.newPrice * item.quantity_cart);
    }, 0);
  };

  const [data, setData] = useState({
    email: "",
    fullname: "",
    phone: "",
    address: "",
    notes: "",
  });

  const handleChange = (name) => (e) => {
    let value = name === "image" ? e.target.files[0] : e.target.value;
    if (name === "phone" && value.startsWith("0")) {
      value = "+84" + value.slice(1);
    }

    setData({ ...data, [name]: value });
  };

  console.log(data.email);
  const handleCheckout = async () => {
    try {
      if (data.fullname === "" && data.phone === "" && data.address === "") {
        toast.warning("Nhập đầy đủ!", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        const cartItems = JSON.parse(localStorage.getItem("carts")) || [];
        const customer = JSON.parse(localStorage.getItem("token")) || [];
        const order = {
          customer: {
            customerId: customer?._id,
            fullname: data?.fullname,
            phone: data?.phone,
            email: data?.email,
            address: data?.address,
            notes: data?.notes,
          },
          products: cartItems?.map((item) => ({
            productId: item?.id,
            title: item?.title,
            newPrice: item?.newPrice,
            color: item?.color,
            size: item?.size,
            quantity: item?.quantity_cart,
          })),
          total: cartItems?.reduce(
            (total, item) => total + item.newPrice * item?.quantity_cart,
            0
          ),
        };
        const response = dispatch(
          createOrder(
            order,
            customer?.accessToken,
            navigate,
            customer?.phone,
            `Cảm ơn khách hàng ${
              order?.customer?.fullname
            } đã đặt một đơn hàng mới thành công! Với giá trị ${numeral(
              order?.total
            ).format("0,0")}đ. Xin Chân Thành Cảm Ơn`
          )
        );

        localStorage.removeItem("carts");
        setOrder(response.customer);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <div className="body-payment">
            <h1>Thanh Toán</h1>
          </div>
          <div className="body-left-payment">
            <div className="body-payment">
              <div className="infomation-users">
                <Form.Group className="formgroup-body">
                  <Form.Label>Email: </Form.Label>
                  <Form.Control
                    type="email"
                    required
                    onChange={handleChange("email")}
                  />
                  <Form.Label>Họ và tên:* </Form.Label>
                  <Form.Control
                    type="text"
                    required
                    onChange={handleChange("fullname")}
                  />
                  <Form.Label>Số điện thoại:* </Form.Label>
                  <Form.Control
                    type="number"
                    required
                    onChange={handleChange("phone")}
                  />

                  <Form.Label>Địa chỉ:* </Form.Label>
                  <Form.Control
                    type="text"
                    required
                    onChange={handleChange("address")}
                  />
                  <Form.Label>Ghi Chú: </Form.Label>
                  <Form.Control type="text" onChange={handleChange("notes")} />
                </Form.Group>
              </div>
            </div>
          </div>
          <div className="body-payment">
            <h1>Thông tin đơn hàng - QRCode</h1>
          </div>
          <div className="tt-dh">
            <QRCode value={datacart} />
          </div>
        </div>
        <div className="col-6">
          <div className="carts-nav">
            <div
              keepMounted
              aria-labelledby="keep-mounted-modal-title"
              aria-describedby="keep-mounted-modal-description"
            >
              <div id="container-carts-payment">
                <div className="body-payment">
                  <h1>Sản phẩm đã mua</h1>
                </div>
                {cart?.length === 0 ? (
                  <div id="cart-empty">
                    <img
                      src="https://hoanghamobile.com/Content/web/content-icon/no-item.png"
                      alt="..."
                    />
                    <b>Hiện chưa có sản phẩm nào</b>
                  </div>
                ) : (
                  <div id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                    {cart?.map((item, index) => (
                      <div className="row" id="cart-container">
                        <div className="col-3">
                          <div className="cart-image">
                            <img src={item.image} alt={item.title} />
                          </div>
                        </div>
                        <div
                          className="col-3"
                          style={{
                            color: "#193a74",
                            fontSize: "15px",
                            fontWeight: "400",
                          }}
                        >
                          <p>{item.title}</p>
                          <p>{`${item.size}`}</p>
                          <p>{`${item.color}`}</p>
                          <p>X{`${item.quantity_cart}`}</p>
                        </div>

                        <div className="col-3">
                          <p>{`${numeral(item.newPrice).format("0,0")}đ`}</p>
                        </div>
                        <div className="col-3">
                          <p className="sum-carts">
                            {`${numeral(
                              item.newPrice * item.quantity_cart
                            ).format("0,0")}đ`}
                          </p>
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
                          {`${renderAmount()?.toLocaleString()}đ`}
                        </p>
                        <p></p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <Button
                variant="contained"
                onClick={handleCheckout}
                style={{
                  float: "right",
                  marginTop: "1rem",
                  marginBottom: "2rem",
                }}
              >
                Xác nhận đơn hàng
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
