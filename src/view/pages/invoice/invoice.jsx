import React from "react";

import { useSelector } from "react-redux";

import {
    Row,
    Col,
    Card,
    Divider,
    Table,
} from "antd";
import moment from "moment";
import logo from "../../../assets/images/logo/logo.svg";
import logoDark from "../../../assets/images/logo/logo-dark.svg";

export default function InvoiceCard(props) {
    // Redux
    const customise = useSelector(state => state.customise)
    const { dataSource, invoiceDetails } = props

    // Column Data
    const columns = [
        {
            title: "Lottery",
            dataIndex: "lotteryCode",
            key: "lotteryCode",
            render: (lotteryCode) => <p>{lotteryCode}</p>,
        },
        {
            title: "Price",
            dataIndex: "ticketPrice",
            key: "ticketPrice",
            render: (value) => <p>{'$' + value}</p>,
        },
        {
            title: "Count",
            dataIndex: "ticketCount",
            key: "ticketCount",
            render: (ticketCount) => <p>{ticketCount}</p>,
            align: "center",
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            render: (value) => <h5 className="hp-text-align-right">{'$' + value}</h5>,
            align: "right",
        },
    ];


    return (
        <Card id="invoice" className="hp-mb-32 hp-invoice-card">
            <Row justify="space-between">
                <Col xl={12} xs={24} sm={12}>
                    {
                        customise.theme == "light" ? (
                            <img className="hp-logo hp-mb-16" src={logo} alt="logo" />
                        ) : (
                            <img className="hp-logo hp-mb-16" src={logoDark} alt="logo" />
                        )
                    }
                </Col>

                <Col>
                    <p className="hp-p1-body hp-mb-16">
                        INVOICE NUMBER  {invoiceDetails.invoiceCode}
                    </p>
                </Col>

                <Col>
                    <p>Crypto Lottery</p>
                    <p>Mandan Road, Columbia MO, Missouri ZIP 1065</p>
                    <p>demo@gmail.com</p>
                    <p>number: +91 919-91-91-919</p>
                </Col>
            </Row>

            <Divider />

            <Row justify="space-bewtween">
                <Col md={8} xs={24} className="hp-pb-16 hp-print-info">
                    <p className="hp-text-color-black-100 hp-text-color-dark-0 hp-input-label">
                        CLIENT INFORMATION:
                    </p>
                    <p>{invoiceDetails.fullName}</p>
                    <p>1065 Atasehir/Istanbul </p>
                    <p>(123)-65202</p>
                    <p>{invoiceDetails.email}</p>
                </Col>

                <Col md={8} xs={24} className="hp-pb-16 hp-print-info">
                    <p className="hp-text-color-black-100 hp-text-color-dark-0 hp-input-label">
                        ORDER INFORMATION:
                    </p>
                    <p>Order No : {invoiceDetails.orderCode}</p>
                    <p>Date: {moment(invoiceDetails.orderCreatedDate).format("DD/MM/yyyy")}</p>
                </Col>

                <Col
                    md={8}
                    xs={24}
                    className="hp-text-sm-left hp-text-right hp-print-info"
                >
                    <p>Date Issue: 08/10/2019</p>
                    <p>Date Due: 08/10/2019</p>
                </Col>
            </Row>

            <Divider />

            <Table
                columns={columns}
                dataSource={dataSource}
                bordered={false}
                rowKey="lotteryCode"
                pagination={false}
            />

            <Divider />

            <Row justify="end">
                <Col md={6} sm={12} xs={24} className="hp-pb-16 hp-print-checkout">
                    <Row align="middle" justify="space-between">
                        <p className="hp-badge-text">Subtotal</p>
                        <h5 className="hp-mb-4">$ {invoiceDetails.subtotal}</h5>
                    </Row>

                    {/* <Row align="middle" justify="space-between">
                        <p className="hp-badge-text">Discount %10 </p>
                        <h5 className="hp-mb-4">-$ 24.80 </h5>
                    </Row> */}

                    <Row align="middle" justify="space-between">
                        <p className="hp-badge-text">Tax</p>
                        <h5>$ {invoiceDetails.tax}</h5>
                    </Row>

                    <Divider />

                    <Row align="middle" justify="space-between">
                        <h5 className="hp-text-color-primary-1">Total</h5>
                        <h5 className="hp-text-color-primary-1">$ {invoiceDetails.total}</h5>
                    </Row>
                </Col>
            </Row>
        </Card>
    );
}
