import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import axiosInstent, { pathApi } from '../../../config/axiosCustom';
import InforEdit from '../modal/InfoEdit';

export default function Info() {
  const [infoUser, setInfoUser] = useState({
    name: '',
    address: '',
    phone: '',
  });
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
    getInforUserFromApi(idUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getInforUserFromApi = async (idUser) => {
    // check user has information
    const responseUser = await axiosInstent.get(`${pathApi.user}/info/${idUser}`);
    const dataUser = await responseUser.data;
    setInfoUser({ ...dataUser });
  };

  // handle Click Edit
  const handleClickEdit = async (newInfo) => {
    const response = await axiosInstent.put(`${pathApi.user}/edit`, newInfo);
    const status = await response.data;
    if (status) {
      Swal.fire({
        title: 'Cập nhật thông tin thành công',
        icon: 'success',
      });
    } else {
      Swal.fire({
        title: 'Cập nhật thông tin thành công',
        icon: 'success',
      });
    }
  };

  // handle Click click close
  const handleClose = () => {
    const idUser = window.localStorage.getItem('idUser');
    getInforUserFromApi(idUser);
  };

  return (
    <>
      <section
        className='py-5'
        style={{ backgroundColor: '#eee' }}
      >
        <div className='container py-5'>
          <div className='row'>
            <div className='col-lg-4'>
              <div className='card mb-4'>
                <div className='card-body text-center'>
                  <img
                    src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp'
                    alt='avatar'
                    className='rounded-circle img-fluid'
                    style={{ width: '150px' }}
                  />
                  <h5 className='my-3'>{infoUser.email}</h5>
                  <div className='d-flex justify-content-center mb-2'>
                    <button
                      className='btn btn-info btn-icon-split'
                      data-bs-toggle='modal'
                      data-bs-target='#modalEditInfo'
                    >
                      <span className='icon text-white-50'>
                        <i className='fas fa-pen'></i>
                      </span>
                      <span className='text'>Edit info</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-8'>
              <div className='card mb-4'>
                <div className='card-body'>
                  <div className='row'>
                    <div className='col-sm-3'>
                      <p className='mb-0'>Name</p>
                    </div>
                    <div className='col-sm-9'>
                      <p className='text-muted mb-0'>{infoUser.name}</p>
                    </div>
                  </div>
                  <hr />
                  <div className='row'>
                    <div className='col-sm-3'>
                      <p className='mb-0'>Address</p>
                    </div>
                    <div className='col-sm-9'>
                      <p className='text-muted mb-0'>{infoUser.address}</p>
                    </div>
                  </div>
                  <hr />
                  <div className='row'>
                    <div className='col-sm-3'>
                      <p className='mb-0'>Phone</p>
                    </div>
                    <div className='col-sm-9'>
                      <p className='text-muted mb-0'>{infoUser.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <InforEdit
        infoUser={infoUser}
        setInfoUser={setInfoUser}
        handleClickEdit={handleClickEdit}
        handleClose={handleClose}
      />
    </>
  );
}
