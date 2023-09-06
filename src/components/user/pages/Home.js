import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Button, Col, Container, Form, Pagination, Row } from 'react-bootstrap';

import { path } from '../../../router/router';
import axiosInstent, { pathApi } from '../../../config/axiosCustom';
import { AppContext } from '../../../context/contextApp';
import { handleAddProductToCart } from '../../../common/properties';
import CardBook from './CardBook';

export default function Home() {
  const [idDanhMuc, setIdDanhMuc] = useState(undefined);
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState({
    numbers: [],
    currenPage: 1,
  });
  const navigate = useNavigate();
  const { appContextDispatch } = useContext(AppContext);

  useEffect(() => {
    window.document.title = 'Home';
    window.scrollTo(0, 0);

    setPagination({ ...pagination, currenPage: 1 });
    getCategoriesFromApi();
    getBooksFromApi(0, '', 1);
    getNumberOfPagination();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // call api get categories
  const getCategoriesFromApi = async () => {
    try {
      const response = await axiosInstent.get(pathApi.categories);
      const data = await response.data;
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  const getBooksFromApi = async (idCategory, search = '', page) => {
    try {
      const response =
        idCategory === 0 || idCategory === undefined
          ? await axiosInstent.get(pathApi.products, { params: { search, page } })
          : await axiosInstent.get(`${pathApi.products}/category/${idCategory}`, {
              params: { search },
            });
      const data = await response.data;
      // console.log(data);
      setBooks(data);
    } catch (err) {
      console.error(err);
    }
  };

  // render book
  const renderBook = (id) => {
    return books.length === 0 ? (
      <h3 className='text-center'>Không có sản phẩm nào</h3>
    ) : (
      books.map((book) => {
        return (
          <Col
            md={3}
            className='mb-4'
            key={book.bookId}
          >
            <CardBook
              book={book}
              handleAddCart={handleAddCart}
            />
          </Col>
        );
      })
    );
  };

  // render options
  const renderOptions = () => {
    return (
      <>
        <option value='0'>Tất cả</option>
        {categories.map(({ categoryId, categoryName }) => (
          <option
            key={categoryId}
            value={categoryId}
          >
            {categoryName}
          </option>
        ))}
      </>
    );
  };

  // handle select categories
  const handleSelect = (event) => {
    const id = event.target.value;
    getBooksFromApi(Number(id));
    setIdDanhMuc(Number(id));
    setSearch('');
  };

  // call api get all products in cart of user
  const getProductsInCartFromApi = async (idUser) => {
    try {
      const response = await axiosInstent.get(`${pathApi.cart}/${idUser}`);
      const data = await response.data;
      appContextDispatch({ type: 'ADD_COUNT_CART', data: data.length });
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  // handle click add cart
  const handleAddCart = async (book) => {
    const idUser = window.localStorage.getItem('idUser');

    if (!idUser) {
      Swal.fire({
        title: 'Bạn chưa đăng nhập',
        icon: 'warning',
        confirmButtonText: 'Tới trang đăng nhập',
        showCancelButton: true,
        cancelButtonText: 'Ở lại đây',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('../user/login');
        }
      });
      return;
    }

    try {
      handleAddProductToCart(idUser, book, 1);
      Swal.fire({
        title: 'Thêm vào giỏ hàng thành công',
        icon: 'success',
        confirmButtonText: 'Xem giỏ hàng',
        showCancelButton: true,
        cancelButtonText: 'Ở lại đây',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(path.shoppingCart);
        }
        getProductsInCartFromApi(idUser);
      });
    } catch (e) {
      Swal.fire({
        title: 'Thêm vào giỏ hàng thất bại',
        icon: 'error',
      });
      console.error(e);
    }
  };

  // handle click search
  const handleSearch = () => {
    // console.log(search);
    getBooksFromApi(idDanhMuc, search);
    getNumberOfPagination(search);
  };

  const getNumberOfPagination = async (search = '') => {
    try {
      const response = await axiosInstent.get(pathApi.bookPageNum, { params: { search } });
      const data = await response.data;
      // console.log(data);
      setPagination({ ...pagination, numbers: data });
    } catch (error) {
      console.log(error);
    }
  };

  // render Pagination
  const renderPagination = () => {
    if (pagination.numbers.length < 2) {
      return <></>;
    }

    return pagination.numbers.map((page, index) => {
      return (
        <Pagination.Item
          key={index}
          active={pagination.currenPage === page}
          onClick={() => handleSelectPage(page)}
        >
          {page}
        </Pagination.Item>
      );
    });
  };

  // handle select page
  const handleSelectPage = (page) => {
    setPagination({ ...pagination, currenPage: page });
    getBooksFromApi(0, search, page);
  };

  return (
    <>
      <section className='bg-success py-5'>
        <div className='align-items-center py-5'>
          <div className='text-white'>
            <p className='text-center h2'>Welcome to the Book-Shop</p>
            <h1 className='text-center h1 py-4'>IT'S NICE TO MEET YOU</h1>
          </div>
        </div>
      </section>

      <section className='bg-light'>
        <Container className='py-5'>
          <h1 className='text-center h1'>Danh sách các sản phẩm</h1>
          <Row className='text-center py-5'>
            <Col md={3}>
              <Form.Select
                onChange={handleSelect}
                value={idDanhMuc} // Giá trị idDanhMuc hiện tại để chọn mặc định
              >
                {renderOptions()}
              </Form.Select>
            </Col>
            <Col md={7}>
              <Form.Control
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Nhập từ khoá tìm kiếm ...'
              />
            </Col>
            <Col md={2}>
              <Button onClick={handleSearch}>Tìm kiếm</Button>
            </Col>
          </Row>
          <Row>{renderBook()}</Row>
          <Row>
            <Pagination className='justify-content-center'>{renderPagination()}</Pagination>
          </Row>
        </Container>
      </section>
    </>
  );
}
