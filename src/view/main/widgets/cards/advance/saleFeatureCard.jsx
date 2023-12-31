import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Card, Row, Col } from "antd";
import { Ticket } from "react-iconly";

export default function SaleFeatureCard(props) {
  const { ticketPrice } = props
  return (
    <Card className="hp-border-color-black-40">
      <Row>
        <Col className="hp-statistic-icon-bg hp-mr-16 hp-mb-xs-16 hp-bg-color-warning-4 hp-bg-color-dark-warning">
          <Ticket className="hp-text-color-warning-1 remix-icon" />
        </Col>

        <Col className="hp-mt-8">
          <h3 className="hp-mb-4">
            $ {ticketPrice}
            <span className="hp-badge-text hp-ml-8 hp-text-color-warning-1">
              {/* <FontAwesomeIcon icon="fa-solid fa-circle-info" /> */}
            </span>
          </h3>
          <p className="hp-p1-body hp-mb-0 hp-text-color-black-80 hp-text-color-dark-30">
            Ticket Price
          </p>
        </Col>
      </Row>
    </Card>
  );
}