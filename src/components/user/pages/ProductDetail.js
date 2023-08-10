import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

import { formatPrice, handleAddProductToCart } from '../../../common/properties';
import { path } from '../../../router/router';
import axiosInstent, { pathApi } from '../../../config/axiosCustom';

export default function ProductDetail() {
  const [book, setBook] = useState({});
  const [soLuong, setSoLuong] = useState(1);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    window.document.title = 'Product Detail';
    window.scrollTo(0, 0);

    if (id) {
      getBooksFromApi(id);
      // console.log(book);
    }
  }, [id]);

  // get books by id from api
  const getBooksFromApi = async (bookId) => {
    try {
      const response = await axiosInstent.get(`${pathApi.products}/${bookId}`);
      const data = await response.data;
      setBook(data);
    } catch (error) {
      console.error(error);
    }
  };

  // handle click add cart
  const addCart = (book) => {
    const idUser = window.localStorage.getItem('idUser');
    if (!idUser) {
      navigate('../../user/login');
      Swal.fire({
        title: 'Bạn phải đăng nhập',
        icon: 'info',
      });
      return;
    }

    try {
      handleAddProductToCart(idUser, book, soLuong);
      // show alert
      Swal.fire({
        title: 'Thêm vào giỏ hàng thành công',
        icon: 'success',
        confirmButtonText: 'Xem giỏ hàng',
        showCancelButton: true,
        cancelButtonText: 'Ở lại đây',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`../../user/${path.shoppingCart}`);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className='py-5'>
      <div className='container'>
        <div className='row gx-5'>
          <aside className='col-lg-6'>
            <div className='border rounded-4 mb-3 d-flex justify-content-center'>
              <img
                style={{ width: '600px', height: '600px', margin: 'auto' }}
                className='rounded-4 fit'
                src={book.imageName}
                alt={book.title}
              />
            </div>
          </aside>
          <main className='col-lg-6'>
            <div className='ps-lg-3'>
              <h4 className='title text-dark h2'>{book.title}</h4>
              <p className='my-4'>{book.description}</p>
              <div className='row'>
                <dt className='col-3'>Tác giả:</dt>
                <dd className='col-9'>{book.author}</dd>
                <dt className='col-3'>Giá:</dt>
                <dd className='col-9'>{formatPrice(book.price)}</dd>
                <dt className='col-3'>Số lượng:</dt>
                <dd className='col-9'>
                  <input
                    type='text'
                    value={soLuong}
                    onChange={(e) => {
                      let str = e.target.value;
                      if (str === '') str = 1;
                      const quantity = Number(str);
                      if (!quantity) return;
                      setSoLuong(quantity);
                    }}
                  />
                </dd>
              </div>
              <hr />

              <button
                className='btn btn-success shadow-0 mt-5'
                onClick={() => addCart(book)}
              >
                <i className='me-1 fa fa-shopping-basket'></i> Thêm vào giỏ hàng
              </button>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}
