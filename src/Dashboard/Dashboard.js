import React from 'react';
import { Row, Col, Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import logo from '../image/logo.png';

const { Title } = Typography;

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Row justify="center" align="middle" className="dashboard-container">
      <Col xs={22} sm={16} md={12} lg={8} className="dashboard-content" style={{ textAlign: 'center' }}>
        <img src={logo} alt="Pharmasenz Logo" style={{ width: '150px', marginBottom: '20px' }} />
        <Title level={3}>Welcome to Dashboard</Title>
        <Button type="primary" block style={{ marginBottom: '10px' }} onClick={() => navigate('/admin')}>
          Admin
        </Button>
        <Button type="default" block onClick={() => navigate('/receptionist')}>
          Receptionist
        </Button>
      </Col>
    </Row>
  );
};

export default Dashboard;
