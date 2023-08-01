import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '~/components/user/layout/Header';
import Footer from '~/components/user/layout/Footer';

export default function User() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
