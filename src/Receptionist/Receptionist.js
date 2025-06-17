import React, { useEffect, useState } from 'react';
import {
  Row, Col, Form, Input, Button, Typography, Select, message, TimePicker
} from 'antd';
import './Receptionist.css';
import logo from '../image/logo.png';
import dayjs from 'dayjs';

const { Title } = Typography;
const { Option } = Select;

const Receptionist = () => {
  const [form] = Form.useForm();
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch('https://barnard-backend-4c067cwnf-komal-anums-projects.vercel.app/api/doctor-name');
        const data = await res.json();

        if (Array.isArray(data.doctors)) {
          const uniqueDoctors = [];
          const seen = new Set();

          data.doctors.forEach((doc) => {
            if (!seen.has(doc.doctor_id)) {
              seen.add(doc.doctor_id);
              uniqueDoctors.push(doc);
            }
          });

          setDoctors(uniqueDoctors);
        } else {
          message.error('Failed to fetch doctor list.');
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
        message.error('Error fetching doctors.');
      }
    };

    fetchDoctors();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const appointmentTimeISO = values.appointmentTime
        ? dayjs().hour(values.appointmentTime.hour()).minute(values.appointmentTime.minute()).second(0).toISOString()
        : null;

      const response = await fetch('https://barnard-backend-5mf5hfful-komal-anums-projects.vercel.app/api/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.patientName,
          phone_number: values.phone,
          address: values.address,
          age: parseInt(values.age),
          gender: values.gender,
          disease: values.disease,
          doctor_id: values.doctor,
          appointment_time: appointmentTimeISO,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        message.success('Patient added successfully!');
        form.resetFields();
      } else {
        message.error(data.error || 'Failed to add patient.');
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('Server error!');
    }
  };

  return (
    <Row justify="center" align="middle" className="signup-container">
      <Col xs={24} md={12} className="left-section">
        <img src={logo} alt="Pharmasenz Logo" className="logo large-logo" />
      </Col>

      <Col xs={24} md={12} className="right-section">
        <div className="form-container">
          <Title level={3}>Add Patient Information</Title>

          <Form layout="vertical" form={form} onFinish={handleSubmit}>
            <Form.Item
              name="patientName"
              label="Patient Name"
              rules={[{ required: true, min: 3, message: 'Name must be at least 3 characters!' }]}
            >
              <Input placeholder="Enter patient name" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[{ required: true, pattern: /^[0-9]{10,15}$/, message: 'Enter a valid phone number' }]}
            >
              <Input placeholder="Enter phone number" />
            </Form.Item>

            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, min: 5, message: 'Address must be at least 5 characters!' }]}
            >
              <Input placeholder="Enter address" />
            </Form.Item>

            <Form.Item
              name="age"
              label="Age"
              rules={[{ required: true, message: 'Enter a valid age' }]}
            >
              <Input type="number" placeholder="Enter age" />
            </Form.Item>

            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true, message: 'Select gender' }]}
            >
              <Select placeholder="Select gender">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="disease"
              label="Disease"
              rules={[{ required: true, min: 3, message: 'Disease must be at least 3 characters!' }]}
            >
              <Input placeholder="Enter disease" />
            </Form.Item>

            <Form.Item
              name="appointmentTime"
              label="Appointment Time"
              rules={[{ required: true, message: 'Please select an appointment time' }]}
            >
              <TimePicker use12Hours format="h:mm A" className="w-100" />
            </Form.Item>

            <Form.Item
              name="doctor"
              label="Select Doctor"
              rules={[{ required: true, message: 'Please select a doctor' }]}
            >
              <Select placeholder="Select a doctor">
                {doctors.map((doc) => (
                  <Option key={doc.doctor_id} value={doc.doctor_id}>
                    {doc.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block className="signup-button">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default Receptionist;
