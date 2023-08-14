import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

import { formatPrice } from '../../../common/properties';

export default function CardBook({ book, handleAddCart }) {
  return (
    <Card className='h-100 shadow'>
      <Link
        to={`../user/product-detail/${book.bookId}`}
        style={{ overflow: 'hidden', height: '250px' }}
      >
        <Card.Img
          src={book.imageName}
          className='custom-hover'
        />
      </Link>

      <Card.Body>
        <Card.Title
          className='text-dark text-center mb-3'
          style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {book.title}
        </Card.Title>
        <Card.Text className='text-center'>Giá: {formatPrice(book.price)}</Card.Text>
      </Card.Body>

      <Card.Footer className='text-center'>
        <Link
          to={`../user/product-detail/${book.bookId}`}
          className='btn btn-success btn-sm custom-size'
        >
          <i className='fa-solid fa-eye'></i> Chi tiết sản phẩm
        </Link>
        <Button
          className='custom-size btn-sm mt-2'
          onClick={() => handleAddCart(book)}
        >
          <i className='me-1 fa fa-shopping-basket'></i> Thêm vào giỏ hàng
        </Button>
      </Card.Footer>
    </Card>
  );
}
