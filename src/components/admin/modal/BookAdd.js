import React, { useEffect, useState } from 'react';

export default function BookAdd({ resetBooks, inputAddBook, setInputAddBook, renderOptions, addButtonClick }) {
  const [base64String, setBase64String] = useState('https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg');

  useEffect(() => {
    if (!inputAddBook.image) {
      setBase64String('https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg');
    }
  }, [inputAddBook]);

  const handleOnChangeImage = (e) => {
    const file = e.target.files[0];
    setInputAddBook((prev) => ({
      ...prev,
      image: file,
    }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setBase64String(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div
        className='modal fade'
        id='modalAddNewBook'
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
                onClick={resetBooks}
              ></button>
            </div>
            <div className='modal-body'>
              <div className='mb-3'>
                <select
                  className='form-select'
                  aria-label='Default select example'
                  value={inputAddBook.categoryId}
                  onChange={(e) =>
                    setInputAddBook((prev) => ({
                      ...prev,
                      categoryId: e.target.value,
                    }))
                  }
                >
                  {renderOptions()}
                </select>
              </div>

              <div className='mb-3'>
                <label
                  htmlFor='addBookTitle'
                  className='form-label'
                >
                  Book Title
                </label>
                <input
                  type='text'
                  placeholder='Title'
                  className='form-control'
                  id='addBookTitle'
                  value={inputAddBook.title}
                  onChange={(e) =>
                    setInputAddBook((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />
              </div>

              <div className='mb-3'>
                <label
                  htmlFor='addBookAuthor'
                  className='form-label'
                >
                  Author
                </label>
                <input
                  type='text'
                  placeholder='Author'
                  className='form-control'
                  id='addBookAuthor'
                  value={inputAddBook.author}
                  onChange={(e) =>
                    setInputAddBook((prev) => ({
                      ...prev,
                      author: e.target.value,
                    }))
                  }
                />
              </div>

              <div className='mb-3'>
                <label
                  htmlFor='addBookDecription'
                  className='form-label'
                >
                  Decription
                </label>
                <textarea
                  className='form-control'
                  placeholder='description'
                  id='addBookDecription'
                  value={inputAddBook.description}
                  onChange={(e) =>
                    setInputAddBook((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                ></textarea>
              </div>

              <div className='mb-3'>
                <div className='row'>
                  <div className='col'>
                    <label
                      htmlFor='addBookPrice'
                      className='form-label'
                    >
                      Price
                    </label>
                    <input
                      id='addBookPrice'
                      type='number'
                      className='form-control'
                      value={inputAddBook.price}
                      min={0}
                      onChange={(e) =>
                        setInputAddBook((prev) => ({
                          ...prev,
                          price: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className='col'>
                    <label
                      htmlFor='addBookQuantity'
                      className='form-label'
                    >
                      Quantity
                    </label>
                    <input
                      id='addBookQuantity'
                      type='number'
                      className='form-control'
                      value={inputAddBook.quantity}
                      min={0}
                      onChange={(e) =>
                        setInputAddBook((prev) => ({
                          ...prev,
                          quantity: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>

              <div className='mb-3'>
                <div
                  className='d-flex justify-content-center mb-4 overflow-hidden mx-auto'
                  style={{ width: '200px', height: '200px' }}
                >
                  <img
                    src={base64String}
                    alt='hinh anh'
                    style={{ width: '100%' }}
                  />
                </div>
                <div className='d-flex justify-content-center'>
                  <div className='btn btn-info btn-rounded'>
                    <label
                      className='form-label text-white m-1'
                      htmlFor='customFile2'
                      style={{ cursor: 'pointer' }}
                    >
                      Choose file
                    </label>
                    <input
                      type='file'
                      className='form-control d-none'
                      id='customFile2'
                      onChange={(e) => handleOnChangeImage(e)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-success'
                data-bs-dismiss='modal'
                onClick={addButtonClick}
              >
                Add
              </button>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
                onClick={resetBooks}
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
