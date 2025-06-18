import React, { useEffect, useState } from 'react';
import {
  Row, Col, Form, Input, Button, Typography, Select, message, TimePicker, DatePicker
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
        const res = await fetch('https://barnard-backend-6wtk9m6un-komal-anums-projects.vercel.app/api/doctor-name');
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
      const appointment_date = dayjs(values.appointmentDate).format('YYYY-MM-DD');
      const appointment_time = dayjs(values.appointmentTime).format('HH:mm:ss');

      const response = await fetch('https://barnard-backend-6wtk9m6un-komal-anums-projects.vercel.app/api/create', {
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
          appointment_date,
          appointment_time,

          // New Fields
          initial_complaints: values.initial_complaints,
          medical_history: values.medical_history,
          family_history: values.family_history,
          social_history: values.social_history,
          on_medications: values.on_medications,
          vitals: values.vitals,
          allergies: values.allergies,
          surgeries: values.surgeries,
          location: values.location,
          professional: values.professional,
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
            <Form.Item name="patientName" label="Patient Name" rules={[{ required: true }]}>
              <Input placeholder="Enter patient name" />
            </Form.Item>

            <Form.Item name="phone" label="Phone Number" rules={[{ required: true }]}>
              <Input placeholder="Enter phone number" />
            </Form.Item>

            <Form.Item name="address" label="Address" rules={[{ required: true }]}>
              <Input placeholder="Enter address" />
            </Form.Item>

            <Form.Item name="age" label="Age" rules={[{ required: true }]}>
              <Input type="number" placeholder="Enter age" />
            </Form.Item>

            <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
              <Select placeholder="Select gender">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>

            <Form.Item name="disease" label="Disease" rules={[{ required: true }]}>
              <Input placeholder="Enter disease" />
            </Form.Item>

            <Form.Item name="appointmentDate" label="Appointment Date" rules={[{ required: true }]}>
              <DatePicker className="w-100" format="YYYY-MM-DD" />
            </Form.Item>

            <Form.Item name="appointmentTime" label="Appointment Time" rules={[{ required: true }]}>
              <TimePicker use12Hours format="h:mm A" className="w-100" />
            </Form.Item>

            <Form.Item name="doctor" label="Select Doctor" rules={[{ required: true }]}>
              <Select placeholder="Select a doctor">
                {doctors.map((doc) => (
                  <Option key={doc.doctor_id} value={doc.doctor_id}>
                    {doc.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/* New Fields */}
            <Form.Item name="initial_complaints" label="Initial Complaints">
              <Input.TextArea rows={2} placeholder="Fatigue and thirst" />
            </Form.Item>

            <Form.Item name="medical_history" label="Medical History">
              <Input.TextArea rows={2} placeholder="Type 2 diabetes for 5 years" />
            </Form.Item>

            <Form.Item name="family_history" label="Family History">
              <Input placeholder="Father had diabetes" />
            </Form.Item>

            <Form.Item name="social_history" label="Social History">
              <Input placeholder="Non-smoker, lives in city" />
            </Form.Item>

            <Form.Item name="on_medications" label="Current Medications">
              <Input placeholder="Metformin 500mg" />
            </Form.Item>

            <Form.Item name="vitals" label="Vitals">
              <Input placeholder="BP: 130/85, HR: 78" />
            </Form.Item>

            <Form.Item name="allergies" label="Allergies">
              <Input placeholder="None" />
            </Form.Item>

            <Form.Item name="surgeries" label="Surgeries">
              <Input placeholder="Appendectomy in 2010" />
            </Form.Item>

            <Form.Item name="location" label="Clinic Location">
              <Input placeholder="Gulberg Clinic" />
            </Form.Item>

            <Form.Item name="professional" label="Profession">
              <Input placeholder="Accountant" />
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
