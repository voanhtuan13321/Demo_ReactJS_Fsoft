import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

export default function CategoryModal({ formik, statusModal, show, onHide }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop='static'
    >
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header>
          <Modal.Title className='text-dark fw-bold mx-auto h3'>{statusModal}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className='mb-3'>
            <Form.Label>Category Name</Form.Label>
            <Form.Control {...formik.getFieldProps('categoryName')} />
            {formik.errors.categoryName && (
              <p className='text-danger mt-2'>{formik.errors.categoryName}</p>
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type='submit'
            variant='success'
          >
            {statusModal ?? ''}
          </Button>
          <Button
            variant='secondary'
            onClick={onHide}
          >
            Close
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
