import Swal from "sweetalert2";
import { createAction } from ".";
import { productSevice } from "../../services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ADD_CART,
  ADD_PRODUCT,
  BUY_PRODUCT,
  DELETE_CART,
  DELETE_PRODUCT,
  FETCH_DETAIL,
  FETCH_PRODUCT,
  NUMBER_QUANTITY,
  SEARCH_PRODUCT,
  START_LOADING,
  STOP_LOADING,
  UPDATE_PRODUCT,
} from "../type/types";

export const startLoading = () => {
  return {
    type: START_LOADING,
  };
};

export const stopLoading = () => {
  return {
    type: STOP_LOADING,
  };
};

export const getProduct = () => {
  return (dispatch) => {
    dispatch(startLoading());
    productSevice
      .getAllProduct()
      .then((res) => {
        dispatch(createAction(FETCH_PRODUCT, res.data));
        dispatch(stopLoading());
      })
      .catch((err) => {
        console.log(err);
        dispatch(stopLoading());
      });
  };
};
export const addProduct = (item, accessToken) => {
  return (dispatch) => {
    productSevice
      .addProduct(item, accessToken)
      .then((res) => {
        dispatch(createAction(ADD_PRODUCT, res.data));
        toast.success("Thêm thành công sản phẩm!", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const getDetail = (id) => {
  return (dispatch) => {
    dispatch(startLoading());
    productSevice
      .getDetail(id)
      .then((res) => {
        dispatch(createAction(FETCH_DETAIL, res.data));
        dispatch(stopLoading());
      })
      .catch((err) => {
        console.log(err);
        dispatch(stopLoading());
      });
  };
};

export const addCart = (product, color, size) => {
  const productCart = {
    id: product.id,
    title: product.title,
    image: product.image,
    newPrice: product.newPrice,
    quantity_cart: 1,
    color: color,
    size: size,
  };

  return async (dispatch) => {
    try {
      await dispatch(createAction(ADD_CART, productCart));
      toast.success("Thêm thành công sản phẩm", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      toast.error("Thêm sản phẩm thất bại!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
};

export const numberQuantity = (product, status) => {
  return (dispatch) => {
    dispatch(createAction(NUMBER_QUANTITY, { product, status }));
  };
};

export const buyProduct = (navigate) => {
  return (dispatch) => {
    dispatch(createAction(BUY_PRODUCT));
  };
};

export const searchProduct = (keyword) => {
  return (dispatch) => {
    dispatch(createAction(SEARCH_PRODUCT, keyword));
    console.log(keyword);
  };
};

export const updateProduct = (id, item, navigate) => {
  return (dispatch) => {
    productSevice
      .updateProduct(id, item, navigate)
      .then((res) => {
        dispatch(createAction(UPDATE_PRODUCT, res.data));
        dispatch(getProduct());
        toast.success("Cập nhập thành công sản phẩm!", {
          position: toast.POSITION.TOP_CENTER,
        });
        setTimeout(() => {
          navigate("/create-prd");
        }, 1000);
      })
      .catch((err) => console.log(err));
  };
};

export const deleteProduct = (id, accessToken) => {
  return (dispatch) => {
    Swal.fire({
      title: "Bạn chắc chưa?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "OK !",
    })
      .then((result) => {
        if (result.isConfirmed) {
          productSevice.deleteProduct(id, accessToken).then((res) => {
            dispatch(createAction(DELETE_PRODUCT, res.data));
            dispatch(getProduct());
          });
          toast.success("Xóa thành công sản phẩm", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteCart = (product) => {
  return (dispatch) => {
    dispatch(createAction(DELETE_CART, product));
  };
};
