import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { path } from '../../router/router';

export default function PageNotFound() {
  useEffect(() => {
    window.document.title = 'Not Found';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div class='d-flex align-items-center justify-content-center py-5 my-5'>
      <div class='text-center py-5 my-5'>
        <h1 class='display-1 fw-bold'>404</h1>
        <p class='fs-3'>
          <span class='text-danger'>Opps!</span> Page not found.
        </p>
        <p class='lead'>The page you're looking for doesn't exist.</p>
        <Link
          to={path.home}
          class='btn btn-success'
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
