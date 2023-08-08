import About from '~/components/user/pages/About';
import Contact from '~/components/user/pages/Contact';
import Home from '~/components/user/pages/Home';
import ProductDetail from '~/components/user/pages/ProductDetail';
import ShoppingCart from '~/components/user/pages/ShoppingCart';
import PageNotFound from '~/components/user/pages/PageNotFound';
import Login from '~/components/user/pages/Login';
import Register from '~/components/user/pages/Register';
import CategoryList from '~/components/admin/pages/CategoryList';
import BookList from '~/components/admin/pages/BookList';
import Info from '~/components/user/pages/Info';
import Order from '~/components/user/pages/Order';
import OrderDetail from '~/components/user/pages/OrderDetail';
import OrderList from '~/components/admin/pages/OrderList';
import OrderDetailAdmin from '~/components/admin/pages/OrderDetailAdmin';

const path = {
  home: '',
  about: 'about',
  contact: 'contact',
  productDetail: 'product-detail/:id',
  shoppingCart: 'shopping-cart',
  login: 'login',
  register: 'register',
  info: 'info',
  order: 'order',
  orderDetail: 'order-detail/:id',
};

const adminPath = {
  categoryList: 'category-list',
  productsList: 'products',
  orderList: 'order-list',
  orderDetal: 'order-detail/:id',
};

const routes = [
  {
    path: path.home,
    element: <Home />,
    text: 'Home',
  },
  {
    path: path.about,
    element: <About />,
    text: 'About Us',
  },
  {
    path: path.contact,
    element: <Contact />,
    test: 'Contact Us',
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
    path: path.login,
    element: <Login />,
  },
  {
    path: path.register,
    element: <Register />,
  },
  {
    path: path.info,
    element: <Info />,
  },
  {
    path: path.order,
    element: <Order />,
  },
  {
    path: path.orderDetail,
    element: <OrderDetail />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
];

const adminRoutes = [
  {
    path: adminPath.orderList,
    element: <OrderList />,
  },
  {
    path: adminPath.orderDetal,
    element: <OrderDetailAdmin />,
  },
  {
    path: adminPath.categoryList,
    element: <CategoryList />,
  },
  {
    path: adminPath.productsList,
    element: <BookList />,
  },
];

export { path, routes, adminPath, adminRoutes };
