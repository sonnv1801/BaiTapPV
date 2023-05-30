import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/home/login/Login";
import { Homepage } from "./pages/home/homepage/Homepage";
import { Payment } from "./pages/home/payment/Payment";
import NavBar from "./components/navbar/NavBar";
import { ProductDetail } from "./pages/home/productdetail/ProductDetail";
import ProductAdmin from "./pages/admin/productadmin/ProductAdmin";
import TypeAdmin from "./pages/admin/typeadmin/TypeAdmin";
import EditProduct from "./pages/admin/updateProducts/EditProduct";
import { Order } from "./pages/home/order/Order";

function App() {
  const user = JSON.parse(localStorage.getItem("token"));
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />

          <Route path="/order" element={<Order />} />
          {user?.role === true ? (
            <>
              <Route path="/create-prd" element={<ProductAdmin />} />
              <Route path="/update-prd/:id" element={<EditProduct />} />
              <Route path="/type-prd" element={<TypeAdmin />} />
            </>
          ) : (
            <>
              <Route path="*" element={"Not Found"} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
