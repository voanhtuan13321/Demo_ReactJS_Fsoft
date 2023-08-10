import React from 'react';

export default function CategoryModal({ inputAddFormik, statusModal }) {
  return (
    <>
      <div
        className='modal fade'
        id='modalAddCategory'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabIndex='-1'
        aria-labelledby='staticBackdropLabel'
        aria-hidden='true'
      >
        <form
          onSubmit={inputAddFormik.handleSubmit}
          className='modal-dialog'
        >
          <div className='modal-content'>
            <div className='modal-header'>
              <h5
                className='modal-title text-dark fw-bold'
                id='staticBackdropLabel'
              >
                Thêm mới
              </h5>
              <button
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
                onClick={inputAddFormik.resetForm}
              ></button>
            </div>
            <div className='modal-body'>
              <div className='mb-3'>
                <label
                  htmlFor='addInputCategoryName'
                  className='form-label'
                >
                  Category Name
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='addInputCategoryName'
                  {...inputAddFormik.getFieldProps('categoryName')}
                />
                {inputAddFormik.errors.categoryName && (
                  <p className='text-danger mt-2'>{inputAddFormik.errors.categoryName}</p>
                )}
              </div>
            </div>
            <div className='modal-footer'>
              <button
                className='btn btn-success'
                data-bs-dismiss='modal'
              >
                {statusModal ?? ''}
              </button>
              <button
                className='btn btn-secondary'
                data-bs-dismiss='modal'
                onClick={inputAddFormik.resetForm}
              >
                Close
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
