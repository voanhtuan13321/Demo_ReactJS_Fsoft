import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import axiosInstent, { pathApi } from '~/config/axiosCustom';

const link = {
  facebook: 'https://www.facebook.com',
  instagram: 'https://www.instagram.com/',
  linkedin: 'https://www.linkedin.com/',
};

const text = {
  logo: 'TuanVA28',
  email: 'voanhtuan13321@gmail.com',
  phone: '0332978426',
  address: '123 Lê Độ, Đà Nẵng',
};

const formatPrice = (price) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

const handleAddProductToCart = async (idUser, book, quantity = 1) => {
  const dataCart = {
    userId: idUser,
    bookId: book.bookId,
    quantity,
  };

  const response = await axiosInstent.post(pathApi.cart, dataCart);
  const status = await response.data;
  // console.log(status);
};

export { link, text, formatPrice, handleAddProductToCart };
