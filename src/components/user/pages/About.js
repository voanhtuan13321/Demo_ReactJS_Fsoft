import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

export default function About() {
  useEffect(() => {
    window.document.title = 'About Us';
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className='bg-success py-5'>
        <Container>
          <div className='align-items-center py-5'>
            <div className='text-white'>
              <h1 className='text-center'>About Us</h1>
              <p className='text-center'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Container className='py-5'>
        <div className='text-center pt-5 pb-3'>
          <div className='m-auto'>
            <h1 className='h1'>Our Services</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod Lorem ipsum
              dolor sit amet.
            </p>
          </div>
        </div>
        <Row>
          <Col md={3}>
            <div className='h-100 py-5 services-icon-wap shadow'>
              <div className='h1 text-success text-center'>
                <i className='fa fa-truck fa-lg'></i>
              </div>
              <h2 className='h5 mt-4 text-center'>Delivery Services</h2>
            </div>
          </Col>

          <Col md={3}>
            <div className='h-100 py-5 services-icon-wap shadow'>
              <div className='h1 text-success text-center'>
                <i className='fas fa-exchange-alt'></i>
              </div>
              <h2 className='h5 mt-4 text-center'>Shipping & Return</h2>
            </div>
          </Col>

          <Col md={3}>
            <div className='h-100 py-5 services-icon-wap shadow'>
              <div className='h1 text-success text-center'>
                <i className='fa fa-percent'></i>
              </div>
              <h2 className='h5 mt-4 text-center'>Promotion</h2>
            </div>
          </Col>

          <Col md={3}>
            <div className='h-100 py-5 services-icon-wap shadow'>
              <div className='h1 text-success text-center'>
                <i className='fa fa-user'></i>
              </div>
              <h2 className='h5 mt-4 text-center'>24 Hours Service</h2>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
