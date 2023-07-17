import HistoryTable from "../../../components/data-display/table/historyTable";
import React, { useState } from "react";
import { Card, Row, Col, Button } from "antd";


export default function History() {
    return (
        <Row gutter={[32, 0]}>
            <Col span={24} >
                <HistoryTable />
            </Col>
        </Row>
    );
}
