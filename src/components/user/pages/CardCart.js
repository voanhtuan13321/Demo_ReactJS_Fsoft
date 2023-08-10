import React from 'react';
import { Link } from 'react-router-dom';

import { formatPrice } from '../../../common/properties';

export default function CardCart({ cart, handleClickAdd, handlechangeQuantity, removeCart }) {
  return (
    <div className='row d-flex justify-content-between align-items-center'>
      <div className='col-md-2 col-lg-2 col-xl-2'>
        <img
          src={cart.book.imageName}
          className='img-fluid rounded-3'
          alt={cart.book.title}
          style={{ width: '150px' }}
        />
      </div>
      <div
        className='col-md-3 col-lg-3 col-xl-3'
        style={{ flexGrow: 1000 }}
      >
        <p className='lead fw-normal mb-2'>
          <Link
            to={`../../user/product-detail/${cart.book.bookId}`}
            style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}
          >
            {cart.book.title}
          </Link>
        </p>
        <p>
          <span className='text-muted'>Tác giả: </span>
          {cart.book.author}
        </p>
      </div>
      <div
        className='col-md-3 col-lg-3 col-xl-2'
        style={{ flexGrow: 1 }}
      >
        <div className='d-flex justify-content-end'>
          <button
            className={`btn btn-link px-2 ${cart.quantity === 1 && 'disabled'}`}
            onClick={() => handleClickAdd(cart, -1)}
          >
            <i className='fas fa-minus'></i>
          </button>
          <input
            type='text'
            min='0'
            value={cart.quantity}
            onChange={(event) => {
              handlechangeQuantity(event, cart);
            }}
            className='form-control form-control-sm text-center'
            style={{ width: '100px' }}
          />
          <button
            className='btn btn-link px-2'
            onClick={() => handleClickAdd(cart, 1)}
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
          <h5 className='mb-0'>{formatPrice(cart.book.price * cart.quantity)}</h5>
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
  );
}
