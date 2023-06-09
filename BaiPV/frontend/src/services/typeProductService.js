import Axios from "axios";
const API = "http://localhost:8000/v1/typeProduct";

export class TypeProduct {
  getAllTypeProduct() {
    return Axios.get(API);
  }
  addType(type, accessToken) {
    return Axios.post(API, type, {
      headers: { token: `vanson ${accessToken}` },
    });
  }
  deleteType(id, accessToken) {
    return Axios.delete(`${API}/${id}`, {
      headers: { token: `vanson ${accessToken}` },
    });
  }
}
