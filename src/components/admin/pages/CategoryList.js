import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import axiosInstent, { pathApi } from '~/config/axiosCustom';
import CategoryAdd from '~/components/admin/modal/CategoryAdd';
import CategoryEdit from '~/components/admin/modal/CategoryEdit';
import { AppContext } from '~/context/contextApp';

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [inputAddCategory, setInputAddCategory] = useState('');
  const [inputEditCategory, setInputEditCategory] = useState({
    categoryId: '',
    categoryName: '',
  });
  const navigate = useNavigate();
  const { appContext } = useContext(AppContext);

  // call api get all categories
  useEffect(() => {
    // check login
    const { idAdmin } = appContext;
    if (!idAdmin) {
      navigate('/admin/login');
    }

    window.document.title = 'Categoriy List';
    window.scrollTo(0, 0);
    callApiGetAllCategories();
  }, [appContext, navigate]);

  // call api get all categories
  const callApiGetAllCategories = async () => {
    try {
      const response = await axiosInstent.get(pathApi.categories);
      const categories = await response.data;
      // console.log('cate', categories);
      setCategories(categories);
    } catch (err) {
      console.error(err);
    }
  };

  // render the category list
  const renderCategories = () => {
    return categories.length === 0 ? (
      <tr>
        <td
          className='text-center'
          colSpan={3}
        >
          Không có danh mục nào
        </td>
      </tr>
    ) : (
      categories.map((category) => {
        return (
          <tr key={category.categoryId}>
            <td className='sorting_1'>{category.categoryId}</td>
            <td>{category.categoryName}</td>
            <td>
              <button
                className='btn btn-sm btn-info btn-icon-split'
                data-bs-toggle='modal'
                data-bs-target='#modalEditCategory'
                onClick={() => handleShowViewEdit(category.categoryId)}
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
                onClick={() => handleClickDelete(category.categoryId)}
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

  // handle click on add button
  const handleClickAdd = () => {
    const dataCategory = {
      categoryName: inputAddCategory,
    };

    axiosInstent.post(pathApi.categories, dataCategory).then((response) => {
      // console.log(response);
      setInputAddCategory('');
      Swal.fire({
        title: 'Thêm thành công',
        icon: 'success',
      });
      callApiGetAllCategories();
    });
  };

  // handle click on edit button
  const handleShowViewEdit = (id) => {
    axiosInstent
      .get(`${pathApi.categories}/${id}`)
      .then((response) => {
        // console.log(response.data);
        const category = response.data;
        setInputEditCategory((prev) => ({
          ...prev,
          categoryId: category.categoryId,
          categoryName: category.categoryName,
        }));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // handle click on edit button
  const handleClickEdit = () => {
    const dataCategory = {
      categoryId: inputEditCategory.categoryId,
      categoryName: inputEditCategory.categoryName,
    };
    // console.log('id', dataCategory);

    axiosInstent.put(pathApi.categories, dataCategory).then((response) => {
      // console.log(response);
      Swal.fire({
        title: 'Cập nhật thành công',
        icon: 'success',
      });
      callApiGetAllCategories();
    });
  };

  // handle click on delete button
  const handleClickDelete = (id) => {
    Swal.fire({
      title: 'Bạn có chắc muốn xoá?',
      icon: 'error',
      showCancelButton: true,
      showDenyButton: true,
      showConfirmButton: false,
      cancelButtonText: 'Huỷ',
      denyButtonText: 'Xoá',
    }).then((result) => {
      if (result.isDenied) {
        axiosInstent
          .delete(`${pathApi.categories}/${id}`)
          .then((response) => {
            if (response.data) {
              Swal.fire({
                title: 'Xoá thành công',
                icon: 'success',
              });
              callApiGetAllCategories();
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  };

  return (
    <div className='container-fluid'>
      <h1 className='h2 my-5 text-gray-800'>Category list</h1>
      <div className='card shadow mb-4'>
        <div className='card-header py-3'>
          <button
            className='btn btn-success btn-icon-split'
            data-bs-toggle='modal'
            data-bs-target='#modalAddCategory'
          >
            <span className='icon text-white-50'>
              <i className='fas fa-plus'></i>
            </span>
            <span className='text'>Add new</span>
          </button>
        </div>
        <div className='card-body'>
          <table
            className='table table-bordered mx-auto'
            style={{ width: '1000px' }}
          >
            <thead>
              <tr role='row'>
                <th width='100px'>Id</th>
                <th style={{ width: '70%' }}>Name</th>
                <th
                  colSpan={2}
                  className='text-center'
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>{renderCategories()}</tbody>
          </table>
        </div>
      </div>

      {/* modal add new category */}
      <CategoryAdd
        inputAddCategory={inputAddCategory}
        setInputAddCategory={setInputAddCategory}
        handleClickAdd={handleClickAdd}
      />

      {/* modal edit category */}
      <CategoryEdit
        inputEditCategory={inputEditCategory}
        setInputEditCategory={setInputEditCategory}
        handleClickEdit={handleClickEdit}
      />
    </div>
  );
}
