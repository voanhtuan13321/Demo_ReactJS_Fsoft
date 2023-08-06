import React, { useRef } from 'react';

export default function InfoEdit({ infoUser, setInfoUser, handleClickEdit, handleClose }) {
  const refName = useRef();
  const refAddress = useRef();
  const refPhone = useRef();

  const handleClickClose = () => {
    refName.current.value = '';
    refAddress.current.value = '';
    refPhone.current.value = '';
    handleClose();
  };

  return (
    <>
      <div
        className='modal fade'
        id='modalEditInfo'
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
                onClick={handleClickClose}
              ></button>
            </div>
            <div className='modal-body'>
              <div className='mb-3'>
                <label
                  htmlFor='editInfoName'
                  className='form-label'
                >
                  Name
                </label>
                <input
                  ref={refName}
                  type='text'
                  placeholder='Name'
                  className='form-control'
                  id='editInfoName'
                  value={infoUser.name}
                  onChange={(e) =>
                    setInfoUser((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
              </div>

              <div className='mb-3'>
                <label
                  htmlFor='editInfoAddress'
                  className='form-label'
                >
                  Adress
                </label>
                <input
                  ref={refAddress}
                  type='text'
                  placeholder='Adress'
                  className='form-control'
                  id='editInfoAddress'
                  value={infoUser.address}
                  onChange={(e) =>
                    setInfoUser((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                />
              </div>

              <div className='mb-3'>
                <label
                  htmlFor='editInfoPhone'
                  className='form-label'
                >
                  Phone
                </label>
                <input
                  ref={refPhone}
                  type='number'
                  placeholder='Phone'
                  className='form-control'
                  id='editInfoPhone'
                  value={infoUser.phone}
                  onChange={(e) => {
                    setInfoUser((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-success'
                data-bs-dismiss='modal'
                onClick={() => handleClickEdit(infoUser)}
              >
                Edit
              </button>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
                onClick={handleClickClose}
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
