import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Form, Input, Button } from "antd";
import LeftContent from "../leftContent";
import Footer from "../footer";
import { useHistory } from "react-router-dom";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

export default function SignUp() {
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (values) => {
    const firstName = values.firstName;
    const lastName = values.lastName;
    const userName = values.userName;
    const email = values.email;
    const password = values.password;
    const confirmPass = values.confirmPassword;
    const isLocked = false;
    const lockReason = "none";
    const photo = "none";

    if (password !== confirmPass) {
      form.setFields([
        {
          name: "confirmPassword",
          errors: ["Passwords do not match"],
        },
      ]);
      return; // Stop form submission
    }

    // Make the POST request to the specific URL using the email value
    fetch("https://localhost:7246/api/User/create", {
      method: "POST",
      body: JSON.stringify({ firstName, lastName, userName, email, password, isLocked, lockReason, photo }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data here
        console.log(data);
        history.push("/main/dashboard/ecommerce");
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        setError("Please make sure you entered all the fields as requested.");
      });
  };

  const [form] = Form.useForm();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateUsername = (_, value) => {
    if (value && value.includes(" ")) {
      return Promise.reject(new Error("Username cannot contain spaces"));
    }
    return Promise.resolve();
  };

  return (
    <Row gutter={[32, 0]} className="hp-authentication-page">
      <LeftContent />

      <Col lg={12} span={24} className="hp-py-sm-0 hp-py-md-64">
        <Row className="hp-h-100" align="middle" justify="center">
          <Col
            xxl={11}
            xl={15}
            lg={20}
            md={20}
            sm={24}
            className="hp-px-sm-8 hp-pt-24 hp-pb-48"
          >
            <span className="hp-d-block hp-p1-body hp-text-color-dark-0 hp-text-color-black-100 hp-font-weight-500 hp-mb-6">SIGN UP FOR FREE</span>
            <h1>Create Account</h1>
            <p className="hp-mt-8 hp-text-color-black-60">
              Please sign up to your personal account if you want to use all our
              premium products.
            </p>

            <Form
              layout="vertical"
              name="basic"
              className="hp-mt-sm-16 hp-mt-32"
              form={form}
              onFinish={handleSubmit}
            >
              <Form.Item label="First name :" name="firstName" rules={[
                {
                  required: true,
                  message: "Please enter your First name",
                },
              ]}>
                <Input placeholder="Enter your First name" />
              </Form.Item>

              <Form.Item label="Last name :" name="lastName" rules={[
                {
                  required: true,
                  message: "Please enter your Last name",
                },
              ]}>
                <Input placeholder="Enter your Last name" />
              </Form.Item>

              <Form.Item label="Username :" name="username" rules={[
                {
                  required: true,
                  message: "Please enter your username",
                },
                {
                  validator: validateUsername,
                },
              ]}>
                <Input placeholder="Enter your username" />
              </Form.Item>

              <Form.Item
                label="Email :"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please enter your email address",
                  },
                  {
                    type: "email",
                    message: "Please enter a valid email address",
                  },
                ]}
              >
                <Input placeholder="Enter your email address" type="email" />
              </Form.Item>

              <Form.Item
                label="Password :"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your password",
                  },
                ]}
              >
                <Input.Password
                  placeholder="Enter your password"
                  iconRender={(visible) =>
                    visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>

              <Form.Item
                label="Confirm assword :"
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Passwords do not match")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  placeholder="Confirm your Password"
                  iconRender={(visible) =>
                    visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>

              <Form.Item className="hp-mt-16 hp-mb-8">
                <Button block type="primary" htmlType="submit">
                  Sign up
                </Button>
              </Form.Item>
            </Form>

            <div className="hp-form-info hp-text-center">
              <span className="hp-text-color-black-80 hp-text-color-dark-40 hp-caption hp-mr-4">
                Already have an account?
              </span>

              <Link
                to="/pages/authentication/login"
                className="hp-text-color-primary-1 hp-text-color-dark-primary-2 hp-caption"
              >
                Login
              </Link>
            </div>
            <Footer />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};