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
};

export default axiosInstent;
export { pathApi };
