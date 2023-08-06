import axios from 'axios';

const axiosInstent = axios.create({
  baseURL: 'http://localhost:8080/api',
});

const pathApi = {
  categories: '/categories',
  products: '/books',
  admin: '/admin',
  user: '/users',
  cart: '/carts',
  payment: '/payment/create-payment',
  order: '/orders',
  orderDetail: '/order-details',
};

export default axiosInstent;
export { pathApi };
