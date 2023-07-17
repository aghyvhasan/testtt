import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeFromCart, adjustItemQty, loadCurrentItem } from '../../../../redux/ecommerce/ecommerceActions';
import { RiCheckboxCircleFill } from "react-icons/ri";
import { Card, Row, InputNumber, Col, Button, Modal } from "antd";
import { RiCloseFill, RiCodeSSlashLine } from "react-icons/ri";
import { apiService } from "../../../../apiService"

export default function OrderProduct(props) {
  const { value, valueQty, onRemoveCartItem, updateDataSource } = props
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch()
  const [isMounted, setIsMounted] = useState(false); // Flag to track component mount

  // Qty
  const [input, setInput] = useState(value.ticketQty);
  const isInitialMount = useRef(true); // Ref to track initial mount

  useEffect(() => {
    // Ignore the API request on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false; // Set the flag to false after the initial mount
      return;
    }

    const request = async () => {
      await apiService.post("carts/updateCartItemQty", { IdLottery: value.idLottery, Qty: input });
    };
    request();
  }, [input, value.idLottery]);

  const onChangeHandler = async (e, id) => {
    value.ticketQty = e;
    updateDataSource(value);
    setInput(e);
    dispatch(adjustItemQty(id, e))
  };

  // const onRemoveCartItemClick = async (id) => {
  //   const leftCartItemCount = await apiService.post('carts/deleteCartItem/' + id);
  //   dispatch(removeFromCart(id))

  // };
  // Price Split
  // const discountSplit1 = value.discount.toString().split('.')[0];
  // const discountSplit2 = value.discount.toString().split('.')[1];

  // const priceSplit1 = value.price.toString().split('.')[0];
  // const priceSplit2 = value.price.toString().split('.')[1];

  return (
    <Col span={24}>
      <div className="hp-p-sm-16 hp-p-24 hp-border-radius hp-border-1 hp-border-color-black-40 hp-border-color-dark-80 hp-bg-color-black-0 hp-bg-color-dark-100">
        <Row align="middle" justify="space-between">
          <Col md={13} span={24}>
            <Row align="middle">
              <Col flex="0 0 185px" className="hp-ecommerce-app-checkout-item-img">
                <div className='checkoutLotteryTicket'>
                  {value.lotteryCode}
                </div>
              </Col>
            </Row>
          </Col>

          <Col md={11} span={24} className="hp-mt-sm-24 hp-ecommerce-app-checkout-info">
            <Row align="middle" justify="end">
              <Col>
                <InputNumber
                  min={1}
                  max={value.leftTicketQty}
                  // value={valueQty}
                  value={value.ticketQty}
                  onChange={(e) => onChangeHandler(e, value.id)}

                />

                <div
                  className="hp-cursor-pointer hp-mt-4 hp-caption hp-text-color-black-60 hp-text-underline"
                  onClick={() => onRemoveCartItem(value.idCartItem)}
                >
                  Remove Item
                </div>
              </Col>

              <Col className="hp-text-right hp-ml-64">
                {/* <div className="h2 hp-text-color-black-80 hp-text-color-dark-30">
                  {
                    value.discount ? (
                      <span>
                        {discountSplit1}.
                        <sup style={{ top: -6 }}>
                          {discountSplit2}
                        </sup>
                      </span>
                    ) : (
                      <span>
                        {priceSplit1}.
                        <sup style={{ top: -6 }}>
                          {priceSplit2}
                        </sup>
                      </span>
                    )
                  }
                </div> */}

                {/* {
                  value.freeShipping && (
                    <div className="hp-d-flex-center hp-mt-4 hp-caption hp-font-weight-400 hp-text-color-success-1 hp-text-underline">
                      <Col span={24}>
                        <p type="primary" onClick={() => setVisible(true)}>
                          Check Details
                        </p>

                        <Modal
                          title={<h5 className="hp-mb-0">#12345 Lottery Detail</h5>}
                          centered
                          open={visible}
                          onCancel={() => setVisible(false)}
                          width={400}
                          footer={null}
                          closeIcon={
                            <RiCloseFill
                              className="remix-icon hp-text-color-black-100 hp-text-color-dark-0"
                              size={24}
                            />
                          }
                        >
                          <div className="hp-p2-body">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
                            Aliquam vestibulum risus velit, ut placerat diam imperdiet nec
                          </div>
                        </Modal>
                      </Col>
                    </div>
                  )
                } */}
              </Col>
            </Row>
          </Col>
        </Row >
      </div >
    </Col >
  )
}