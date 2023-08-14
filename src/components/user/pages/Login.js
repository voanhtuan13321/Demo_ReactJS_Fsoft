import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Form } from 'react-bootstrap';

import { path } from '../../../router/router';
import axiosInstent, { pathApi } from '../../../config/axiosCustom';
import { AppContext } from '../../../context/contextApp';

export default function Login() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Bạn phải nhập email'),
      password: Yup.string().required('Bạn phải nhập password'),
    }),
    onSubmit: (values) => {
      handleClickSignIn(values);
    },
  });
  const navigate = useNavigate();
  const { appContextDispatch } = useContext(AppContext);

  useEffect(() => {
    window.document.title = 'Login';
    window.scrollTo(0, 0);
  }, []);

  // handle Click Sign In
  const handleClickSignIn = async (dataUser) => {
    // call api
    try {
      const response = await axiosInstent.post(`${pathApi.user}/login`, dataUser);
      const idUser = await response.data;

      if (idUser) {
        // store in local storage
        window.localStorage.setItem('idUser', idUser);
        appContextDispatch({ type: 'ADD_ID_USER', data: idUser });

        Swal.fire({ title: 'Đăng nhập thành công', icon: 'success' }).then((result) => {
          if (result.isConfirmed) {
            getProductsInCartFromApi(idUser);
            navigate('/user');
          }
        });
      } else {
        Swal.fire('Đăng nhập thất bại, tài khoản hoặc mật khẩu không đúng', '', 'error');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Đã có lỗi xảy ra', '', 'error');
    }
  };

  // call api get all products in cart of user
  const getProductsInCartFromApi = async (idUser) => {
    try {
      const response = await axiosInstent.get(`${pathApi.cart}/${idUser}`);
      const data = await response.data;
      appContextDispatch({ type: 'ADD_COUNT_CART', data: data.length });
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form
      onSubmit={formik.handleSubmit}
      style={{ width: '400px', margin: '150px auto 250px' }}
    >
      <h1 className='text-center mb-5'>Login</h1>
      <Form.Group className='mb-4'>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          value={formik.values.email}
          {...formik.getFieldProps('email')}
        />
        <Form.Text className='text-danger'>{formik.errors.email}</Form.Text>
      </Form.Group>

      <Form.Group className='mb-4'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          autoComplete='true'
          value={formik.values.password}
          {...formik.getFieldProps('password')}
        />
        <Form.Text className='text-danger'>{formik.errors.password}</Form.Text>
      </Form.Group>

      <Form.Group className='text-center mb-4'>
        <Button
          type='submit'
          className='btn-success'
        >
          Sign in
        </Button>
      </Form.Group>

      <div className='text-center'>
        <p>
          Not a member? <Link to={`../${path.register}`}>Register</Link>
        </p>
      </div>
    </Form>
  );
}
