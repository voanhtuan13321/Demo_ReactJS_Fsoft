import { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import '@sweetalert2/theme-bootstrap-4';
import '~/App.css';
import '~/sb-admin-2.min.css';
import User from '~/components/user/User';
import PageNotFound from '~/components/user/pages/PageNotFound';
import Admin from '~/components/admin/Admin';
import Login from '~/components/admin/pages/Login';
import { routes, adminRoutes } from '~/router/router';
import { AppContext } from '~/context/contextApp';
import axiosInstent, { pathApi } from '~/config/axiosCustom';

function App() {
  const { appContextDispatch } = useContext(AppContext);

  useEffect(() => {
    const idUser = window.localStorage.getItem('idUser');
    appContextDispatch({ type: 'ADD_ID_USER', data: idUser });
    getProductsInCartFromApi(idUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // call api get all products in cart of user
  const getProductsInCartFromApi = async (idUser) => {
    try {
      const response = await axiosInstent.get(`${pathApi.cart}/${idUser}`);
      const data = await response.data;
      // console.log(data);
      appContextDispatch({ type: 'ADD_COUNT_CART', data: data.length });
    } catch (error) {
      console.error(error);
    }
  };

  // render routes
  const renderRoutes = (routes) => {
    return routes.map((route, index) => {
      return (
        <Route
          key={index}
          path={route.path}
          element={route.element}
          exact
        />
      );
    });
  };

  return (
    <>
      <Routes>
        <Route
          path='user'
          element={<User />}
        >
          {renderRoutes(routes)}
        </Route>
        <Route
          path='admin'
          element={<Admin />}
        >
          {renderRoutes(adminRoutes)}
        </Route>
        <Route
          path='*'
          element={<PageNotFound />}
        />
        <Route
          path='admin/login'
          element={<Login />}
        />
      </Routes>
    </>
  );
}

export default App;
