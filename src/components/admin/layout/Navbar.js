import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { adminPath } from '~/router/router';
import { AppContext } from '~/context/contextApp';

const navs = [
  {
    to: adminPath.categoryList,
    text: 'Category',
  },
  {
    to: 'products',
    text: 'Products',
  },
];

export default function Navbar() {
  const { appContextDispatch } = useContext(AppContext);
  const navigate = useNavigate();

  // render the navigation
  const renderNavbar = () => {
    return navs.map((nav, i) => {
      return (
        <li
          className='nav-item'
          key={i}
        >
          <Link
            className='nav-link'
            to={nav.to}
          >
            <i className='fas fa-fw fa-cog'></i>
            <span>{nav.text}</span>
          </Link>
        </li>
      );
    });
  };

  // handle click on logout button
  const handleLogout = () => {
    appContextDispatch({ title: 'ADD_ID_ADMIN', data: undefined });
    navigate('/admin/login');
  };

  return (
    <ul className='navbar-nav bg-gradient-primary sidebar sidebar-dark accordion'>
      <div className='sidebar-brand d-flex align-items-center justify-content-center'>
        <div className='sidebar-brand-icon rotate-n-15'>
          <i className='fas fa-laugh-wink'></i>
        </div>
        <div className='sidebar-brand-text mx-3'>Admin</div>
      </div>

      <hr className='sidebar-divider my-0' />

      {renderNavbar()}

      <hr className='sidebar-divider' />
      <div className='text-center'>
        <button
          className='btn btn-sm btn-danger'
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </ul>
  );
}
