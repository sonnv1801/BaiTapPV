import Swal from "sweetalert2";
import { createAction } from ".";
import { typeProduct } from "../../services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FETCH_TYPE_PRODUCT,
  START_LOADING,
  STOP_LOADING,
  ADD_TYPE,
  DELETE_TYPE,
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

export const getAllTypeProduct = () => {
  return (dispatch) => {
    dispatch(startLoading());
    typeProduct
      .getAllTypeProduct()
      .then((res) => {
        dispatch(createAction(FETCH_TYPE_PRODUCT, res.data));
        dispatch(stopLoading());
      })
      .catch((err) => {
        console.log(err);
        dispatch(stopLoading());
      });
  };
};

export const addType = (type, accessToken) => {
  return (dispatch) => {
    typeProduct
      .addType(type, accessToken)
      .then((res) => {
        console.log(res.data);
        dispatch(createAction(ADD_TYPE, res.data));
        toast.success("Thêm thành công!", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteType = (id, accessToken) => {
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
          typeProduct.deleteType(id, accessToken).then((res) => {
            dispatch(createAction(DELETE_TYPE, res.data));
            dispatch(getAllTypeProduct());
            dispatch(stopLoading());
          });
          toast.success("Xóa thành công!", {
            position: toast.POSITION.TOP_CENTER,
          });
          dispatch(stopLoading());
        }
      })
      .catch((err) => console.log(err));
  };
};
