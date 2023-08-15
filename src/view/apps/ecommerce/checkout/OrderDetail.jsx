import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Row, Col, Steps, Empty, Button } from "antd";
import BreadCrumbs from '../../../../layout/components/content/breadcrumbs';
import OrderProduct from './OrderProduct';
import Summary from './Summary';
import EmptyImage from '../../../../assets/images/apps/ecommerce/checkout-empty.svg';
// import Bulb from "../../../../assets/images/pages/landing/light-bulb-color-icon.svg";
import { apiService } from "../../../../apiService"

const { Step } = Steps;

export default function OrderDetail(props) {
  const { totalItem, totalPrice } = props
  const cart = useSelector(state => state.ecommerce.cart)
  const [dataSource, setDataSource] = useState([]);


  //Fetch Related Data
  useEffect(() => {
    const cartItems = async () => {
      try {
        const cartItems = await apiService.get(`carts/getCartItems`);
        setDataSource(cartItems.data);
      } catch (error) {
        console.log(error);
      }
    };
    cartItems();
  }, []);

  const onRemoveCartItem = async (id) => {
    const leftCartItemCount = await apiService.post('carts/deleteCartItem/' + id);
    setDataSource(dataSource.filter(o => o.idCartItem != id))
  };
  const updateDataSource = (updatedValue) => {
    // Find the index of the updated value in the dataSource
    const index = dataSource.findIndex((item) => item.idCartItem === updatedValue.idCartItem);

    if (index !== -1) {
      // If the item is found, update the dataSource with the updated value
      const updatedDataSource = [...dataSource];
      updatedDataSource[index] = updatedValue;
      setDataSource(updatedDataSource);
    }
  };

  return (
    <Row className="hp-ecommerce-app-checkout hp-mb-32">
      <Col span={24}>
        <Row>
          <div className='pageTitle'>
            CART
          </div>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={[32, 32]}>
          <Col lg={18} span={24}>
            {
              cart.length !== 0 && (
                <>
                </>
              )
            }
            <Row gutter={[32, 32]}>
              <Col span={24}>
                <div className="hp-p-sm-16 hp-p-24 hp-border-radius hp-border-1 hp-border-color-black-40 hp-border-color-dark-80 hp-bg-color-black-0 hp-bg-color-dark-100">
                  <Row align="middle" justify="space-between">
                    <Col md={3} span={24}>
                      <Row align="middle">
                        <Col flex="0 0 185px" className="hp-ecommerce-app-checkout-item-img">
                          <div className='checkoutLotteryTicket'>
                            <img src={Bulb} alt="React Logo" />
                          </div>
                        </Col>
                      </Row>
                    </Col>

                    <Col md={20} span={24} className="hp-mt-sm-64 hp-ecommerce-app-checkout-info">
                      <Row align="middle" justify="end">
                        <p className='checkoutTips'>Don't forget that in Cryptolottery we have fixed number of tickets for each lotteries.You can increase your chance of winning by purchasing more tickets.It is one of the most popular way among lottery players. So, it would be better keep in mind</p>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
            <br />
            <Row gutter={[32, 32]}>
              {
                dataSource.length !== 0 && (
                  dataSource.map((value) => (
                    <OrderProduct key={value.idCartItem} onRemoveCartItem={onRemoveCartItem} value={value} updateDataSource={updateDataSource} valueQty={value.qty} />
                  ))
                )
              }
            </Row>
          </Col>
          {
            cart.length !== 0 ? (
              <Summary
                totalItem={totalItem}
                totalPrice={totalPrice}
                isOrderDetailComp={true}
                cartItems={dataSource}
                stepUrl='/apps/ecommerce/address-information'
              />
            ) : (
              <Col span={24}>
                <Empty
                  className="hp-mt-32"
                  image={EmptyImage}
                  imageStyle={{
                    height: 160,
                  }}
                  description={
                    <h5>Your bag is empty</h5>
                  }
                >
                  <Button type="primary">
                    <Link to="/apps/ecommerce/shop">Go to shop list</Link>
                  </Button>
                </Empty>
              </Col>
            )
          }
        </Row>
      </Col>
    </Row>
  )
}