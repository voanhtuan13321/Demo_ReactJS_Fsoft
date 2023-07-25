import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

import { CartContext } from '../context/CartContext';
import dataSach from '../../common/data-sach.json';
import { formatPrice } from '../../common/properties';
import { path } from '../../router/router';

export default function ProductDetail() {
  const [book, setBook] = useState({});
  const [carts, cartsDispatch] = useContext(CartContext);
  const locat = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    window.document.title = 'Product Detail';
    window.scrollTo(0, 0);

    if (id) {
      // get book in list book
      const book = dataSach.find((sach) => {
        return sach.id === id;
      });
      setBook(book);
    }
    console.log(carts);
  }, [locat.search, carts, id]);

  // handle click add cart
  const addCart = (book) => {
    // dispatch to reducer
    const action = {
      type: 'ADD',
      data: book,
    };
    cartsDispatch(action);

    // show alert
    Swal.fire({
      title: 'Thêm vào giỏ hàng thành công',
      icon: 'success',
      confirmButtonText: 'Xem giỏ hàng',
      showCancelButton: true,
      cancelButtonText: 'Ở lại đây',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(path.shoppingCart);
      }
    });
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
                src={`/img/${book.image}`}
                alt={book.name}
              />
            </div>
          </aside>
          <main className='col-lg-6'>
            <div className='ps-lg-3'>
              <h4 className='title text-dark h2'>{book.name}</h4>
              <p className='my-4'>{book.description}</p>
              <div className='row'>
                <dt className='col-3'>Tác giả:</dt>
                <dd className='col-9'>{book.author}</dd>
                <dt className='col-3'>Giá:</dt>
                <dd className='col-9'>{formatPrice(book.price)}</dd>
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
