import axios from 'axios';

const axiosInstent = axios.create({
  baseURL: 'http://localhost:8080/api',
});

const pathApi = {
  categories: '/categories',
  products: '/books',
  topGoodPrice: '/books/top-good-price',
  bookPageNum: '/books/pages-number',
  admin: '/admin',
  user: '/users',
  topUserBuyTheMost: '/users/top-buy-the-most',
  cart: '/carts',
  order: '/orders',
  statistical: 'orders/statistical',
  orderDetail: '/order-details',
  topBestSelling: '/order-details/top-best-selling',
  payment: '/payment/create-payment',
};

export default axiosInstent;
export { pathApi };
