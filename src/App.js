import { Route, Routes } from 'react-router-dom';
import '@sweetalert2/theme-bootstrap-4';

import './App.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { routes } from './router/router';

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
      <Header />
      <Routes>{renderRoutes()}</Routes>
      <Footer />
    </>
  );
}

export default App;
