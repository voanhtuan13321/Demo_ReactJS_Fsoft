import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';

const INIT_IMAGE = 'https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg';

export default function BookAdd({ renderOptions, formik, show, onHide, statusModal }) {
  const [base64String, setBase64String] = useState(INIT_IMAGE);

  useEffect(() => {
    const { image } = formik.values;
    if (!image) {
      setBase64String(INIT_IMAGE);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    } else {
      image && setBase64String(image);
    }
  }, [formik.values]);

  const handleOnChangeImage = (e) => {
    const file = e.target.files[0];
    formik.setFieldValue('image', file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setBase64String(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop='static'
      size='lg'
    >
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header>
          <Modal.Title className='text-dark fw-bold mx-auto h3'>Thêm mới</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className='mb-3'>
            <Row>
              <Col>
                <Form.Label>Book Title</Form.Label>
                <Form.Control
                  placeholder='Book Title'
                  {...formik.getFieldProps('title')}
                />
                <Form.Text className='text-danger'>{formik.errors.title}</Form.Text>
              </Col>
              <Col>
                <Form.Label>Book Author</Form.Label>
                <Form.Control
                  placeholder='Book Author'
                  {...formik.getFieldProps('author')}
                />
                <Form.Text className='text-danger'>{formik.errors.author}</Form.Text>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Book description</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              placeholder='Description'
              {...formik.getFieldProps('description')}
            />
            <Form.Text className='text-danger'>{formik.errors.description}</Form.Text>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Row>
              <Col>
                <Form.Label>Category</Form.Label>
                <Form.Select {...formik.getFieldProps('categoryId')}>{renderOptions()}</Form.Select>
                <Form.Text className='text-danger'>{formik.errors.categoryId}</Form.Text>
              </Col>
              <Col>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  size='sm'
                  type='number'
                  className='form-control'
                  min={0}
                  {...formik.getFieldProps('price')}
                />
                <Form.Text className='text-danger'>{formik.errors.price}</Form.Text>
              </Col>
              <Col>
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  size='sm'
                  type='number'
                  className='form-control'
                  min={0}
                  {...formik.getFieldProps('quantity')}
                />
                <Form.Text className='text-danger'>{formik.errors.quantity}</Form.Text>
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
            <Form.Text className='text-danger'>{formik.errors.image}</Form.Text>
            <Form.Control
              size='sm'
              type='file'
              className='form-control d-none'
              id='customFile2'
              onChange={(e) => handleOnChangeImage(e)}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant='success'
            type='submit'
          >
            Add
          </Button>
          <Button
            variant='secondary'
            onClick={() => {
              formik.resetForm();
              setBase64String(INIT_IMAGE);
              onHide();
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
