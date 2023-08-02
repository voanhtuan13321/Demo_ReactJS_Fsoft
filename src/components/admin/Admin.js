import React from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from '~/components/admin/layout/Navbar';

export default function Admin() {
  return (
    <div id='wrapper'>
      <Navbar />
      <Outlet />
    </div>
  );
}
