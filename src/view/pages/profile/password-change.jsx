import React, { useState } from "react";
import { Row, Col, Divider, Form, Input, Button } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

export default function PasswordProfile() {
  const history = useHistory();
  const dividerClass = "hp-border-color-black-40 hp-border-color-dark-80";
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (values) => {
    const oldPassword = values.oldPassword;
    const newPassword = values.newPassword;
    const repeatNewPass = values.repeatNewPassword;
    const userId = 1;

    if (newPassword !== repeatNewPass) {
      form.setFields([
        {
          name: "repeatNewPassword",
          errors: ["New passwords do not match"],
        },
      ]);
      return; // Stop form submission
    }

    // Make the POST request to the specific URL using the email value
    fetch("https://cryptolotteryapi.azurewebsites.net/api/User/ChangePassword", {
      method: "POST",
      body: JSON.stringify({ oldPassword, newPassword, userId }),
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
        setError("Error occurred while changing password");
      });
  };

  const [form] = Form.useForm();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Row>
      <Col span={24}>
        <h2>Change Password</h2>
        <p className="hp-p1-body hp-mb-0">
          Set a unique password to protect your account.
        </p>
        <Divider className={dividerClass} />
      </Col>
      <Col xxl={5} xl={10} md={15} span={24}>
        {error && <Alert type="error" message={error} showIcon className="hp-mb-16" />}
        <Form
          form={form}
          layout="vertical"
          name="basic"
          onFinish={handleSubmit}
        >
          <Form.Item
            label={
              <span className="hp-input-label hp-text-color-black-100 hp-text-color-dark-0">
                Old Password:
              </span>
            }
            name="oldPassword"
            rules={[
              {
                required: true,
                message: "Please enter your Old Password",
              },
            ]}
          >
            <Input.Password placeholder="Enter your Old Password" />
          </Form.Item>

          <Form.Item
            label={
              <span className="hp-input-label hp-text-color-black-100 hp-text-color-dark-0">
                New Password:
              </span>
            }
            name="newPassword"
            rules={[
              {
                required: true,
                message: "Please enter your New Password",
              },
            ]}
          >
            <Input.Password
              placeholder="Enter your New Password"
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="hp-input-label hp-text-color-black-100 hp-text-color-dark-0">
                Repeat New Password:
              </span>
            }
            name="repeatNewPassword"
            dependencies={["newPassword"]}
            rules={[
              {
                required: true,
                message: "Please repeat your New Password",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("New passwords do not match")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Repeat your New Password"
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Confirm
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
