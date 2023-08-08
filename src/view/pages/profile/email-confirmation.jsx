import React from "react";
import { Row, Col, Divider, Form, Input, Button } from "antd";

export default function EmailConfirmProfile() {
  const dividerClass = "hp-border-color-black-40 hp-border-color-dark-80";

  const handleSubmit = (values) => {
    const email = values.email;

    // Make the POST request to the specific URL using the email value
    fetch("https://cryptolotteryapi.azurewebsites.net/api/User/ConfirmEmail", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data here
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error(error);
      });
  };

  const [form] = Form.useForm();

  return (
    <Row>
      <Col span={24}>
        <h2>Confirm the email address</h2>
        <p className="hp-p1-body hp-mb-0">
          Set a unique password to protect your account.
        </p>
        <Divider className={dividerClass} />
      </Col>
      <Col xxl={5} xl={10} md={15} span={24}>
        <Form
          layout="vertical"
          name="basic"
          form={form}
          onFinish={handleSubmit}
        >
          <Form.Item
            label={
              <span className="hp-input-label hp-text-color-black-100 hp-text-color-dark-0">
                Your Email Address:
              </span>
            }
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
          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Send confirmation link
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
