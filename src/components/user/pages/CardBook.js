import React from 'react';
import { Link } from 'react-router-dom';

import { formatPrice } from '../../../common/properties';

export default function CardBook({ book, handleAddCart }) {
  return (
    <div className='card h-100'>
      <Link
        to={`../user/product-detail/${book.bookId}`}
        style={{ overflow: 'hidden', height: '250px' }}
      >
        <img
          src={book.imageName}
          className='card-img-top custom-hover'
          alt={book.name}
          style={{ height: '100%' }}
        />
      </Link>

      <div className='card-body'>
        <p
          className='h3 text-dark text-center my-3'
          style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {book.title}
        </p>
        <p className='text-muted text-center'>{formatPrice(book.price)}</p>

        <div className='text-center'>
          <Link
            to={`../user/product-detail/${book.bookId}`}
            className='btn btn-outline-primary btn-sm'
          >
            <i className='fa-solid fa-eye'></i> Chi tiết sản phẩm
          </Link>
          <button
            className='btn btn-outline-success mt-3'
            onClick={() => handleAddCart(book)}
          >
            <i className='me-1 fa fa-shopping-basket'></i> Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
}
