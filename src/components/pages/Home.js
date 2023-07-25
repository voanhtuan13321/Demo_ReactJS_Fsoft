import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import dataDanhMuc from '../../common/data-danhmuc.json';
import { path } from '../../router/router';

export default function Home() {
  useEffect(() => {
    window.document.title = 'Home';
    window.scrollTo(0, 0);
  }, []);

  // render select danh muc
  const renderDanhMuc = () => {
    return dataDanhMuc.map((danhMuc) => {
      return (
        <div
          key={danhMuc.id}
          className='col-12 col-md-4 p-5 mt-3 text-center p-1'
        >
          <div
            className='border'
            style={{ overflow: 'hidden' }}
          >
            <Link
              to={`${path.product}?idDanhMuc=${danhMuc.id}`}
              className='custom-hover'
            >
              <img
                src={`/img/${danhMuc.image}`}
                className='img-fluid border custom-hover'
                alt={danhMuc.name}
              />
            </Link>
            <h5 className='text-center mt-3 mb-3'>{danhMuc.name}</h5>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <section className='bg-success py-5'>
        <div className='align-items-center py-5'>
          <div className='text-white py-5'>
            <p className='text-center h2 py-4'>Welcome to the Book-Shop</p>
            <h1 className='text-center h1 py-4'>IT'S NICE TO MEET YOU</h1>
          </div>
        </div>
      </section>

      <section className='container py-5'>
        <div className='row text-center pt-3'>
          <div className='col-lg-6 m-auto'>
            <h1 className='h1'>Loại sách của shop</h1>
            <p>Dưới đây là một số loại sách mà shop bán</p>
          </div>
        </div>
        <div className='row'>{renderDanhMuc()}</div>
      </section>
    </>
  );
}
