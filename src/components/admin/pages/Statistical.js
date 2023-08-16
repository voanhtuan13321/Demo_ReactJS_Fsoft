import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Pie, Doughnut, Bar } from 'react-chartjs-2';
import {
  BarElement,
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from 'chart.js';

import axiosInstent, { pathApi } from '../../../config/axiosCustom';
import { formatPrice } from '../../../common/properties';

Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export default function Statistical() {
  const [months, setMonths] = useState([]);
  const [years, setYears] = useState([]);
  const [topGoodPrice, setTopGoodPrice] = useState({
    labels: [],
    datas: [],
  });
  const [topBestSelling, setTopBestSelling] = useState({
    labels: [],
    datas: [],
  });
  const [topUserBuyTheMost, setTopUserBuyTheMost] = useState({
    labels: [],
    datas: [],
  });
  const [statistical, setStatistical] = useState({
    labels: [],
    datas: [],
  });
  const [statisticalByYear, setStatisticalByYear] = useState(0);
  const [monthSelect, setMonthSelect] = useState(0);
  const [yearSelect, setYearSelect] = useState(0);

  useEffect(() => {
    window.document.title = 'Statistical';
    window.scrollTo(0, 0);

    generatePastMonths();
    generatePastYears(10);

    getTopGoodPriceFromApi();
    getTopBestSellingFromApi();
    getTopUserByTheMost();
    getStatistical(monthSelect, yearSelect);
    getStatisticalByYear(yearSelect);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderOption = (data) => {
    return data.map((d) => {
      return (
        <option
          key={d.value}
          value={d.value}
        >
          {d.text}
        </option>
      );
    });
  };

  const generatePastMonths = () => {
    const months = [];
    for (let i = 0; i < 12; i++) {
      months.push({
        value: i + 1,
        text: `Tháng ${i + 1}`,
      });
    }
    setMonths(months);
  };

  const generatePastYears = (numYears) => {
    const date = new Date();
    const currentYear = date.getFullYear();
    const years = [];

    for (let i = 0; i < numYears; i++) {
      const data = currentYear - i;
      years.push({
        value: data,
        text: data,
      });
    }

    setYears(years);
    setMonthSelect(date.getMonth() + 1);
  };

  const getTopGoodPriceFromApi = async () => {
    const response = await axiosInstent.get(pathApi.topGoodPrice);
    const result = await response.data;
    const labels = [];
    const datas = [];

    result.forEach((book) => {
      labels.push(book.title);
      datas.push(book.price);
    });

    setTopGoodPrice({
      ...topGoodPrice,
      labels,
      datas,
    });
  };

  const getTopBestSellingFromApi = async () => {
    const response = await axiosInstent.get(pathApi.topBestSelling);
    const result = await response.data;
    const labels = [];
    const datas = [];

    result.forEach((order) => {
      labels.push(order.book.title);
      datas.push(order.quantity);
    });

    setTopBestSelling({
      ...topBestSelling,
      labels,
      datas,
    });
  };

  const getTopUserByTheMost = async () => {
    const response = await axiosInstent.get(pathApi.topUserBuyTheMost);
    const result = await response.data;
    const labels = [];
    const datas = [];

    result.forEach((rs) => {
      labels.push(rs.user.name);
      datas.push(rs.quantity);
    });

    setTopUserBuyTheMost({
      ...topUserBuyTheMost,
      labels,
      datas,
    });
  };

  const getStatistical = async (m, y) => {
    const date = new Date();
    m === 0 && (m = date.getMonth() + 1);
    y === 0 && (y = date.getFullYear());
    const urlApi = `${pathApi.statistical}/${m}/${y}`;
    // console.log(m, y, urlApi);

    const response = await axiosInstent.get(urlApi);
    const result = await response.data;
    const labels = [];
    console.log(response);
    console.log(result);

    result.forEach((rs, index) => {
      labels.push(index + 1);
    });

    console.log(labels);
    setStatistical({
      ...statistical,
      labels,
      datas: result,
    });
  };

  const getStatisticalByYear = async (y) => {
    const date = new Date();
    y === 0 && (y = date.getFullYear());
    const urlApi = `${pathApi.statistical}/year/${y}`;
    // console.log(m, y, urlApi);

    const response = await axiosInstent.get(urlApi);
    const result = await response.data;
    setStatisticalByYear(result);
  };

  const sumTotalPrice = () => {
    const datas = statistical.datas;
    if (datas.length > 0) {
      return datas.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    } else {
      return 0;
    }
  };

  return (
    <Container fluid>
      <h1 className='h2 my-5 text-gray-800'>Statistical</h1>
      <Row className='mb-3'>
        <Col md={4}>
          <Card className='shadow h-100'>
            <Card.Header className='py-3 h3'>Sách bán chạy nhất</Card.Header>
            <Card.Body>
              <Pie
                data={{
                  labels: topBestSelling.labels,
                  datasets: [
                    {
                      label: 'Số lượng đã bán',
                      data: topBestSelling.datas,
                      backgroundColor: [
                        'rgba(255, 99, 132)',
                        'rgba(54, 162, 235)',
                        'rgba(255, 206, 86)',
                        'rgba(75, 192, 192)',
                        'rgba(153, 102, 255)',
                        'rgba(255, 159, 64)',
                      ],
                    },
                  ],
                }}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className='shadow h-100'>
            <Card.Header className='py-3 h3'>Sách có giá tốt nhất</Card.Header>
            <Card.Body>
              <Doughnut
                data={{
                  labels: topGoodPrice.labels,
                  datasets: [
                    {
                      label: 'Giá sách',
                      data: topGoodPrice.datas,
                      backgroundColor: [
                        'rgba(255, 99, 132)',
                        'rgba(54, 162, 235)',
                        'rgba(255, 206, 86)',
                        'rgba(75, 192, 192)',
                        'rgba(153, 102, 255)',
                        'rgba(255, 159, 64)',
                      ],
                    },
                  ],
                }}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className='shadow h-100'>
            <Card.Header className='py-3 h3'>Khách hàng mua sách nhiều nhất</Card.Header>
            <Card.Body className='d-flex align-items-center'>
              <Bar
                data={{
                  labels: topUserBuyTheMost.labels,
                  datasets: [
                    {
                      label: 'Số lượng sách',
                      data: topUserBuyTheMost.datas,
                      backgroundColor: 'rgba(54, 162, 235)',
                    },
                  ],
                }}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className='mb-5'>
        <Col>
          <Card className='shadow'>
            <Card.Header className='py-3 h3'>Thống kê doanh thu</Card.Header>
            <Card.Body>
              <Row>
                <Col md={2}>
                  <Form.Group className='my-2'>
                    <Form.Label>Tháng:</Form.Label>
                    <Form.Select
                      value={monthSelect}
                      onChange={(e) => {
                        const newMonth = Number(e.target.value);
                        setMonthSelect(newMonth);
                        getStatistical(newMonth, yearSelect);
                      }}
                    >
                      {renderOption(months)}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className='my-2'>
                    <Form.Label>Năm:</Form.Label>
                    <Form.Select
                      value={yearSelect}
                      onChange={(e) => {
                        const year = Number(e.target.value);
                        setYearSelect(year);
                        getStatistical(monthSelect, year);
                        getStatisticalByYear(year);
                      }}
                    >
                      {renderOption(years)}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className='my-2'>
                    <Form.Label>Tổng doanh thu tháng:</Form.Label>
                    <Form.Control
                      className='text-center'
                      readOnly
                      value={formatPrice(sumTotalPrice())}
                    />
                  </Form.Group>
                  <Form.Group className='my-2'>
                    <Form.Label>Tổng doanh thu năm:</Form.Label>
                    <Form.Control
                      className='text-center'
                      readOnly
                      value={formatPrice(statisticalByYear)}
                    />
                  </Form.Group>
                </Col>
                <Col md={10}>
                  <Bar
                    data={{
                      labels: statistical.labels,
                      datasets: [
                        {
                          label: 'Doanh thu',
                          data: statistical.datas,
                          backgroundColor: 'rgba(54, 162, 235)',
                        },
                      ],
                    }}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
