import React, { useState } from "react";

import { Row, Col, Avatar, Button, Divider } from "antd";
import { TimeSquare } from "react-iconly";
import { RiHeartFill } from "react-icons/ri";

export default function HotBidItem(props) {
  const { item } = props

  // Wish Check
  const [wishCheck, setWishCheck] = useState(false)

  return (
    <div className="hp-border-radius-xxl hp-bg-black-0 hp-bg-dark-100 hp-border-1 hp-border-color-black-40 hp-border-color-dark-80 hp-p-16">
      <div className="hp-position-relative hp-border-radius-xxl hp-mb-24 hp-nft-dashboard-slider-item">
        {/* <div className="hp-position-absolute-top-left hp-w-100 hp-h-100 hp-border-radius-xxl" style={{
          backgroundImage: "url(" + item.bg + ")", backgroundSize: "cover", backgroundPosition: "center",
        }}></div> */}
        <div className="hotLotteriesCard hp-position-absolute-top-left hp-w-100 hp-h-100 hp-border-radius-xxl">
          <div className="content">
            <p className="title">PRIZE</p>
            <p className="fund">{item.prize}USDT</p>
          </div>
        </div>
        {/* <div className="hp-position-absolute-top-right hp-m-10"> //fa
          {
            wishCheck ? (
              <div
                className='hp-wish-button hp-cursor-pointer hp-border-radius-round remix-icon hp-p-8 hp-rate hp-text-color-danger-1 hp-bg-color-danger-4 hp-bg-color-dark-danger'
                onClick={() => setWishCheck(false)}
              >
                <RiHeartFill />
              </div>
            ) : (
              <div
                className='hp-wish-button hp-cursor-pointer hp-border-radius-round remix-icon hp-p-8 hp-rate hp-text-color-black-40 hp-text-color-dark-70 hp-bg-color-black-10 hp-bg-color-dark-90'
                onClick={() => setWishCheck(true)}
              >
                <RiHeartFill />
              </div>
            )
          }
        </div> */}

        {/* {
          item.avatars.length !== 0 && (
            <div className="hp-position-absolute-bottom-left" style={{ left: 10, bottom: -20 }}>
              <Avatar.Group>
                {
                  item.avatars.map((item, index) => (
                    <Avatar key={index} size={35} src={item.img} style={{ borderWidth: 2 }} />
                  ))
                }
              </Avatar.Group>
            </div>
          )
        } */}
      </div>

      <Row align="bottom" justify="space-between" className="hp-mb-6">
        <Col>
          <div className="hotLotteriesCardLeftTime">
            Remaining Time: <span>  1d 15h</span>
          </div>
          {/* <span className="hp-d-block h5 hp-text-color-black-100 hp-text-color-dark-0 hp-mb-4">{item.title}</span>

          {
            item.lastBid && (
              <span className="hp-d-block hp-p1-body hp-text-color-black-80 hp-text-color-dark-20">Last Bid: {item.lastBid}</span>
            )
          }
        </Col>

        <Col>
          <span className="hp-d-block hp-ml-12" style={{ color: "#98AFB7" }}>{item.price}</span> */}
        </Col>
      </Row>

      <Divider className="hp-text-color-black-60 hp-my-16" />

      <Row align="middle" justify="space-between">
        {/* <Col>
          <a href="#" className="hp-d-flex-center hp-text-color-black-80 hp-text-color-dark-20">
            <TimeSquare set="curved" />

            <span className="hp-p1-body hp-text-color-black-80 hp-text-color-dark-20 hp-ml-6">View History</span>
          </a>
        </Col> */}

        <Col lg={24} md={24} span={24}>
          <Button type="primary" className="hp-w-100 hp-border-radius-full">Check Details</Button>
        </Col>
      </Row>
    </div>
  );
}
