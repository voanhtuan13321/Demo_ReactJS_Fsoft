import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';

export default function Contact() {
  useEffect(() => {
    window.document.title = 'Contact';
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Container
        fluid
        className='bg-light py-5'
      >
        <div className='m-auto text-center py-5'>
          <h1 className='h1'>Contact Us</h1>
          <p>
            Proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
            dolor sit amet.
          </p>
        </div>
      </Container>

      <Container>
        <Row className='py-5'>
          <form className='col-md-9 m-auto'>
            <Row>
              <div className='form-group col-md-6 mb-3'>
                <label htmlFor='inputname'>Name</label>
                <input
                  type='text'
                  className='form-control mt-1'
                  id='name'
                  name='name'
                  placeholder='Name'
                />
              </div>
              <div className='form-group col-md-6 mb-3'>
                <label htmlFor='inputemail'>Email</label>
                <input
                  type='email'
                  className='form-control mt-1'
                  id='email'
                  name='email'
                  placeholder='Email'
                />
              </div>
            </Row>
            <div className='mb-3'>
              <label htmlFor='inputsubject'>Subject</label>
              <input
                type='text'
                className='form-control mt-1'
                id='subject'
                name='subject'
                placeholder='Subject'
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='inputmessage'>Message</label>
              <textarea
                className='form-control mt-1'
                id='message'
                name='message'
                placeholder='Message'
                rows='8'
              ></textarea>
            </div>
            <Row>
              <div className='col text-end mt-2'>
                <button
                  type='submit'
                  className='btn btn-success btn-lg px-3'
                >
                  Let's Talk
                </button>
              </div>
            </Row>
          </form>
        </Row>
      </Container>
    </>
  );
}
