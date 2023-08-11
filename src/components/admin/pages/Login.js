import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

import axiosInstent, { pathApi } from '../../../config/axiosCustom';

export default function Login() {
  const refEmail = useRef(null);
  const refPass = useRef(null);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Tài khoản không được để trống')
        .max(50, 'Không được nhập quá 50 ký tự'),
      password: Yup.string()
        .required('Mật khẩu không được để trống')
        .max(50, 'Không được nhập quá 50 ký tự'),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  useEffect(() => {
    window.document.title = 'Login';
  }, []);

  // handle Click Sign In
  const handleSubmit = async ({ email, password }) => {
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
      refEmail.current.focus();
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
      <form
        className='mx-auto'
        style={{ width: '500px' }}
        onSubmit={formik.handleSubmit}
      >
        <h1 className='text-center my-5'>LOGIN</h1>

        <div className='form-outline mb-4'>
          <label
            className='form-label'
            htmlFor='form1Example13'
          >
            Account
          </label>
          <input
            ref={refEmail}
            type='text'
            id='form1Example13'
            className='form-control form-control-lg'
            // name='email'
            // value={formik.values.email}
            // onChange={formik.handleChange}
            {...formik.getFieldProps('email')}
          />
          {formik.errors.email && <p className='mt-1 text-danger'>{formik.errors.email}</p>}
        </div>

        <div className='form-outline mb-4'>
          <label
            className='form-label'
            htmlFor='form1Example23'
          >
            Password
          </label>
          <input
            ref={refPass}
            type='password'
            id='form1Example23'
            className='form-control form-control-lg'
            // name='password'
            // value={formik.values.password}
            // onChange={formik.handleChange}
            {...formik.getFieldProps('password')}
          />
          {formik.errors.password && <p className='mt-1 text-danger'>{formik.errors.password}</p>}
        </div>

        <button className='btn btn-primary btn-lg btn-block'>Sign in</button>
      </form>
    </>
  );
}
