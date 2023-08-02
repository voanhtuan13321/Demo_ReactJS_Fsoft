import axios from 'axios';

const axiosInstent = axios.create({
  baseURL: 'http://localhost:8080/api',
});

const path = {
  categories: '/categories',
  products: '/books',
};

export default axiosInstent;
export { path };
