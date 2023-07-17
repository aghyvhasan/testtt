import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import { Row, Col, Button, Modal, Checkbox, Divider } from "antd";
import { RiCheckboxCircleFill, RiCodeSSlashLine } from "react-icons/ri";
import { apiService } from "../../../../apiService"

export default function Summary(props) {
  const { content, totalItem, totalPrice, stepUrl, cartItems, isOrderDetailComp } = props
  const [checkedCode, setCheckedCode] = useState(false);
  const [codeClass, setCodeClass] = useState(false);

  const summaryOtherPrice = {
    delivery: 0,
    tax: 7.80,
    insurance: 1,
  }

  // Modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  function toggleChecked() {
    setTimeout(() => setCodeClass(!codeClass), 100);
    setCheckedCode(!checkedCode);
  }

  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  const onOrderClick = async () => {
    if (!isOrderDetailComp) {
      const dataItems = cartItems.cartItems.map(({ idLottery, ticketQty, idCartItem }) => ({ idLottery, ticketQty, idCartItem }));
      await apiService.post('order/createOrder', { orderedTickets: dataItems })
    }
  };

  return (
    <Col lg={6} span={24}>
      <div className="hp-p-24 hp-border-radius hp-border-1 hp-border-color-black-40 hp-border-color-dark-80 hp-bg-color-black-0 hp-bg-color-dark-100">
        <h3 className="hp-mb-0 hp-text-color-black-80 hp-text-color-dark-0">Summary</h3>
        {
          content && (
            <>
              <Divider className="hp-my-16" />

              <h4 className="hp-mb-8 hp-mt-16 hp-text-color-black-80 hp-text-color-dark-0">Edward Yıldırım</h4>

              <p className="hp-mb-12 hp-badge-text hp-font-weight-400 hp-text-color-black-60 hp-text-color-dark-40">
                70  Thompsons Lane / MELDON NE61 2YD
              </p>

              <a href="mailto:edward@example.com" className="hp-transition hp-hover-text-color-primary-1 hp-hover-text-color-dark-primary-2 hp-d-block hp-mb-12 hp-badge-text hp-font-weight-400 hp-text-color-black-60 hp-text-color-dark-40">
                edward@example.com
              </a>

              <a href="tel:07877856649" className="hp-transition hp-hover-text-color-primary-1 hp-hover-text-color-dark-primary-2 hp-d-block hp-badge-text hp-font-weight-400 hp-text-color-black-60 hp-text-color-dark-40">
                078 7785 6649
              </a>

              <Divider className="hp-my-16" />
            </>
          )
        }

        <Row className="hp-mt-8">
          <Col span={24} className="hp-mt-8">
            <Row align="middle" justify="space-between">
              <Col span={12} className="hp-input-description hp-text-color-black-80 hp-text-color-dark-30">Subtotal</Col>
              <Col span={12} className="hp-text-right hp-p1-body hp-font-weight-500 hp-text-color-primary-1">
                ${totalPrice}
              </Col>
            </Row>
          </Col>

          <Col span={24} className="hp-mt-8">
            <Row align="middle" justify="space-between">
              <Col span={12} className="hp-input-description hp-text-color-black-80 hp-text-color-dark-30">Tax</Col>
              <Col span={12} className="hp-text-right hp-p1-body hp-font-weight-500 hp-text-color-primary-1">
                {/* {
                  summaryOtherPrice.tax === 0 ? (
                    <>Free</>
                  ) : (
                    <>
                      ${summaryOtherPrice.tax}
                    </>
                  )
                } */}
                0
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="hp-mt-16">
          <Col span={24}>
            <Row align="middle" justify="space-between">
              <Col span={12} className="h5 hp-font-weight-500 hp-text-color-primary-1">Total</Col>
              <Col span={12} className="h5 hp-text-right hp-p1-body hp-font-weight-500 hp-text-color-primary-1">
                ${
                  totalPrice +
                  summaryOtherPrice.delivery +
                  summaryOtherPrice.tax +
                  summaryOtherPrice.insurance
                }
              </Col>
            </Row>
          </Col>
          {/* This checkbox below,  will be available just for checkout page */}
          {!isOrderDetailComp ? (
            <Col span={24}>
              <br />
              <Checkbox onChange={onChange}>
                <div>
                  I have read and approve   <a href="#">Terms&Conditions</a>
                </div>
              </Checkbox>
            </Col>) : ''
          }
          <Col span={24} className="hp-mt-24">
            <Button type="primary" block>
              <Link to={{
                pathname: '/apps/ecommerce/checkout',
                cartItems: { cartItems }
              }} onClick={() => onOrderClick()}  >Next Step</Link>
            </Button>
            {/* {
              stepUrl ? (
                <Button type="primary" block>
                  <Link to={stepUrl}>Next Step</Link>
                </Button>
              ) : (
                <>
                  <Button
                    type="primary"
                    block
                    onClick={showModal}
                  >
                    Next Step
                  </Button>

                  <Modal
                    title={null}
                    width={416}
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={null}
                    closable={false}
                    centered
                  >
                    <div className="hp-text-center">
                      <div className="hp-mb-8">
                        <RiCheckboxCircleFill className="hp-text-color-success-1" size={86} />
                      </div>

                      <span className="h1 hp-d-block hp-mb-8">Success</span>

                      <p className="hp-mb-0 hp-p2-body hp-font-weight-500 hp-text-color-black-80">
                        Payment received successfully
                      </p>
                    </div>
                  </Modal>
                </>
              )
            } */}
          </Col>
        </Row>
      </div>
    </Col>
  )
}