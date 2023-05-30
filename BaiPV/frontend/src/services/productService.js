import Axios from "axios";
const API = "http://localhost:8000/v1/product";

export class ProductService {
  getAllProduct() {
    return Axios.get(API);
  }
  addProduct(item, accessToken) {
    return Axios.post(API, item, {
      headers: { token: `vanson ${accessToken}` },
    });
  }
  getDetail(id) {
    return Axios.get(`${API}/${id}`);
  }
  updateProduct(id, item) {
    return Axios.put(`${API}/${id}`, item);
  }

  deleteProduct(id, accessToken) {
    return Axios.delete(`${API}/${id}`, {
      headers: { token: `vanson ${accessToken}` },
    });
  }
}
