import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Row, Col } from "antd";
import ActionButton from "../../../../layout/components/content/action-button";
import BreadCrumbs from "../../../../layout/components/content/breadcrumbs";
import InvoiceActions from "../../../pages/invoice/invoiceActions";
import InvoiceCard from "../../../pages/invoice/invoice";
import { apiService } from "../../../../apiService"

export default function InvoiceDetail(props) {
    const [dataSource, setDataSource] = useState([]);
    const [invoiceDetails, setInvoiceDetails] = useState([]);
    let invoiceId = useParams();

    function print() {
        window.print();
    }

    useEffect(() => {
        const orderedItems = async () => {
            try {
                const invoiceDetails = await apiService.get(`invoices/getInvoice/${invoiceId.id}`);
                const orderedItems = await apiService.get(`invoices/getOrderedItemsByOrder/${invoiceId.id}`);
                setDataSource(orderedItems.data);
                setInvoiceDetails(invoiceDetails.data);
            } catch (error) {
                console.log(error);
            }
        };
        orderedItems();
    }, []);

    return (
        <Row gutter={32}>
            <Col className="hp-mb-32" span={24}>
                <Row
                    gutter={[32, 32]}
                    justify="space-between"
                    className="hp-print-none"
                >
                    <BreadCrumbs breadCrumbParent="Pages" breadCrumbActive="Invoice" />

                    <ActionButton />
                </Row>
            </Col>

            <Col xl={16} xs={24}>
                <InvoiceCard dataSource={dataSource} invoiceDetails={invoiceDetails} />
            </Col>

            <Col xl={8} xs={24} className="hp-print-none">
                <InvoiceActions print={print} idOrder={invoiceDetails.idOrder} />
            </Col>
        </Row>
    );
}
