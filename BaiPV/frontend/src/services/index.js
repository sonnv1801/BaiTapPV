import { OrderService } from "./orderService";
import { ProductService } from "./productService";
import { TypeProduct } from "./typeProductService";
import { UserService } from "./useService";

export const userService = new UserService();
export const productSevice = new ProductService();
export const typeProduct = new TypeProduct();
export const orderSevice = new OrderService();
