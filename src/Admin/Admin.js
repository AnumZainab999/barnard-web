import React from 'react';
import {
  Row, Col, Form, Input, Button, Typography
} from 'antd';
import './Admin.css';
import logo from '../image/logo.png';

const { Title } = Typography;

const Admin = () => {
  return (
    <Row justify="center" align="middle" className="signup-container">
      <Col xs={24} md={12} className="left-section">
        <img src={logo} alt="Pharmasenz Logo" className="logo large-logo" />
      </Col>

      <Col xs={24} md={12} className="right-section">
        <div className="form-container">
          <Title level={3}>Add Doctor Profile</Title>

          <Form layout="vertical">
            {/* First Section */}
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, min: 3, message: 'Name must be at least 3 characters!' }]}
            >
              <Input placeholder="Enter doctor's name" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email Address"
              rules={[{ required: true, type: 'email', message: 'Enter a valid email' }]}
            >
              <Input placeholder="Enter email address" />
            </Form.Item>

            <Form.Item
              name="hospital"
              label="Hospital"
              rules={[{ required: true, min: 3, message: 'Hospital name must be at least 3 characters!' }]}
            >
              <Input placeholder="Enter hospital name" />
            </Form.Item>

            <Form.Item
              name="degree"
              label="Degree Name"
              rules={[{ required: true, min: 3, message: 'Degree must be at least 3 characters!' }]}
            >
              <Input placeholder="Enter degree name" />
            </Form.Item>

            {/* Divider Section */}
            <Title level={4} style={{ marginTop: '30px' }}>Assign Doctor ID & Password</Title>

            <Form.Item
              name="doctorId"
              label="Doctor ID"
              rules={[{ required: true, min: 1, message: 'Doctor ID must be provided' }]}
            >
              <Input placeholder="Enter doctor ID" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, min: 8, message: 'Password must be at least 8 characters!' }]}
            >
              <Input.Password placeholder="Enter password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" block className="signup-button">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default Admin;
