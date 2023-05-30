import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import "./style.css";
import QRCode from "qrcode.react";

import numeral from "numeral";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { createOrder } from "../../../redux/actions/order.action";
export const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("token"));
  const cart = JSON.parse(localStorage.getItem("carts"));
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  const data = JSON.stringify(cart);

  const renderQuantity = () => {
    return cart?.reduce((sum, item) => {
      return (sum += item.quantity_cart);
    }, 0);
  };

  const renderAmount = () => {
    return cart?.reduce((total, item) => {
      return (total += item.newPrice * item.quantity_cart);
    }, 0);
  };

  const handleCheckout = async () => {
    try {
      // if (user.fullname === "" && user.phone === "" && user.address === "") {
      //   Swal.fire("Nhập Đầy Đủ Thông Tin?", "error");
      // } else {
      const cartItems = JSON.parse(localStorage.getItem("carts")) || [];
      const customer = JSON.parse(localStorage.getItem("token")) || [];
      const order = {
        customer: {
          customerId: customer?._id,
          fullname: customer?.fullname,
          phone: customer?.phone,
          email: customer?.email,
          address: customer?.address,
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
        createOrder(order, customer?.accessToken, navigate)
      );
      localStorage.removeItem("carts");
      // console.log(response);
      setOrder(response.customer);
    } catch (error) {
      console.log(error);
    }

    // navigate('/');
    // }
  };

  return (
    <div className="container">
      <div className="body-payment">
        <h1>Thanh Toán</h1>
      </div>
      <div className="row">
        <div className="col-6">
          <p className="tt-kh">Thông tin khách hàng</p>
          <div className="row">
            <div className="col-6">
              <h4>Khách hàng</h4>
            </div>
            <div className="col-6">
              <h4>{user.fullname}</h4>
            </div>
            <div className="col-6">
              <h4>Địa chỉ</h4>
            </div>
            <div className="col-6">
              <h4>{user.address}</h4>
            </div>
            <div className="col-6">
              <h4>Email</h4>
            </div>
            <div className="col-6">
              <h4>{user.email}</h4>
            </div>
            <div className="col-6">
              <h4>Số điện thoại</h4>
            </div>
            <div className="col-6">
              <h4>{user.phone}</h4>
            </div>
          </div>
          <p className="title-ttdh">Thông tin đơn hàng</p>
          <div className="tt-dh">
            <QRCode value={data} />
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
                <div
                  id="keep-mounted-modal-title"
                  variant="h6"
                  component="h2"
                  style={{
                    textAlign: "center",
                    color: "red",
                    textTransform: "uppercase",
                  }}
                >
                  Sản phẩm đã mua
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
