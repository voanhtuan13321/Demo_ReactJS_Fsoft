import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import axiosInstent, { pathApi } from '~/config/axiosCustom';
import { role, setIdOnLocalStorage } from '~/common/handleIdOnLocalStorage';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // handle Click Sign In
  const handleClickSignIn = async () => {
    // check exist email
    const responseCheckEmail = await axiosInstent.get(`${pathApi.admin}/${email}`);
    if (!responseCheckEmail.data) {
      Swal.fire({
        title: 'Email không tồn tại',
        icon: 'error',
      });
      return;
    }

    // check login
    const dataAdmin = { email, password };
    const responseCheckLogin = await axiosInstent.post(`${pathApi.admin}/check`, dataAdmin);
    const idAdmin = await responseCheckLogin.data;
    if (idAdmin) {
      setIdOnLocalStorage(role.admin, idAdmin);
      navigate('category-list');
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
