import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { path } from '~/router/router';

export default function Login() {
  useEffect(() => {
    window.document.title = 'Login';
    window.scrollTo(0, 0);
  });

  return (
    <form style={{ width: '400px', margin: '200px auto' }}>
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
        />
      </div>
      <div className='text-center'>
        <button className='btn btn-success btn-block mb-4'>Sign in</button>
      </div>

      <div className='text-center'>
        <p>
          Not a member? <Link to={path.register}>Register</Link>
        </p>
      </div>
    </form>
  );
}
