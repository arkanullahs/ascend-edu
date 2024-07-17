import React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import './banner.css';

const Banner = () => {
  const salesData = [
    { name: 'Jan', revenue: 4000, profit: 2400 },
    { name: 'Feb', revenue: 3000, profit: 1398 },
    { name: 'Mar', revenue: 9800, profit: 2000 },
    { name: 'Apr', revenue: 3908, profit: 2780 },
    { name: 'May', revenue: 4800, profit: 1890 },
    { name: 'Jun', revenue: 3800, profit: 2390 },
  ];

  const productSales = [
    { name: 'Jan', product1: 4000, product2: 2400 },
    { name: 'Feb', product1: 3000, product2: 2210 },
    { name: 'Mar', product1: 2000, product2: 2290 },
    { name: 'Apr', product1: 2780, product2: 2000 },
    { name: 'May', product1: 1890, product2: 2181 },
    { name: 'Jun', product1: 2390, product2: 2500 },
  ];

  return (
    <div className="banner">
      <h1 className="banner-heading">Our Metrics With Line Chart and Area Chart with Dummy Data</h1>
      <div className="chart-container">
        { }
        <div className="chart-card">
          <h2 className="chart-title">Line Chart</h2>
          <div className="chart-content">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={salesData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" />
                <Line type="monotone" dataKey="profit" stroke="#8b5cf6" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        { }
        <div className="chart-card">
          <h2 className="chart-title">Area Chart</h2>
          <div className="chart-content">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={productSales}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="product1" stroke="#3b82f6" fill="#3b82f6" />
                <Area type="monotone" dataKey="product2" stroke="#8b5cf6" fill="#8b5cf6" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
