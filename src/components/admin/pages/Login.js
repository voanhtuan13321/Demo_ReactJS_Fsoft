import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import axiosInstent, { pathApi } from '~/config/axiosCustom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    window.document.title = 'Login';
  }, []);

  // handle Click Sign In
  const handleClickSignIn = async () => {
    try {
      // check exist email
      await axiosInstent.get(`${pathApi.admin}/${email}`);
    } catch (error) {
      const { status } = error.response;
      if (status === 404) {
        // console.error('Status code:', status, 'email not found');
        Swal.fire('Email không đúng', '', 'error');
      } else {
        console.error('Status code:', status);
        Swal.fire('Đã có lỗi xảy ra', '', 'error');
      }
      return;
    }

    // check login
    const dataAdmin = { email, password };
    try {
      const responseCheckLogin = await axiosInstent.post(`${pathApi.admin}/check`, dataAdmin);
      const idAdmin = await responseCheckLogin.data;
      // console.log(idAdmin);
      window.localStorage.setItem('idAdmin', idAdmin);
      navigate('../admin/order-list');
    } catch (error) {
      const { status } = error.response;
      if (status === 404) {
        Swal.fire('Mật khẩu không đúng', '', 'error');
      } else {
        console.error('Status code:', status);
        Swal.fire('Đã có lỗi xảy ra', '', 'error');
      }
    }
  };

  return (
    <>
      <div
        className='mx-auto'
        style={{ width: '500px' }}
      >
        <h1 className='text-center my-5'>LOGIN</h1>

        <div className='form-outline mb-4'>
          <label
            className='form-label'
            htmlFor='form1Example13'
          >
            Email address
          </label>
          <input
            type='email'
            id='form1Example13'
            className='form-control form-control-lg'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='form-outline mb-4'>
          <label
            className='form-label'
            htmlFor='form1Example23'
          >
            Password
          </label>
          <input
            type='password'
            id='form1Example23'
            className='form-control form-control-lg'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className='btn btn-primary btn-lg btn-block'
          onClick={handleClickSignIn}
        >
          Sign in
        </button>
      </div>
    </>
  );
}
