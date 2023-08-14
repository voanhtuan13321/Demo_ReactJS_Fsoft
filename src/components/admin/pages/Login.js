import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { Button, FloatingLabel, Form } from 'react-bootstrap';

import axiosInstent, { pathApi } from '../../../config/axiosCustom';
import { AppContext } from '../../../context/contextApp';
import { useContext } from 'react';

export default function Login() {
  const { appContextDispatch } = useContext(AppContext);
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
    appContextDispatch({ type: 'SET_LOADING', data: true });
    try {
      // check exist email
      await axiosInstent.get(`${pathApi.admin}/${email}`);
    } catch (error) {
      const { status } = error.response;
      if (status === 404) {
        // console.error('Status code:', status, 'email not found');
        Swal.fire('Tài khoản không đúng', '', 'error');
      } else {
        console.error('Status code:', status);
        Swal.fire('Đã có lỗi xảy ra', '', 'error');
      }
      refEmail.current.focus();
      appContextDispatch({ type: 'SET_LOADING', data: false });
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
    appContextDispatch({ type: 'SET_LOADING', data: false });
  };

  return (
    <>
      <Form
        className='mx-auto'
        style={{ width: '500px' }}
        onSubmit={formik.handleSubmit}
      >
        <h1 className='text-center my-5'>LOGIN</h1>

        <FloatingLabel label='Account'>
          <Form.Control
            ref={refEmail}
            placeholder='Account'
            {...formik.getFieldProps('email')}
          />
          <Form.Text className='mb-3 text-danger'>{formik.errors.email}</Form.Text>
        </FloatingLabel>

        <FloatingLabel label='Password'>
          <Form.Control
            ref={refPass}
            type='password'
            autoComplete='on'
            placeholder='Password'
            {...formik.getFieldProps('password')}
          />
          <Form.Text className='mb-3 text-danger'>{formik.errors.password}</Form.Text>
        </FloatingLabel>

        <Button
          type='submit'
          className='btn-lg btn-block'
        >
          Sign in
        </Button>
      </Form>
    </>
  );
}
