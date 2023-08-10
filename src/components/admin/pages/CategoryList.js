import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import axiosInstent, { pathApi } from '../../../config/axiosCustom';
import CategoryModal from '../modal/CategoryModal';

export default function CategoryList() {
  const [statusModal, setStatusModal] = useState(undefined);
  const [categories, setCategories] = useState([]);
  const inputAddFormik = useFormik({
    initialValues: {
      categoryName: '',
    },
    validationSchema: Yup.object({
      categoryName: Yup.string().required('Không được để trống'),
    }),
    onSubmit: (values) => {
      if (!statusModal) {
        return;
      }
      if (statusModal === 'Add') {
        handleClickAdd(values);
      } else if (statusModal === 'Edit') {
        handleClickEdit(values);
      }
    },
  });
  const navigate = useNavigate();

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

    window.document.title = 'Categoriy List';
    window.scrollTo(0, 0);
    callApiGetAllCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // call api get all categories
  const callApiGetAllCategories = async () => {
    try {
      const response = await axiosInstent.get(pathApi.categories);
      const categories = await response.data;
      // console.log('cate', categories);
      setCategories(categories);
    } catch (error) {
      const { status } = error.response;
      console.error('Status code:', status);
      Swal.fire('Đã có lỗi xảy ra', '', 'error');
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
                data-bs-target='#modalAddCategory'
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
  const handleClickAdd = async (dataCategory) => {
    try {
      const response = await axiosInstent.post(pathApi.categories, dataCategory);
      const result = await response.data;
      // console.log(result);
      setCategories([...categories, result]);
      inputAddFormik.resetForm();
      Swal.fire('Thêm thành công', '', 'success');
    } catch (error) {
      const { status } = error.response;
      if (status === 500) {
        Swal.fire('Thêm thất bại', '', 'error');
      } else {
        console.error('status: ' + status);
        Swal.fire('Có lỗi xảy ra', `status code ${status}`, 'error');
      }
    }
  };

  // handle click on edit button
  const handleShowViewEdit = async (id) => {
    try {
      const response = await axiosInstent.get(`${pathApi.categories}/${id}`);
      const { categoryId, categoryName } = await response.data;
      // console.log(response.data);
      // setInputEditCategory({ ...inputEditCategory, ...category });
      inputAddFormik.setFieldValue('categoryId', categoryId);
      inputAddFormik.setFieldValue('categoryName', categoryName);
      setStatusModal('Edit');
    } catch (error) {
      const { status } = error.response;
      console.error('status: ' + status);
      Swal.fire('Có lỗi xảy ra', `status code ${status}`, 'error');
    }
  };

  // handle click on edit button
  const handleClickEdit = async (dataCategory) => {
    // console.log('dataCategory', dataCategory);
    try {
      const response = await axiosInstent.put(pathApi.categories, dataCategory);
      const result = response.data;

      // update categories
      const newCategories = categories.map((category) =>
        category.categoryId === result.categoryId ? result : category
      );

      setCategories(newCategories);
      Swal.fire('Cập nhật thành công', '', 'success');
    } catch (error) {
      const { status } = error.response;
      if (status === 500) {
        Swal.fire('Cập nhật thất bại', '', 'error');
      } else {
        console.error('Status code:', status);
        Swal.fire('Đã có lỗi xảy ra', '', 'error');
      }
    }
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
    <>
      <div className='container-fluid'>
        <h1 className='h2 my-5 text-gray-800'>Category list</h1>
        <div className='card shadow mb-4'>
          <div className='card-header py-3'>
            <button
              className='btn btn-success btn-icon-split'
              data-bs-toggle='modal'
              data-bs-target='#modalAddCategory'
              onClick={() => setStatusModal('Add')}
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
        <CategoryModal
          inputAddFormik={inputAddFormik}
          statusModal={statusModal}
        />
      </div>
    </>
  );
}
