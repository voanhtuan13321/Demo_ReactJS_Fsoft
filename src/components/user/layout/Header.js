import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { text, link } from '~/common/properties';
import { path } from '~/router/router';
import { AppContext } from '~/context/contextApp';

export default function Header() {
  const { appContext, appContextDispatch } = useContext(AppContext);
  const navigate = useNavigate();

  // handl Click Logout
  const handlClickLogout = () => {
    window.localStorage.removeItem('idUser');
    appContextDispatch({ type: 'ADD_ID_USER', data: undefined });
    appContextDispatch({ type: 'ADD_COUNT_CART', data: 0 });
    navigate('../user/login');
  };

  return (
    <header style={{ position: 'relative' }}>
      <nav
        className='navbar navbar-expand-lg bg-dark navbar-light d-none d-lg-block'
        id='templatemo_nav_top'
      >
        <div className='container text-light'>
          <div className='w-100 d-flex justify-content-between'>
            <div>
              <i className='fa fa-envelope mx-2'></i>
              <a
                className='navbar-sm-brand text-light text-decoration-none'
                href={`mailto:${text.email}`}
              >
                {text.email}
              </a>
              <i className='fa fa-phone mx-2'></i>
              <a
                className='navbar-sm-brand text-light text-decoration-none'
                href={`tel:${text.phone}`}
              >
                {text.phone}
              </a>
            </div>
            <div>
              {!appContext.idUser && (
                <>
                  <Link
                    to={path.login}
                    className='text-light mx-1 text-decoration-none'
                  >
                    Login
                  </Link>
                  <Link
                    to={path.register}
                    className='text-light mx-1 text-decoration-none'
                  >
                    Register
                  </Link>
                </>
              )}
              <a
                className='text-light'
                href={link.facebook}
              >
                <i className='fab fa-facebook-f fa-sm fa-fw me-2'></i>
              </a>
              <a
                className='text-light'
                href={link.instagram}
              >
                <i className='fab fa-instagram fa-sm fa-fw me-2'></i>
              </a>
              <a
                className='text-light'
                href={link.linkedin}
              >
                <i className='fab fa-linkedin fa-sm fa-fw'></i>
              </a>
            </div>
          </div>
        </div>
      </nav>

      <nav className='navbar navbar-expand-lg navbar-light shadow'>
        <div className='container d-flex justify-content-between align-items-center'>
          <Link
            className='navbar-brand text-success logo h1 align-self-center'
            to={path.home}
          >
            {text.logo}
          </Link>

          <div
            className='align-self-center collapse navbar-collapse flex-fill d-lg-flex justify-content-lg-between'
            id='templatemo_main_nav'
          >
            <div className='flex-fill'>
              <ul className='nav navbar-nav d-flex justify-content-between mx-lg-auto'>
                <li className='nav-item'>
                  <Link
                    to={path.home}
                    className='nav-link'
                  >
                    Home
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to={path.about}
                    className='nav-link'
                  >
                    About Us
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className='nav-link'
                    to={path.contact}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className='navbar align-self-center d-flex'>
              <Link
                className='nav-icon position-relative text-decoration-none'
                to={path.shoppingCart}
              >
                <i className='fa fa-fw fa-cart-arrow-down text-dark mr-1'></i>
                <span className='position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark'>
                  {appContext.countCart}
                </span>
              </Link>
              {appContext.idUser && (
                <>
                  <button
                    className='nav-icon position-relative text-decoration-none btn-account'
                    style={{ border: 'none', backgroundColor: 'transparent' }}
                  >
                    <i className='fa fa-fw fa-user text-dark mr-3'></i>
                    <ul className='shadow box-account'>
                      <li>
                        <Link
                          className='btn'
                          to='/'
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <button
                          className='btn btn-link'
                          onClick={handlClickLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
