import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { path } from '~/router/router';
import axiosInstent, { pathApi } from '~/config/axiosCustom';
import { AppContext } from '~/context/contextApp';

export default function Login() {
  const [inputUser, setInputUser] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const { appContextDispatch } = useContext(AppContext);

  useEffect(() => {
    window.document.title = 'Login';
    window.scrollTo(0, 0);
  }, []);

  // handle Click Sign In
  const handleClickSignIn = async () => {
    const { email, password } = inputUser;

    if (!email || !password) {
      Swal.fire({
        title: 'Bạn chưa nhập đầy đủ, vui lòng nhập đủ thông tin',
        icon: 'error',
      });
      return;
    }

    const dataUser = { ...inputUser };
    const response = await axiosInstent.post(`${pathApi.user}/login`, dataUser);
    const idUser = await response.data;

    if (idUser) {
      appContextDispatch({ type: 'ADD_ID_USER', data: idUser });
      Swal.fire({
        title: 'Đăng nhập thành công',
        icon: 'success',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/user');
        }
      });
    } else {
      Swal.fire({
        title: 'Đăng nhập thất bại, tài khoản hoặc mật khẩu không đúng',
        icon: 'error',
      });
    }
  };

  // handleChangeInput
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInputUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ width: '400px', margin: '150px auto 250px' }}>
      <h1 className='text-center mb-5'>Login</h1>
      <div className='form-outline mb-4'>
        <label
          className='form-label'
          htmlFor='form2Example1'
        >
          Email address
        </label>
        <input
          type='email'
          id='form2Example1'
          className='form-control border'
          value={inputUser.email}
          name='email'
          onChange={handleChangeInput}
        />
      </div>

      <div className='form-outline mb-4'>
        <label
          className='form-label'
          htmlFor='form2Example2'
        >
          Password
        </label>
        <input
          type='password'
          id='form2Example2'
          className='form-control'
          autoComplete='true'
          value={inputUser.password}
          name='password'
          onChange={handleChangeInput}
        />
      </div>
      <div className='text-center'>
        <button
          className='btn btn-success btn-block mb-4'
          onClick={handleClickSignIn}
        >
          Sign in
        </button>
      </div>

      <div className='text-center'>
        <p>
          Not a member? <Link to={`../${path.register}`}>Register</Link>
        </p>
      </div>
    </div>
  );
}
