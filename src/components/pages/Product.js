import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

import { CartContext } from '../context/CartContext';
import dataSach from '../../common/data-sach.json';
import dataDanhMuc from '../../common/data-danhmuc.json';
import { formatPrice } from '../../common/properties';
import { path } from '../../router/router';

export default function Product() {
  const [idDanhMuc, setIdDanhMuc] = useState(undefined);
  const [carts, cartsDispatch] = useContext(CartContext);
  const locat = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.document.title = 'Product';
    window.scrollTo(0, 0);

    // get id danh muc in parameters
    const params = new URLSearchParams(locat.search);
    const id = params.get('idDanhMuc');
    setIdDanhMuc(id === null ? undefined : id);
    console.log(carts);
  }, [locat.search, carts]);

  // render book
  const renderBook = (id) => {
    return dataSach
      .filter((sach) => {
        // filter by id, else chosen all
        return id ? sach.idDanhMuc === id : true;
      })
      .map((sach) => {
        return (
          <div
            className='col-md-3 mb-4'
            key={sach.id}
          >
            <div className='card h-100'>
              <Link
                to={`/product-detail/${sach.id}`}
                style={{ overflow: 'hidden' }}
              >
                <img
                  src={`/img/${sach.image}`}
                  className='card-img-top custom-hover'
                  alt={sach.name}
                  style={{ height: '300px' }}
                />
              </Link>

              <div className='card-body'>
                <p
                  className='h3 text-dark text-center my-3'
                  style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                  {sach.name}
                </p>
                <p className='text-muted text-center'>{formatPrice(sach.price)}</p>

                <div className='text-center'>
                  <Link
                    to={`/product-detail/${sach.id}`}
                    className='btn btn-outline-primary btn-sm'
                  >
                    Chi tiết sản phẩm
                  </Link>
                  <button
                    className='btn btn-outline-success btn-sm mt-3'
                    onClick={() => handleAddCart(sach)}
                  >
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      });
  };

  // render options
  const renderOptions = () => {
    return (
      <>
        <option value='0'>Tất cả</option>
        {dataDanhMuc.map((danhMuc) => (
          <option
            key={danhMuc.id}
            value={danhMuc.id}
          >
            {danhMuc.name}
          </option>
        ))}
      </>
    );
  };

  // handle select categories
  const handleSelect = (event) => {
    const id = event.target.value;
    setIdDanhMuc(id === '0' ? undefined : id);
  };

  // handle click add cart
  const handleAddCart = (book) => {
    const action = {
      type: 'ADD',
      data: book,
    };
    cartsDispatch(action);
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
    <section className='bg-light'>
      <div className='container py-5'>
        <div className='row text-center py-3'>
          <div className='col-lg-6 m-auto'>
            <h1 className='h1'>Danh sách các sản phẩm</h1>
            <select
              className='form-select mx-auto'
              style={{ width: '300px' }}
              onChange={handleSelect}
              value={idDanhMuc} // Giá trị idDanhMuc hiện tại để chọn mặc định
            >
              {renderOptions()}
            </select>
          </div>
        </div>
        <div className='row'>{renderBook(idDanhMuc)}</div>
      </div>
    </section>
  );
}
