import React from "react";
import { HeaderOrder } from "./HeaderOrder/HeaderOrder";
import "./style.css";
export const Order = () => {
  return (
    <>
      <div className="order-page">
        <div className="row">
          {/* <div className="col-5">
            <Advertisement />
          </div> */}
          <div className="col-12">
            <div className="oder-order">
              <p className="title-order">Hóa đơn của bạn</p>
              <div className="order-container">
                {/* <HeaderPayment /> */}
                <HeaderOrder />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
