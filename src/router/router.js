import About from '../components/pages/About';
import Contact from '../components/pages/Contact';
import Home from '../components/pages/Home';
import Product from '../components/pages/Product';
import ProductDetail from '../components/pages/ProductDetail';
import ShoppingCart from '../components/pages/ShoppingCart';
import PageNotFound from '../components/pages/PageNotFound';

const path = {
  home: '/home',
  about: '/about',
  product: '/product',
  contact: '/contact',
  productDetail: '/product-detail/:id',
  shoppingCart: '/shopping-cart',
};

const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: path.home,
    element: <Home />,
  },
  {
    path: path.product,
    element: <Product />,
  },
  {
    path: path.about,
    element: <About />,
  },
  {
    path: path.contact,
    element: <Contact />,
  },
  {
    path: path.productDetail,
    element: <ProductDetail />,
  },
  {
    path: path.shoppingCart,
    element: <ShoppingCart />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
];

export { path, routes };
