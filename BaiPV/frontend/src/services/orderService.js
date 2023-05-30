import Axios from "axios";
const API = "http://localhost:8000/v1/order";

export class OrderService {
  create(item, accessToken) {
    return Axios.post(API, item, {
      headers: { token: `vanson ${accessToken}` },
    });
  }
  getAllOrder() {
    return Axios.get(API);
  }
  deleteOrder(id, accessToken) {
    return Axios.delete(`${API}/${id}`, {
      headers: { token: `vanson ${accessToken}` },
    });
  }
}
