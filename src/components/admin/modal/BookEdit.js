import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

export default function BookEdit({
  inputEditBook,
  setInputEditBook,
  handleEditBookClick,
  renderOptions,
  showEdit,
  onHideEdit,
}) {
  const [base64String, setBase64String] = useState(
    'https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg'
  );

  useEffect(() => {
    // console.log('edt', inputEditBook);
    inputEditBook.imageName && setBase64String(inputEditBook.imageName);
  }, [inputEditBook]);

  const handleOnChangeImage = (e) => {
    const file = e.target.files[0];
    setInputEditBook({ ...inputEditBook, image: file });

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
      <Modal
        show={showEdit}
        onHide={onHideEdit}
        backdrop='static'
        size='lg'
      >
        <Form>
          <Modal.Header>
            <Modal.Title className='text-dark fw-bold mx-auto h3'>Cập nhật</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group className='mb-3'>
              <Row>
                <Col>
                  <Form.Label>Book Title</Form.Label>
                  <Form.Control
                    placeholder='Book Title'
                    value={inputEditBook.title}
                    onChange={(e) => setInputEditBook({ ...inputEditBook, title: e.target.value })}
                  />
                </Col>
                <Col>
                  <Form.Label>Book Author</Form.Label>
                  <Form.Control
                    value={inputEditBook.author}
                    onChange={(e) =>
                      setInputEditBook((prev) => ({
                        ...prev,
                        author: e.target.value,
                      }))
                    }
                  />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Book description</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                placeholder='Description'
                value={inputEditBook.description}
                onChange={(e) =>
                  setInputEditBook({ ...inputEditBook, description: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Row>
                <Col>
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    value={inputEditBook.category?.categoryId}
                    onChange={(e) =>
                      setInputEditBook({ ...inputEditBook, categoryId: e.target.value })
                    }
                  >
                    {renderOptions()}
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    size='sm'
                    type='number'
                    className='form-control'
                    min={0}
                    value={inputEditBook.price}
                    onChange={(e) => setInputEditBook({ ...inputEditBook, price: e.target.value })}
                  />
                </Col>
                <Col>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    size='sm'
                    type='number'
                    className='form-control'
                    min={0}
                    value={inputEditBook.quantity}
                    onChange={(e) =>
                      setInputEditBook({ ...inputEditBook, quantity: e.target.value })
                    }
                  />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group
              className='mb-3 text-center overflow-hidden mx-auto'
              style={{ width: '200px' }}
            >
              <img
                src={base64String}
                alt='hinh anh'
                style={{ width: '100%' }}
              />
              <Form.Label
                htmlFor='customFile2'
                className='btn btn-info btn-sm mt-3'
              >
                Choose file
              </Form.Label>
              <Form.Control
                size='sm'
                type='file'
                className='form-control d-none'
                id='customFile2'
                onChange={handleOnChangeImage}
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant='success'
              type='submit'
              onClick={handleEditBookClick}
            >
              Edit
            </Button>
            <Button
              variant='secondary'
              onClick={() => onHideEdit()}
            >
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
