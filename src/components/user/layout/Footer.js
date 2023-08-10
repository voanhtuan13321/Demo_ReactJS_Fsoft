import React from 'react';
import { Link } from 'react-router-dom';

import { text, link } from '../../../common/properties';
import { path } from '../../../router/router';

export default function Footer() {
  return (
    <footer
      className='bg-dark'
      id='tempaltemo_footer'
    >
      <div className='container'>
        <div className='row'>
          <div className='col-md-3 pt-5'></div>

          <div className='col-md-4 pt-5'>
            <h2 className='h2 text-success border-bottom pb-3 border-light logo'>{text.logo}</h2>
            <ul className='list-unstyled text-light footer-link-list'>
              <li>
                <i className='fas fa-map-marker-alt fa-fw'></i>
                {text.address}
              </li>
              <li>
                <i className='fa fa-phone fa-fw'></i>
                <a
                  className='text-decoration-none'
                  href={`tel:${text.phone}`}
                >
                  {text.phone}
                </a>
              </li>
              <li>
                <i className='fa fa-envelope fa-fw'></i>
                <a
                  className='text-decoration-none'
                  href={`mailto:${text.email}`}
                >
                  {text.email}
                </a>
              </li>
            </ul>
          </div>

          <div className='col-md-4 pt-5'>
            <h2 className='h2 text-light border-bottom pb-3 border-light'>Further Info</h2>
            <ul className='list-unstyled text-light footer-link-list'>
              <li>
                <Link
                  className='text-decoration-none'
                  to={path.home}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className='text-decoration-none'
                  to={path.about}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  className='text-decoration-none'
                  to={path.contact}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className='row text-center'>
          <ul className='list-inline footer-icons'>
            <li className='list-inline-item border border-light rounded-circle text-center'>
              <a
                className='text-light text-decoration-none'
                href={link.facebook}
              >
                <i className='fab fa-facebook-f fa-lg fa-fw'></i>
              </a>
            </li>
            <li className='list-inline-item border border-light rounded-circle text-center'>
              <a
                className='text-light text-decoration-none'
                href={link.instagram}
              >
                <i className='fab fa-instagram fa-lg fa-fw'></i>
              </a>
            </li>
            <li className='list-inline-item border border-light rounded-circle text-center'>
              <a
                className='text-light text-decoration-none'
                href={link.linkedin}
              >
                <i className='fab fa-linkedin fa-lg fa-fw'></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
