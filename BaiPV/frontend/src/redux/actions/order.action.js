import Swal from "sweetalert2";
import { orderSevice } from "../../services";
import { createAction } from ".";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  CREATE_ORDER,
  DELETE_ORDER,
  FETCH_ORDER,
  START_LOADING,
  STOP_LOADING,
} from "../type/types";
import axios from "axios";

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
// export const createOrder = (item, accessToken, navigate) => {
//   return (dispatch) => {
//     Swal.fire({
//       title: "Bạn chắc xác nhận đơn hàng?",
//       text: "",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "OK !",
//     })
//       .then((result) => {
//         if (result.isConfirmed) {
//           orderSevice.create(item, accessToken).then((res) => {
//             dispatch(createAction(CREATE_ORDER, res.data));
//           });

//           toast.success("Đơn hàng đã được xác nhận!", {
//             position: toast.POSITION.TOP_CENTER,
//           });
//           setTimeout(() => {
//             navigate("/order");
//           }, 1000);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// };

export const createOrder = (
  item,
  accessToken,
  navigate,
  phoneNumber,
  message
) => {
  return (dispatch) => {
    Swal.fire({
      title: "Bạn chắc chắn xác nhận đơn hàng?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "OK !",
    })
      .then((result) => {
        if (result.isConfirmed) {
          orderSevice
            .create(item, accessToken)
            .then((res) => {
              dispatch(createAction(CREATE_ORDER, res.data));

              // Gửi tin nhắn SMS
              // const { phoneNumber, message } = res.data;
              axios
                .post("http://localhost:8000/v1/order/send-sms", {
                  phoneNumber,
                  message,
                })
                .then((response) => {
                  console.log(response.data);
                  toast.success(
                    "Đơn hàng đã được xác nhận và SMS đã được gửi!",
                    {
                      position: toast.POSITION.TOP_CENTER,
                    }
                  );
                  setTimeout(() => {
                    navigate("/order");
                  }, 1000);
                })
                .catch((error) => {
                  console.log(error);
                  toast.error(
                    "Đơn hàng đã được xác nhận, nhưng gửi SMS thất bại!",
                    {
                      position: toast.POSITION.TOP_CENTER,
                    }
                  );
                  setTimeout(() => {
                    navigate("/order");
                  }, 1000);
                });
            })
            .catch((error) => {
              console.log(error);
              toast.error(
                "Đơn hàng đã được xác nhận, nhưng có lỗi xảy ra khi tạo đơn hàng!",
                {
                  position: toast.POSITION.TOP_CENTER,
                }
              );
              setTimeout(() => {
                navigate("/order");
              }, 1000);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const getOrder = () => {
  return (dispatch) => {
    dispatch(startLoading());
    orderSevice
      .getAllOrder()
      .then((res) => {
        dispatch(createAction(FETCH_ORDER, res.data));
        dispatch(stopLoading());
      })
      .catch((err) => {
        dispatch(stopLoading());
      });
  };
};

export const deleteOrder = (id, accessToken) => {
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
          orderSevice.deleteOrder(id, accessToken).then((res) => {
            dispatch(createAction(DELETE_ORDER, res.data));
            dispatch(getOrder());
          });
          toast.success("Xóa thành công!", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
