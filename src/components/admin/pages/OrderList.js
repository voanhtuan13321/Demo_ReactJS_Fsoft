import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import axiosInstent, { pathApi } from '../../../config/axiosCustom';

export default function OrderList() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [ordersConfirm, setOrdersConfirm] = useState([]);

  useEffect(() => {
    const idAdmin = window.localStorage.getItem('idAdmin');
    if (!idAdmin) {
      navigate('../../admin/login');
      Swal.fire({
        title: 'Bạn phải đăng nhập',
        icon: 'info',
      });
      return;
    }

    window.document.title = 'Order list';
    window.scrollTo(0, 0);
    getAllOrdersNotConfirmFromApi();
    getAllOrdersConfirmFromApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // get all orders by user is not comfirm
  const getAllOrdersNotConfirmFromApi = async () => {
    const response = await axiosInstent.get(`${pathApi.order}/not-confirm`);
    const data = await response.data;
    // console.log(data);
    setOrders(data);
  };

  // get all orders by user is not comfirm
  const getAllOrdersConfirmFromApi = async () => {
    const response = await axiosInstent.get(`${pathApi.order}/confirm`);
    const data = await response.data;
    // console.log(data);
    setOrdersConfirm(data);
  };

  // render order not confirmed
  const renderOrder = () => {
    return orders.length === 0 ? (
      <tr>
        <td
          colSpan={7}
          className='text-center'
        >
          Không có đơn hàng nào
        </td>
      </tr>
    ) : (
      orders.map((order) => {
        const { timeMili, time, day } = convertTime(order.orderDate);
        const { name, address, phone } = order.user;
        return (
          <tr key={order.id}>
            <td>{timeMili}</td>
            <td>{name}</td>
            <td>{phone}</td>
            <td>{address}</td>
            <td>{day}</td>
            <td>{time}</td>
            <td>
              <Link to={`/admin/order-detail/${order.id}`}>View detail</Link>
            </td>
          </tr>
        );
      })
    );
  };

  // render order not confirmed
  const renderOrderConfirmed = () => {
    return ordersConfirm.length === 0 ? (
      <tr>
        <td
          colSpan={7}
          className='text-center'
        >
          Không có đơn hàng nào
        </td>
      </tr>
    ) : (
      ordersConfirm.map((order) => {
        const { timeMili, time, day } = convertTime(order.orderDate);
        const { name, address, phone } = order.user;
        return (
          <tr key={order.id}>
            <td>{timeMili}</td>
            <td>{name}</td>
            <td>{phone}</td>
            <td>{address}</td>
            <td>{day}</td>
            <td>{time}</td>
            <td>
              <Link to={`/admin/order-detail/${order.id}`}>View detail</Link>
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
    return {
      timeMili: dateObject.getTime(),
      time: `${hours}:${minutes}:${seconds}`,
      day: `${day}/${month}/${year}`,
    };
  };

  return (
    <div className='container-fluid'>
      <section className='container-fluid'>
        <h1 className='h2 my-5 text-gray-800'>Order list</h1>
        <div className='card shadow mb-4'>
          <div className='card-body'>
            <table className='table table-sm table-bordered mx-auto'>
              <thead>
                <tr role='row'>
                  <th>Order</th>
                  <th>Client Name</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Day</th>
                  <th>Time</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{renderOrder()}</tbody>
            </table>
          </div>
        </div>
      </section>

      <section className='container-fluid'>
        <h1 className='h2 my-5 text-gray-800'>History Order</h1>
        <div className='card shadow mb-4'>
          <div className='card-body'>
            <table className='table table-sm table-bordered mx-auto'>
              <thead>
                <tr role='row'>
                  <th>Order</th>
                  <th>Client Name</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Day</th>
                  <th>Time</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{renderOrderConfirmed()}</tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
