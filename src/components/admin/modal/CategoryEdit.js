import React from 'react';

export default function CategoryEdit({ inputEditCategory, setInputEditCategory, handleClickEdit }) {
  return (
    <>
      <div
        className='modal fade'
        id='modalEditCategory'
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
                Cập nhật
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <div className='mb-3'>
                <label
                  htmlFor='editInputCategoryId'
                  className='form-label'
                >
                  Category Id
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='editInputCategoryId'
                  value={inputEditCategory.categoryId}
                  onChange={() => {}}
                  readOnly
                />
              </div>
              <div className='mb-3'>
                <label
                  htmlFor='editInputCategoryName'
                  className='form-label'
                >
                  Category Name
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='editInputCategoryName'
                  value={inputEditCategory.categoryName}
                  onChange={(e) =>
                    setInputEditCategory((prev) => ({
                      ...prev,
                      categoryName: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-info'
                data-bs-dismiss='modal'
                onClick={handleClickEdit}
              >
                Edit
              </button>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
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
