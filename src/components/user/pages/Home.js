import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import dataDanhMuc from '~/common/data-danhmuc.json';
import dataSach from '~/common/data-sach.json';
import { CartContext } from '~/components/user/context/CartContext';
import { path } from '~/router/router';
import { formatPrice } from '~/common/properties';

export default function Home() {
  const [idDanhMuc, setIdDanhMuc] = useState(undefined);
  const [carts, cartsDispatch] = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    window.document.title = 'Home';
    window.scrollTo(0, 0);
    console.log(carts);
  }, [carts]);

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
                    <i class='fa-solid fa-eye'></i> Chi tiết sản phẩm
                  </Link>
                  <button
                    className='btn btn-outline-success mt-3'
                    onClick={() => handleAddCart(sach)}
                  >
                    <i className='me-1 fa fa-shopping-basket'></i> Thêm vào giỏ hàng
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
    <>
      <section className='bg-success py-5'>
        <div className='align-items-center py-5'>
          <div className='text-white py-5'>
            <p className='text-center h2 py-4'>Welcome to the Book-Shop</p>
            <h1 className='text-center h1 py-4'>IT'S NICE TO MEET YOU</h1>
          </div>
        </div>
      </section>

      <section className='bg-light'>
        <div className='container py-5'>
          <div className='row text-center py-3'>
            <div className='col-lg-6 m-auto'>
              <h1 className='h1'>Danh sách các sản phẩm</h1>
              <select
                className='form-select mx-auto my-5'
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
    </>
  );
}
