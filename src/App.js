import { Route, Routes } from 'react-router-dom';
import '@sweetalert2/theme-bootstrap-4';

import '~/App.css';
import User from '~/components/user/User';
import Admin from '~/components/admin/Admin';
import { routes } from '~/router/router';

function App() {
  // render routes
  const renderRoutes = () => {
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
          {renderRoutes()}
        </Route>
        <Route
          path='admin'
          element={<Admin />}
        />
      </Routes>
    </>
  );
}

export default App;
