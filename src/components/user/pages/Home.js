import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { path } from '~/router/router';
import { formatPrice } from '~/common/properties';
import axiosInstent, { pathApi } from '~/config/axiosCustom';
import { AppContext } from '~/context/contextApp';
import { handleAddProductToCart } from '~/common/properties';

export default function Home() {
  const [idDanhMuc, setIdDanhMuc] = useState(undefined);
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const { appContextDispatch } = useContext(AppContext);

  useEffect(() => {
    window.document.title = 'Home';
    window.scrollTo(0, 0);
    getCategoriesFromApi();
    getBooksFromApi(0);
  }, []);

  // call api get categories
  const getCategoriesFromApi = async () => {
    try {
      const response = await axiosInstent.get(pathApi.categories);
      const data = await response.data;
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  const getBooksFromApi = async (idCategory) => {
    try {
      const response =
        idCategory === 0
          ? await axiosInstent.get(pathApi.products)
          : await axiosInstent.get(`${pathApi.products}/category/${idCategory}`);
      const data = await response.data;
      // console.log(data);
      setBooks(data);
    } catch (err) {
      console.error(err);
    }
  };

  // render book
  const renderBook = (id) => {
    return books.map((book) => {
      return (
        <div
          className='col-md-3 mb-4'
          key={book.bookId}
        >
          <div className='card h-100'>
            <Link
              to={`../user/product-detail/${book.bookId}`}
              style={{ overflow: 'hidden', height: '250px' }}
            >
              <img
                src={`http://localhost:8080/api/images/${book.imageName}`}
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
        </div>
      );
    });
  };

  // render options
  const renderOptions = () => {
    return (
      <>
        <option value='0'>Tất cả</option>
        {categories.map(({ categoryId, categoryName }) => (
          <option
            key={categoryId}
            value={categoryId}
          >
            {categoryName}
          </option>
        ))}
      </>
    );
  };

  // handle select categories
  const handleSelect = (event) => {
    const id = event.target.value;
    getBooksFromApi(Number(id));
    setIdDanhMuc(Number(id));
  };

  // call api get all products in cart of user
  const getProductsInCartFromApi = async (idUser) => {
    try {
      const response = await axiosInstent.get(`${pathApi.cart}/${idUser}`);
      const data = await response.data;
      appContextDispatch({ type: 'ADD_COUNT_CART', data: data.length });
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  // handle click add cart
  const handleAddCart = async (book) => {
    const idUser = window.localStorage.getItem('idUser');

    if (!idUser) {
      Swal.fire({
        title: 'Bạn chưa đăng nhập',
        icon: 'warning',
        confirmButtonText: 'Tới trang đăng nhập',
        showCancelButton: true,
        cancelButtonText: 'Ở lại đây',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('../user/login');
        }
      });
      return;
    }

    try {
      handleAddProductToCart(idUser, book, 1);
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
      getProductsInCartFromApi(idUser);
    } catch (e) {
      Swal.fire({
        title: 'Thêm vào giỏ hàng thất bại',
        icon: 'error',
      });
      console.error(e);
    }
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
          <div className='row'>{renderBook()}</div>
        </div>
      </section>
    </>
  );
}
