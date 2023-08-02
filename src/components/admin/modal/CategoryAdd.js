import React from 'react';

export default function CategoryAdd({ inputAddCategory, setInputAddCategory, handleClickAdd }) {
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
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5
                className='modal-title text-dark fw-bold'
                id='staticBackdropLabel'
              >
                Thêm mới
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
                onClick={() => setInputAddCategory('')}
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
                  value={inputAddCategory}
                  onChange={(e) => setInputAddCategory(e.target.value)}
                />
              </div>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-success'
                data-bs-dismiss='modal'
                onClick={handleClickAdd}
              >
                Add
              </button>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
                onClick={() => setInputAddCategory('')}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
