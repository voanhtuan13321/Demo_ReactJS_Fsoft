import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import Navbar from '~/components/admin/layout/Navbar';

export default function Admin() {
  const navigate = useNavigate();

  // call api get all categories
  useEffect(() => {
    const idAdmin = window.localStorage.getItem('idAdmin');
    if (!idAdmin) {
      navigate('../../admin/login');
      Swal.fire({
        title: 'Bạn phải đăng nhập',
        icon: 'info',
      });
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id='wrapper'>
      <div className='position-fixed'>
        <Navbar />
      </div>
      <div style={{ marginLeft: '224px', width: '100%' }}>
        <Outlet />
      </div>
    </div>
  );
}
