import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import axiosInstent, { pathApi } from '~/config/axiosCustom';
import BookAdd from '~/components/admin/modal/BookAdd';
import BookEdit from '~/components/admin/modal/BookEdit';
import { AppContext } from '~/context/contextApp';

export default function BookList() {
  const [idDanhMuc, setIdDanhMuc] = useState(undefined);
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);
  const [inputAddBook, setInputAddBook] = useState({
    categoryId: 0,
    title: '',
    author: '',
    description: '',
    image: null,
    price: 0,
    quantity: 0,
  });
  const [inputEditBook, setInputEditBook] = useState({
    bookId: 0,
    categoryId: 0,
    title: '',
    author: '',
    description: '',
    image: null,
    price: 0,
    quantity: 0,
  });
  const navigate = useNavigate();
  const { appContext } = useContext(AppContext);

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

    window.document.title = 'Book List';
    window.scrollTo(0, 0);

    axiosInstent
      .get(pathApi.categories)
      .then((response) => {
        // console.log('category:', response.data);
        setCategories(response.data);
      })
      .catch((err) => {
        console.error(err);
      });

    callApiGetAllBooks();
  }, [appContext, navigate]);

  // call Api Get All Books
  const callApiGetAllBooks = async () => {
    const response = await axiosInstent.get(pathApi.products);
    const dataBook = await response.data;
    // console.log('books:', dataBook);
    setBooks(dataBook);
  };

  // reset data in add book form
  const resetBooks = () => {
    setInputAddBook({
      categoryId: 0,
      title: '',
      author: '',
      description: '',
      image: null,
      price: 0,
      quantity: 0,
    });
  };

  // render options
  const renderOptions = () => {
    return (
      <>
        <option value={0}>Chọn danh mục</option>
        {categories.map((category) => (
          <option
            key={category.categoryId}
            value={category.categoryId}
          >
            {category.categoryName}
          </option>
        ))}
      </>
    );
  };

  // handle click on add button
  const addButtonClick = () => {
    // console.log(inputAddBook);
    const formDataBook = convertToFormData(inputAddBook);

    axiosInstent
      .post(pathApi.products, formDataBook)
      .then((response) => {
        // console.log(response);
        Swal.fire({
          title: 'Thêm thành công',
          icon: 'success',
        });
        callApiGetAllBooks();
        resetBooks();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // convert to form data
  const convertToFormData = (data) => {
    const formDataBook = new FormData();
    formDataBook.append('categoryId', data.categoryId ? data.categoryId : data.category.categoryId);
    formDataBook.append('author', data.author);
    formDataBook.append('description', data.description);
    formDataBook.append('price', data.price);
    formDataBook.append('quantity', data.quantity);
    formDataBook.append('title', data.title);
    data.image && formDataBook.append('image', data.image);
    data.bookId && formDataBook.append('bookId', data.bookId);
    return formDataBook;
  };

  // show Edit Book
  const showEditBook = (book) => {
    setInputEditBook(book);
  };

  // const handle click on edit button
  const handleEditBookClick = () => {
    // console.log('test', inputEditBook);
    const formDataBook = convertToFormData(inputEditBook);
    axiosInstent
      .put(pathApi.products, formDataBook)
      .then((response) => {
        // console.log(response);
        Swal.fire({
          title: 'Cập nhật thành công',
          icon: 'success',
        });
        callApiGetAllBooks();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // const handle click delete button
  const handleDelete = (id) => {
    // console.log(id);
    axiosInstent
      .delete(`${pathApi.products}/${id}`)
      .then((response) => {
        // console.log(response);
        Swal.fire({
          title: 'Xoá thành công',
          icon: 'success',
        });
        callApiGetAllBooks();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // renders the books
  const renderBooks = () => {
    return books.length === 0 ? (
      <tr>
        <td
          className='text-center'
          colSpan={8}
        >
          Không có sách nào trong hệ thống
        </td>
      </tr>
    ) : (
      books.map((book) => {
        return (
          <tr key={book.bookId}>
            <td className='sorting_1'>{book.bookId}</td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td className='text-center'>
              <img
                src={book.imageName}
                alt=''
                style={{ width: '50px', height: '50px' }}
              />
            </td>
            <td>{book.price}</td>
            <td>{book.quantity}</td>
            <td>
              <button
                className='btn btn-sm btn-info btn-icon-split'
                data-bs-toggle='modal'
                data-bs-target='#modalEditBook'
                onClick={() => showEditBook(book)}
              >
                <span className='icon text-white-50'>
                  <i className='fas fa-pen'></i>
                </span>
                <span className='text'>Edit</span>
              </button>
            </td>
            <td>
              <button
                className='btn btn-sm btn-danger btn-icon-split'
                onClick={() => handleDelete(book.bookId)}
              >
                <span className='icon text-white-50'>
                  <i className='fas fa-trash'></i>
                </span>
                <span className='text'>Delete</span>
              </button>
            </td>
          </tr>
        );
      })
    );
  };

  // handle select categories
  const handleSelect = (event) => {
    const id = event.target.value;
    getBooksFromApi(Number(id));
    setIdDanhMuc(Number(id));
    setSearch('');
  };

  const getBooksFromApi = async (idCategory, search = '') => {
    try {
      const response =
        idCategory === 0 || idCategory === undefined
          ? await axiosInstent.get(pathApi.products, { params: { search } })
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

  // handle click search
  const handleSearch = () => {
    // console.log(search);
    getBooksFromApi(idDanhMuc, search);
  };

  return (
    <div className='container-fluid'>
      <h1 className='h2 my-5 text-gray-800'>Books list</h1>
      <div className='card shadow mb-4'>
        <div className='card-header py-3 d-flex'>
          <button
            className='btn btn-success btn-icon-split'
            data-bs-toggle='modal'
            data-bs-target='#modalAddNewBook'
          >
            <span className='icon text-white-50'>
              <i className='fas fa-plus'></i>
            </span>
            <span className='text'>Add new</span>
          </button>
          <select
            className='form-select ml-3'
            style={{ width: '200px' }}
            onChange={handleSelect}
            value={idDanhMuc} // Giá trị idDanhMuc hiện tại để chọn mặc định
          >
            {renderOptions()}
          </select>
          <input
            className='form-control ml-3'
            type='text'
            style={{ width: '500px' }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Nhập từ khoá tìm kiếm ...'
          />
          <button
            className='btn btn-info ml-3'
            onClick={handleSearch}
          >
            Tìm kiếm
          </button>
        </div>
        <div className='card-body'>
          <table className='table table-sm table-bordered mx-auto'>
            <thead>
              <tr role='row'>
                <th width='100px'>Id</th>
                <th style={{ width: '40%' }}>Title</th>
                <th style={{ width: '20%' }}>Author</th>
                <th
                  className='text-center'
                  style={{ width: '10%' }}
                >
                  Image
                </th>
                <th>Price</th>
                <th>Quantity</th>
                <th
                  colSpan={2}
                  className='text-center'
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>{renderBooks()}</tbody>
          </table>
        </div>
      </div>

      {/* modal add new category */}
      <BookAdd
        resetBooks={resetBooks}
        inputAddBook={inputAddBook}
        setInputAddBook={setInputAddBook}
        renderOptions={renderOptions}
        addButtonClick={addButtonClick}
      />

      {/* modal edit */}
      <BookEdit
        inputEditBook={inputEditBook}
        setInputEditBook={setInputEditBook}
        handleEditBookClick={handleEditBookClick}
        renderOptions={renderOptions}
      />
    </div>
  );
}
