import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import { CartContext } from '../context/CartContext';
import { formatPrice } from '../../common/properties';

export default function ShoppingCart() {
  const [carts, cartsDispatch] = useContext(CartContext);

  useEffect(() => {
    window.document.title = 'Shopping Cart';
    window.scrollTo(0, 0);
  }, []);

  // render cart
  const renderCart = () => {
    return carts.map((cart) => {
      return (
        <div
          key={cart.id}
          className='card-body p-4'
        >
          <div className='row d-flex justify-content-between align-items-center'>
            <div className='col-md-2 col-lg-2 col-xl-2'>
              <img
                src={`/img/${cart.image}`}
                className='img-fluid rounded-3'
                alt={cart.name}
                style={{ width: '150px', height: '150px' }}
              />
            </div>

            <div
              className='col-md-3 col-lg-3 col-xl-3'
              style={{ flexGrow: 1000 }}
            >
              <p className='lead fw-normal mb-2'>
                <Link
                  to={`/product-detail/${cart.id}`}
                  style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}
                >
                  {cart.name}
                </Link>
              </p>
              <p>
                <span className='text-muted'>Tác giả: </span>
                {cart.author}
              </p>
            </div>

            <div
              className='col-md-3 col-lg-3 col-xl-2'
              style={{ flexGrow: 1 }}
            >
              <div className='d-flex justify-content-end'>
                <button
                  className={`btn btn-link px-2 ${cart.quantity === 1 && 'disabled'}`}
                  onClick={() => cartsDispatch({ type: 'REDUCE', data: cart })}
                >
                  <i className='fas fa-minus'></i>
                </button>
                <input
                  type='text'
                  min='0'
                  value={cart.quantity}
                  onChange={(event) => {}}
                  className='form-control form-control-sm text-center'
                  style={{ width: '50px' }}
                />
                <button
                  className='btn btn-link px-2'
                  onClick={() => cartsDispatch({ type: 'INCREASE', data: cart })}
                >
                  <i className='fas fa-plus'></i>
                </button>
              </div>
            </div>

            <div
              className='col-md-3 col-lg-2 col-xl-2 offset-lg-1'
              style={{ flexGrow: 1, width: '150px' }}
            >
              <div className='text-center'>
                <h5 className='mb-0'>{formatPrice(cart.price * cart.quantity)}</h5>
              </div>
            </div>

            <div
              className='col-md-1 col-lg-1 col-xl-1 text-end'
              style={{ flexGrow: 1 }}
            >
              <div className='text-center'>
                <button
                  className='text-danger'
                  style={{ border: 'none', backgroundColor: 'transparent' }}
                  onClick={() => removeCart(cart)}
                >
                  <i className='fas fa-trash fa-lg'></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  // handle remove cart
  const removeCart = (cart) => {
    // show alert
    Swal.fire({
      title: 'Bạn có chắc là muốn xoá sản phẩm này không?',
      icon: 'warning',
      showConfirmButton: false,
      showDenyButton: true,
      denyButtonText: 'Xoá',
      showCancelButton: true,
      cancelButtonText: 'Huỷ',
    }).then((result) => {
      if (result.isDenied) {
        // dispatch to reducer
        const action = { type: 'REMOVE', data: cart };
        cartsDispatch(action);
      }
    });
  };

  // total price
  const sumPrice = () => {
    return carts.reduce((currentValue, cart) => {
      return currentValue + cart.price * cart.quantity;
    }, 0);
  };

  return (
    <section
      className='h-100'
      style={{ backgroundColor: '#eee', minHeight: '600px' }}
    >
      <div className='container h-100 py-5'>
        <div className='row d-flex justify-content-center align-items-center h-100'>
          <div className='col-10'>
            <div className='card rounded-3 mb-4'>{renderCart()}</div>

            <div className='card'>
              <div className='card-body align-center'>
                {carts.length === 0 ? (
                  <div className='text-center'>Giỏ hàng không có sản phẩm nào</div>
                ) : (
                  <p className='my-0 text-end'>
                    <span className='fw-bold'>Tổng tiền: </span>
                    {formatPrice(sumPrice())}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
