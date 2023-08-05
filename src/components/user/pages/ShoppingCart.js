import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { formatPrice, handleAddProductToCart } from '~/common/properties';
import axiosInstent, { pathApi } from '~/config/axiosCustom';
import { AppContext } from '~/context/contextApp';

export default function ShoppingCart() {
  const [idUser, setIdUser] = useState(undefined);
  const [carts, setCarts] = useState([]);
  const { appContextDispatch } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const idUser = window.localStorage.getItem('idUser');
    if (!idUser) {
      navigate('../../user/login');
      Swal.fire({
        title: 'Bạn phải đăng nhập',
        icon: 'info',
      });
      return;
    }

    setIdUser(idUser);
    getProductsInCartFromApi(idUser);

    window.document.title = 'Shopping Cart';
    window.scrollTo(0, 0);
  }, []);

  // call api get all products in cart of user
  const getProductsInCartFromApi = async (idUser) => {
    try {
      const response = await axiosInstent.get(`${pathApi.cart}/${idUser}`);
      const data = await response.data;
      // console.log(data);
      setCarts(data);
      appContextDispatch({ type: 'ADD_COUNT_CART', data: data.length });
    } catch (error) {
      console.error(error);
    }
  };

  // render cart
  const renderCart = () => {
    return carts.map((cart) => {
      return (
        <div
          key={cart.cartId}
          className='card-body p-4'
        >
          <div className='row d-flex justify-content-between align-items-center'>
            <div className='col-md-2 col-lg-2 col-xl-2'>
              <img
                src={`http://localhost:8080/api/images/${cart.book.imageName}`}
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
        </div>
      );
    });
  };

  // handle click +
  const handleClickAdd = async (cart, quantity) => {
    try {
      const dataCart = {
        userId: idUser,
        bookId: cart.book.bookId,
        quantity,
      };

      await axiosInstent.post(pathApi.cart, dataCart);
      getProductsInCartFromApi(idUser);
    } catch (error) {
      console.error(error);
    }
  };

  // handlechangeQuantity
  const handlechangeQuantity = async (e, cart) => {
    const quantity = Number(e.target.value);
    if (!quantity) {
      return;
    }
    const dataCart = {
      cartId: cart.cartId,
      quantity: quantity,
    };
    try {
      await axiosInstent.put(pathApi.cart, dataCart);

      getProductsInCartFromApi(idUser);
    } catch (error) {
      console.error(error);
    }
  };

  // handle remove cart
  const removeCart = (cart) => {
    // console.log(cart);
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
        axiosInstent.delete(`${pathApi.cart}/${cart.cartId}`).then((response) => {
          if (response.data) {
            Swal.fire({
              title: 'Xoá thành công',
              icon: 'success',
            });
            getProductsInCartFromApi(idUser);
          }
        });
      }
    });
  };

  // total price
  const sumPrice = () => {
    return carts.reduce((currentValue, cart) => {
      return currentValue + cart.book.price * cart.quantity;
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
                  <>
                    <p className='my-0 text-end'>
                      <span className='fw-bold'>Tổng tiền: </span>
                      {formatPrice(sumPrice())}
                    </p>
                    <button className='btn btn-primary'>Thanh toán</button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
