import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router";
import { Row, Col } from "antd";
import Detail from "./detail/Detail";
import OrderDetail from "./checkout/OrderDetail";
import AddressInformation from "./checkout/AddressInformation";
import Payment from "./checkout/Payment";
import PassedLotteryDetails from "./checkout/PassedLotteryDetails";
import OrderSuccess from "./checkout/OrderSuccess";
import Orders from "./checkout/Orders";
import InvoiceDetail from "./checkout/InvoiceDetail";
import Checkout from "./checkout/Checkout";

export default function Ecommerce() {
  const cart = useSelector((state) => state.ecommerce.cart);
  const current = useSelector((state) => state.ecommerce.currentItem);

  // Checkout Price
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItem, setTotalItem] = useState(0);

  useEffect(() => {
    let items = 0;
    let price = 0;

    cart.forEach((item) => {
      items += item.qty;
      price += item.qty * (item.discount ? item.discount : item.price);
    });

    setTotalItem(items);
    setTotalPrice(price);
  }, [cart, totalItem, totalPrice, setTotalItem, setTotalPrice]);

  return (
    <Row gutter={32} className="hp-ecommerce-app hp-mb-32">
      <Col span={24}>
        <Switch>
          <Route path="/apps/ecommerce/orders">
            <Orders />
          </Route>
          <Route path="/apps/ecommerce/invoiceDetail/:id">
            <InvoiceDetail />
          </Route>

          <Route path="/apps/ecommerce/passedLotteryDetails/:id">
            <PassedLotteryDetails />
          </Route>

          <Route path="/apps/ecommerce/orderSuccess">
            <OrderSuccess />
          </Route>

          <Route path="/apps/ecommerce/orderDetail">
            <OrderDetail totalItem={totalItem} totalPrice={totalPrice} />
          </Route>

          <Route path="/apps/ecommerce/address-information">
            <AddressInformation totalItem={totalItem} totalPrice={totalPrice} />
          </Route>

          <Route path="/apps/ecommerce/payment">
            <Payment totalItem={totalItem} totalPrice={totalPrice} />
          </Route>

          <Route path="/apps/ecommerce/checkout">
            <Checkout />
          </Route>

          <Route path="/apps/ecommerce/product-detail/:id">
            <Detail />
          </Route>

        </Switch>
      </Col>
    </Row>
  );
}