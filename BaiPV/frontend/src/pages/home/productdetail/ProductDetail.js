import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import "./style.css";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCart, getDetail } from "../../../redux/actions/product.action";
import Swal from "sweetalert2";
import numeral from "numeral";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ProductDetail = () => {
  const location = useLocation();

  const [selectColor, setSelectColor] = useState("");
  const [selectSize, setSelectSize] = useState("");
  const dispatch = useDispatch();
  console.log(selectColor);
  console.log(selectSize);
  const id = location.pathname.split("/")[2];
  const productDetail = useSelector(
    (state) => state.defaultReducer.productDetail
  );

  const handleAddCart = (e) => {
    const newCart = {
      id: productDetail?._id,
      title: productDetail?.title,
      image: productDetail?.image,
      newPrice: productDetail?.newPrice,
      quantity_cart: 1,
    };
    e.preventDefault();
    if (selectColor && selectSize) {
      dispatch(addCart(newCart, selectColor, selectSize));
    } else {
      toast.warning("Nhập đầy đủ!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  useEffect(() => {
    dispatch(getDetail(id));
  }, []);

  return (
    <div className="container main-prd-dt">
      <div className="row">
        <div className="col-3">
          <div className="img-prd">
            <img src={productDetail?.image} alt="prd" />
          </div>
        </div>
        <div className="col-9">
          <div className="body-prd">
            <h1>{productDetail?.title}</h1>
            <p style={{ fontSize: "20px" }}>{`${numeral(
              productDetail?.newPrice
            ).format("0,0")}đ`}</p>
            <del style={{ color: "red", fontSize: "20px" }}>{`${numeral(
              productDetail?.oldPrice
            ).format("0,0")}đ`}</del>
            <p
              style={{ color: "black", fontSize: "20px", textAlign: "justify" }}
            >
              {productDetail?.description}
            </p>
            <select
              class="form-select"
              aria-label="Default select example"
              onChange={(e) => setSelectColor(e.target.value)}
            >
              <option selected>Chọn Màu</option>
              {productDetail?.colors?.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <select
              class="form-select"
              aria-label="Default select example"
              onChange={(e) => setSelectSize(e.target.value)}
            >
              <option selected>Chọn kích thước</option>
              {productDetail?.size?.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <Button variant="contained" onClick={handleAddCart}>
              Thêm vào giỏ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
