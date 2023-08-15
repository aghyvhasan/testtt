import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Row, Col, Form, Input, Button, Checkbox, Alert } from "antd";
import LeftContent from "../leftContent";
import Footer from "../footer";
import { loginAction } from "../../../../mobx/auth/actions/loginAction";
import { observer } from "mobx-react-lite";
import authStates from "../../../../mobx/auth/authStates";

const Login = () => {
  const history = useHistory();
  const isAuthenticated=authStates.isAuth
  const error=authStates.error
  useEffect(() => {
    if (isAuthenticated) {
      history.push("/main/dashboard/ecommerce");
    }
  }, [isAuthenticated, history]);

  const handleSubmit = async (values) => {
    const email = values.email;
    const password = values.password;
    try {
      await loginAction(email, password);
      if (isAuthenticated) {
        history.push("/main/dashboard/ecommerce");
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
      authStates.setError("Invalid email or password");
    }
  };

  const [form] = Form.useForm();

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
            <h1 className="hp-mb-sm-0">Login</h1>
            <p className="hp-mt-sm-0 hp-mt-8 hp-text-color-black-60">
              Welcome back, please login to your account.
            </p>

            {error && (
              <Alert
                type="error"
                message={error}
                showIcon
                className="hp-mb-16"
              />
            )}

            <Form
              form={form}
              layout="vertical"
              name="basic"
              initialValues={{ remember: true }}
              className="hp-mt-sm-16 hp-mt-32"
              onFinish={handleSubmit}
            >
              <Form.Item
                label="Email :"
                className="hp-mb-16"
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
                className="hp-mb-8"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your Password",
                  },
                ]}
              >
                <Input.Password
                  placeholder="Enter your Password"
                  id="warning2"
                />
              </Form.Item>

              <Row align="middle" justify="space-between">
                <Form.Item className="hp-mb-0">
                  <Checkbox name="remember">Remember me</Checkbox>
                </Form.Item>

                <Link
                  className="hp-button hp-text-color-black-80 hp-text-color-dark-40"
                  to="/pages/authentication/recover-password"
                >
                  Forgot Password?
                </Link>
              </Row>

              <Form.Item className="hp-mt-16 hp-mb-8">
                <Button block type="primary" htmlType="submit">
                  Sign in
                </Button>
              </Form.Item>
            </Form>

            <Col className="hp-form-info hp-text-center">
              <span className="hp-text-color-black-80 hp-text-color-dark-40 hp-caption hp-font-weight-400 hp-mr-4">
                Don’t you have an account?
              </span>

              <Link
                className="hp-text-color-primary-1 hp-text-color-dark-primary-2 hp-caption"
                to="/pages/authentication/register"
              >
                Create an account
              </Link>
            </Col>
            <Footer />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default observer(Login)