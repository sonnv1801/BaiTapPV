import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ADD_CART,
  ADD_PRODUCT,
  ADD_TYPE,
  BUY_PRODUCT,
  DELETE_CART,
  DELETE_ORDER,
  DELETE_PRODUCT,
  DELETE_TYPE,
  FETCH_DETAIL,
  FETCH_ORDER,
  FETCH_PRODUCT,
  FETCH_TYPE_PRODUCT,
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  NUMBER_QUANTITY,
  SEARCH_PRODUCT,
  START_LOADING,
  STOP_LOADING,
} from "../type/types";
const initialState = {
  login: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  logout: {
    isFetching: false,
    error: false,
  },

  listProduct: [],
  listOrder: [],
  listType: [],
  cart: [],
  productDetail: null,
  search: [],
};

const defaultReducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case LOGIN_START: {
      state.login.isFetching = true;
      return { ...state };
    }
    case LOGIN_SUCCESS: {
      state.login.isFetching = false;
      state.login.currentUser = payload;
      state.login.error = false;
      return { ...state };
    }
    case LOGIN_FAILED: {
      state.login.isFetching = false;
      state.login.error = true;
      return { ...state };
    }

    case FETCH_PRODUCT: {
      state.listProduct = payload;
      return { ...state };
    }

    case ADD_PRODUCT: {
      let updateList = [...state.listProduct];
      updateList.push(payload);
      state.listProduct = updateList;
      return { ...state };
    }

    case FETCH_DETAIL: {
      state.productDetail = payload;
      return { ...state };
    }

    case ADD_CART: {
      let cart = [...state.cart];
      const index = cart.findIndex((cart) => {
        return (
          cart.id === action.payload.id &&
          cart.color === action.payload.color &&
          cart.size === action.payload.size
        );
      });

      if (index !== -1) {
        cart[index].quantity_cart += 1;
        // Swal.fire("Đã thêm một sản phẩm trùng tên vào giỏ!", "success");
      } else {
        cart = [...cart, action.payload];
        // Swal.fire("Sản phẩm đã được thêm vào giỏ!", "success");
      }

      state.cart = cart;
      localStorage.setItem("carts", JSON.stringify(cart));
      return { ...state };
    }

    case NUMBER_QUANTITY: {
      let { status, product } = payload;
      let cart = [...state.cart];
      const index = cart.findIndex((cart) => {
        return (
          cart.id === product.id &&
          cart.color === product.color &&
          cart.size === product.size
        );
      });
      if (index !== -1) {
        if (status) {
          cart[index].quantity_cart += 1;
        } else {
          if (cart[index].quantity_cart > 1) {
            cart[index].quantity_cart -= 1;
          } else {
            cart.splice(cart[index], 1);
          }
        }
      }
      state.cart = cart;
      localStorage.setItem("carts", JSON.stringify(cart));
      return { ...state };
    }

    case BUY_PRODUCT: {
      // if (state.login.currentUser === null) {
      //   Swal.fire('Đăng Nhập Đi!!!!', 'error');
      // } else {
      state.cart = [];
      // Swal.fire('Buy successfully!', '', 'success');
      // }
      return { ...state };
    }

    case SEARCH_PRODUCT: {
      const key = payload;
      state.selected = key;
      if (key === "") {
        state.search = [];
      } else {
        const update = state.listProduct.filter(
          (product) =>
            product.title.toLowerCase().indexOf(key.toLowerCase()) !== -1
        );
        state.search = update;
      }

      return { ...state };
    }

    case FETCH_TYPE_PRODUCT: {
      state.listType = payload;
      return { ...state }; //setState
    }

    case ADD_TYPE: {
      let updateList = [...state.listType];
      updateList.push(payload);
      state.listType = updateList;
      return { ...state };
    }
    case DELETE_TYPE: {
      let updateList = [...state.listType];
      let index = updateList.findIndex((type) => type.id === action.id);
      if (index === -1) {
        updateList.splice(payload, index);
        state.listType = updateList;
      }

      return { ...state };
    }

    case DELETE_PRODUCT: {
      let updateList = [...state.listProduct];
      let index = updateList.findIndex((product) => product.id === action.id);
      if (index === -1) {
        updateList.splice(payload, index);
        state.listProduct = updateList;
      }

      return { ...state };
    }

    case FETCH_ORDER: {
      state.listOrder = payload;
      return { ...state }; //setState
    }

    case DELETE_ORDER: {
      let updateList = [...state.listOrder];
      let index = updateList.findIndex((order) => order.id === action.id);
      if (index === -1) {
        updateList.splice(payload, index);
        state.listOrder = updateList;
      }
      return { ...state };
    }

    case DELETE_CART: {
      let cart = [...state.cart];
      const index = cart.findIndex((cart) => {
        return cart.id === payload.id;
      });
      if (index !== -1) {
        cart.splice(cart[index], 1);
      }
      state.cart = cart;
      localStorage.setItem("carts", JSON.stringify(cart));
      return { ...state };
    }
    case START_LOADING: {
      state.isLoading = true;
      return { ...state };
    }

    case STOP_LOADING: {
      state.isLoading = false;
      return { ...state };
    }

    default:
      return state;
  }
};

export default defaultReducer;
