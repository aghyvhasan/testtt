import React from "react";
import { Row, Col, Select } from "antd";
import UpcomingsTable from "../../../components/data-display/table/upcomingsTable";


export default function Upcomings() {
    return (
        <Row gutter={[32, 0]}>
            <Col span={24} >
                <UpcomingsTable />
            </Col>
        </Row>
    );
}
