import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { path } from '~/router/router';

export default function Register() {
  useEffect(() => {
    window.document.title = 'Register';
    window.scrollTo(0, 0);
  });

  return (
    <form style={{ width: '400px', margin: '200px auto' }}>
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
          type='text'
          id='form2Example2'
          className='form-control'
          autoComplete='true'
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
          type='text'
          id='form2Example3'
          className='form-control'
          autoComplete='true'
        />
      </div>

      <div className='text-center'>
        <button className='btn btn-success btn-block mb-4'>Register</button>
      </div>

      <div className='text-center'>
        <p>
          <Link to={path.login}>Login</Link>
        </p>
      </div>
    </form>
  );
}
