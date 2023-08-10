import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { formatPrice } from '../../../common/properties';
import axiosInstent, { pathApi } from '../../../config/axiosCustom';
import { AppContext } from '../../../context/contextApp';
import CardCart from './CardCart';

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
    checkResultPayment();

    window.document.title = 'Shopping Cart';
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <CardCart
            cart={cart}
            handleClickAdd={handleClickAdd}
            handlechangeQuantity={handlechangeQuantity}
            removeCart={removeCart}
          />
        </div>
      );
    });
  };

  // handle click + or -
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

  // handle change Quantity
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

  // is Enough Information
  const isEnoughInformation = (user) => {
    const { name, address, phone } = user;
    return name && address && phone;
  };

  // handleClickPayment
  const handleClickPayment = async () => {
    // check user has information
    const responseUser = await axiosInstent.get(`${pathApi.user}/info/${idUser}`);
    const dataUser = await responseUser.data;

    if (!isEnoughInformation(dataUser)) {
      Swal.fire({
        title: 'Bạn chưa điền đủ thông tin',
        icon: 'warning',
        confirmButtonText: 'Tới trang thông tin cá nhân',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/user/info');
        }
      });
      return;
    }

    const dataPayment = {
      amount: sumPrice(),
      vnpOrderInfo: 'information',
      vnpReturnUrl: 'http://localhost:3000/user/shopping-cart',
    };

    const responsePayment = await axiosInstent.post(pathApi.payment, dataPayment);
    const linkPayment = await responsePayment.data;
    window.location.href = linkPayment;
  };

  // check ressult payment
  const checkResultPayment = () => {
    const paramResponseCode = new URL(window.location).searchParams.get('vnp_ResponseCode');

    if (paramResponseCode) {
      if (Number(paramResponseCode) === 0) {
        Swal.fire('Đặt hàng thành công', '', 'success');
        let id = idUser;
        if (!id) {
          id = window.localStorage.getItem('idUser');
        }
        axiosInstent.post(`${pathApi.order}/${id}`).then((response) => {
          if (response.data) {
            // navigate('/user/shopping-cart');
            window.location.href = 'http://localhost:3000/user/shopping-cart';
            // Ngăn người dùng sử dụng nút "Back" trên trình duyệt
            window.addEventListener('popstate', (event) => {
              window.history.pushState(null, '', window.location.href);
            });
          }
        });
      } else if (Number(paramResponseCode) === 24) {
      } else {
        Swal.fire('Đặt hàng không thành công', 'có vẻ quá trình đặt hàng đã gặp vấn đề', 'error');
      }
    }
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
                    <button
                      className='btn btn-primary'
                      onClick={handleClickPayment}
                    >
                      Thanh toán
                    </button>
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
