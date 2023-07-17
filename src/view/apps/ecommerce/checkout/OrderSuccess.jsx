import React from "react";
import { useSelector } from "react-redux";
import SuccessResult from "../../../../view/components/feedback/result/success";
import { Row, Col, Steps, Empty, Button } from "antd";

const { Step } = Steps;

export default function OrderSuccess(props) {
  const { totalItem, totalPrice } = props;
  const cart = useSelector((state) => state.ecommerce.cart);

  return (
    <Row gutter={[32, 32]} className="hp-mb-32">
      <Col span={24}>
        <SuccessResult />
      </Col>
    </Row>
  );
}
