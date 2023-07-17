import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Row, Col, Steps, Empty, Button } from "antd";
import BreadCrumbs from "../../../../layout/components/content/breadcrumbs";
import OrderProduct from "./OrderProduct";
import Summary from "./Summary";
import EmptyImage from "../../../../assets/images/apps/ecommerce/checkout-empty.svg";
import Bulb from "../../../../assets/images/pages/landing/light-bulb-color-icon.svg";
import netflixLogo from "../../../../assets/images/dasboard/netflix-logo.svg";
import netflixBg from "../../../../assets/images/dasboard/netflix-bg.svg";
import amazonBg from "../../../../assets/images/dasboard/amazon-bg.svg";
import amazonLogo from "../../../../assets/images/dasboard/amazon-logo.svg";
import SmallCardItem from "../../../main/widgets/cards/advance/smallCardItem";
import CreditCardNew from "../../../main/widgets/cards/advance/creditCardNew";

const { Step } = Steps;

export default function Checkout(props) {
  const { totalItem, totalPrice } = props;
  const { cartItems } = useLocation();

  const cart = useSelector((state) => state.ecommerce.cart);
  useEffect(() => {
    console.log(cartItems);

    return () => {
      console.log(cartItems);
    };
  }, []);
  return (
    <Row className="hp-ecommerce-app-checkout hp-mb-32">
      {/* <Col className="hp-mb-32" span={24}>
        <Row gutter={[32, 32]}>
          <BreadCrumbs
            breadCrumbParent="Applications"
            breadCrumbParent2="E-Commerce"
            breadCrumbActive="Checkout"
          />
        </Row>
      </Col> */}
      <Col span={24}>
        <Row>
          <div className="pageTitle">CHECKOUT</div>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={[32, 32]}>
          <Col lg={18} span={24}>
            {cart.length !== 0 && <></>}
            <Row gutter={[32, 32]}>
              {/* <Col lg={8} md={12} span={24}>
                <SmallCardItem
                  logo={paypalLogo}
                  bg={paypalBg}
                  number={1923}
                  value={1.90124527}
                  title="Paypal"
                />
              </Col> */}

              <Col lg={8} md={12} span={24}>
                <SmallCardItem
                  logo={netflixLogo}
                  bg={netflixBg}
                  number={1923}
                  value={1.90124528}
                  title="Netflix"
                />
              </Col>
              <Col lg={8} md={12} span={24}>
                <CreditCardNew />
              </Col>
              <Col lg={8} md={12} span={24}>
                <SmallCardItem
                  logo={amazonLogo}
                  bg={amazonBg}
                  number={1923}
                  value={1.90124593}
                  title="Amazon"
                />
              </Col>
              {/* 
              <Col lg={8} md={12} span={24}>
                <SmallCardItem
                  logo={googlePlayLogo}
                  bg={googlePlayBg}
                  number={1923}
                  value={1.90124529}
                  title="Google Play"
                />
              </Col> */}
            </Row>
            <br />
          </Col>

          {cart.length !== 0 ? (
            <Summary
              isOrderDetailComp={false}
              cartItems={cartItems}
              totalItem={totalItem}
              totalPrice={totalPrice}
              stepUrl="/apps/ecommerce/address-information"
            />
          ) : (
            <Col span={24}>
              <Empty
                className="hp-mt-32"
                image={EmptyImage}
                imageStyle={{
                  height: 160,
                }}
                description={<h5>Your bag is empty</h5>}
              >
                <Button type="primary">
                  <Link to="/">Go to shop list</Link>
                </Button>
              </Empty>
            </Col>
          )}
        </Row>
      </Col>
    </Row>
  );
}
