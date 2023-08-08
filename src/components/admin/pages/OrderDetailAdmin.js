import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

import axiosInstent, { pathApi } from '~/config/axiosCustom';
import { formatPrice } from '~/common/properties';

export default function OrderDetailAdmin() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);

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

    getAllOrderDetailFromApi(id);
    window.document.title = 'Order';
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // call api
  const getAllOrderDetailFromApi = async (idOrder) => {
    const response = await axiosInstent.get(`${pathApi.orderDetail}/${idOrder}`);
    const data = await response.data;
    // console.log(data);
    setOrderDetails(data);
  };

  // render order details
  const renderOrderDetails = () => {
    return orderDetails.map((detail) => {
      return (
        <div
          className='row'
          key={detail.id}
        >
          <div className='col-md-2'>
            <img
              src={detail.book.imageName}
              className='img-fluid'
              alt={detail.book.title}
            />
          </div>
          <div className='col-md-6 d-flex align-items-center'>
            <p className='text-muted mb-0'>{detail.book.title}</p>
          </div>
          <div className='col-md-2 text-center d-flex justify-content-center align-items-center'>
            <p className='text-muted mb-0 small'>Qty: {}</p>
          </div>
          <div className='col-md-2 text-center d-flex justify-content-center align-items-center'>
            <p className='text-muted mb-0 small'>
              {formatPrice(detail.quantity * detail.book.price)}
            </p>
          </div>
        </div>
      );
    });
  };

  // total price
  const sumPrice = () => {
    return orderDetails.reduce((currentValue, detail) => {
      return currentValue + detail.book.price * detail.quantity;
    }, 0);
  };

  // get order name
  const getOrderName = () => {
    const orderDate = orderDetails[0]?.order.orderDate;
    return new Date(orderDate).getTime();
  };

  // get info client
  const getInfoClient = () => {
    return orderDetails[0]?.order.user;
  };

  // get isConfirmed
  const getIsConfirmed = () => {
    return orderDetails[0]?.order.confirm;
  };

  // handle click confirm
  const handleConfirmClick = async () => {
    const orderId = orderDetails[0]?.order.id;
    // console.log(orderId);
    await axiosInstent.put(`${pathApi.order}/confirm/${orderId}`);
    navigate('/admin/order-list');
  };

  return (
    <div className='container-fluid'>
      <h1 className='h2 my-5 text-gray-800'>Order detail</h1>
      <div className='card shadow mb-4'>
        <div className='card-body'>
          <section
            className='h-100 gradient-custom'
            style={{ minHeight: '500px' }}
          >
            <div className='container py-5 h-100'>
              <div className='row d-flex justify-content-center align-items-center h-100'>
                <div className='col-lg-10 col-xl-8'>
                  <div
                    className='card'
                    style={{ borderRadius: '10px' }}
                  >
                    <div className='card-body p-4'>
                      <div className='d-flex justify-content-between align-items-center mb-4'>
                        <p className='small text-muted mb-0'>Order : {getOrderName()}</p>
                      </div>
                      <div className='d-flex justify-content-between align-items-center mb-4'>
                        <p className='small text-muted mb-0'>Client : {getInfoClient()?.name}</p>
                      </div>
                      <div className='d-flex justify-content-between align-items-center mb-4'>
                        <p className='small text-muted mb-0'>Phone : {getInfoClient()?.phone}</p>
                      </div>
                      <div className='d-flex justify-content-between align-items-center mb-4'>
                        <p className='small text-muted mb-0'>
                          Address : {getInfoClient()?.address}
                        </p>
                      </div>
                      <div className='d-flex justify-content-center align-items-center mb-4'>
                        <h3 className='text-center mb-0'>Danh sách sản phẩm</h3>
                      </div>

                      <div className='card shadow-0 border mb-4'>
                        <div className='card-body'>{renderOrderDetails()}</div>
                      </div>

                      <div className='d-flex justify-content-between pt-2'>
                        <p className='text-muted mb-0'>
                          <span className='fw-bold me-4'>Total</span> {formatPrice(sumPrice())}
                        </p>
                        {!getIsConfirmed() && (
                          <button
                            className='btn btn-info'
                            onClick={handleConfirmClick}
                          >
                            Confirm
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
