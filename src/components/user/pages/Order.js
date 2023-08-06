import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import axiosInstent, { pathApi } from '~/config/axiosCustom';

export default function Order() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [ordersComfirmed, setOrdersComfirmed] = useState([]);

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

    getAllOrdersFromApi(idUser);
    window.document.title = 'Order';
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // get all orders by user is not comfirm
  const getAllOrdersFromApi = async (idUser) => {
    const response = await axiosInstent.get(`${pathApi.order}/users/not-confirm/${idUser}`);
    const data = await response.data;
    setOrders(data);
  };

  // get all orders by user is not comfirm
  const getAllOrdersComfirmedFromApi = async (idUser) => {
    const response = await axiosInstent.get(`${pathApi.order}/users/confirm/${idUser}`);
    const data = await response.data;
    setOrdersComfirmed(data);
  };

  // render order
  const renderOrder = () => {
    return orders.length === 0 ? (
      <tr>
        <td
          colSpan={4}
          className='text-center'
        >
          Không có đơn hàng nào
        </td>
      </tr>
    ) : (
      orders.map((order) => {
        const { timeMili, time, day } = convertTime(order.orderDate);
        return (
          <tr key={order.id}>
            <td>{timeMili}</td>
            <td>{day}</td>
            <td>{time}</td>
            <td>
              <Link to={`/user/order-detail/${order.id}`}>View detail</Link>
            </td>
          </tr>
        );
      })
    );
  };

  // render order
  const renderOrderComfirmed = () => {
    return ordersComfirmed.length === 0 ? (
      <tr>
        <td
          colSpan={3}
          className='text-center'
        >
          Không có đơn hàng nào
        </td>
      </tr>
    ) : (
      ordersComfirmed.map((order) => {
        const { timeMili, time, day } = convertTime(order.orderDate);
        return (
          <tr key={order.id}>
            <td>{timeMili}</td>
            <td>{day}</td>
            <td>{time}</td>
            <td>
              <Link to={`/user/order-detail/${order.id}`}>View detail</Link>
            </td>
          </tr>
        );
      })
    );
  };

  // convert string to time
  const convertTime = (str) => {
    const dateObject = new Date(str);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1; // Tháng bắt đầu từ 0 (0 - 11), nên cộng thêm 1
    const day = dateObject.getDate();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();
    return { timeMili: dateObject.getTime(), time: `${hours}:${minutes}:${seconds}`, day: `${day}/${month}/${year}` };
  };

  return (
    <>
      <section>
        <div
          className='bg-image h-100 py-3'
          style={{ backgroundColor: '#f5f7fa' }}
        >
          <div className='mask d-flex align-items-center h-100'>
            <div className='container'>
              <div className='row justify-content-center'>
                <div className='col-6'>
                  <div className='card'>
                    <div className='card-body p-0'>
                      <div
                        className='table-responsive table-scroll'
                        data-mdb-perfect-scrollbar='true'
                        style={{ position: 'relative', height: '400px' }}
                      >
                        <table className='table mb-0'>
                          <thead>
                            <tr>
                              <th scope='col'>Order</th>
                              <th scope='col'>Day</th>
                              <th scope='col'>Time</th>
                              <th scope='col'>Action</th>
                            </tr>
                          </thead>
                          <tbody>{renderOrder()}</tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div
          className='bg-image h-100 py-5'
          style={{ backgroundColor: '#f5f7fa' }}
        >
          <h3 className='text-center'>History</h3>
          <div className='mask d-flex align-items-center h-100'>
            <div className='container'>
              <div className='row justify-content-center'>
                <div className='col-6'>
                  <div className='card'>
                    <div className='card-body p-0'>
                      <div
                        className='table-responsive table-scroll'
                        data-mdb-perfect-scrollbar='true'
                        style={{ position: 'relative' }}
                      >
                        <table className='table mb-0'>
                          <thead>
                            <tr>
                              <th scope='col'>Order</th>
                              <th scope='col'>Day</th>
                              <th scope='col'>Time</th>
                            </tr>
                          </thead>
                          <tbody>{renderOrderComfirmed()}</tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
