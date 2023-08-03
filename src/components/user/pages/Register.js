import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { path } from '~/router/router';
import axiosInstent, { pathApi } from '~/config/axiosCustom';

export default function Register() {
  const [inputUser, setInputUser] = useState({
    email: '',
    password: '',
    confirm: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    window.document.title = 'Register';
    window.scrollTo(0, 0);
  }, []);

  // handel Click Register
  const handelClickRegister = async () => {
    const { email, password, confirm } = inputUser;

    if (!email || !password || !confirm) {
      Swal.fire({
        title: 'Có một trường để trống, bạn phải nhập tất cả',
        icon: 'error',
      });
      return;
    }

    if (password !== confirm) {
      Swal.fire({
        title: 'Nhập mật khẩu lần 2 không chính xác, vui lòng nhập lại',
        icon: 'error',
      });
      return;
    }

    const dataUser = { email, password };
    // console.log(dataUser);
    const response = await axiosInstent.post(`${pathApi.user}/register`, dataUser);
    const statusRegister = await response.data;
    if (statusRegister) {
      Swal.fire({
        title: 'Đặng kí thành công',
        icon: 'success',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/user/login');
        }
      });
    } else {
      Swal.fire({
        title: 'Đăng kí thất bại, tài khoản đã tồn tại, vui lòng nhập tài khoản khác',
        icon: 'error',
      });
    }
  };

  // handle change input
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInputUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ width: '400px', margin: '150px auto 200px' }}>
      <h1 className='text-center mb-5'>Register</h1>
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

      <div className='form-outline mb-4'>
        <label
          className='form-label'
          htmlFor='form2Example3'
        >
          Confirm Password
        </label>
        <input
          type='password'
          id='form2Example3'
          className='form-control'
          autoComplete='true'
          value={inputUser.confirm}
          name='confirm'
          onChange={handleChangeInput}
        />
      </div>

      <div className='text-center'>
        <button
          className='btn btn-success btn-block mb-4'
          onClick={handelClickRegister}
        >
          Register
        </button>
      </div>

      <div className='text-center'>
        <p>
          <Link to={`../${path.login}`}>Login</Link>
        </p>
      </div>
    </div>
  );
}
