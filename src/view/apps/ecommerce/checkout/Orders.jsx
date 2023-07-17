import React, { useState, useEffect } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monoBlue } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";
import { Table, Input, Button, Space, Row, Col, Card } from "antd";
import { RiSearch2Line } from "react-icons/ri";
import { FaFileInvoice } from "react-icons/fa";
import moment from "moment";
import logoBlue from "../../../../assets/images/logo/logo-blue.svg";
import { apiService } from "../../../../apiService"

export default function Orders() {
    const [checkedCode, setCheckedCode] = useState(false);
    const [codeClass, setCodeClass] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [dataSourceRoot, setDataSourceRoot] = useState([]);
    useEffect(() => {
        const cartItems = async () => {
            try {
                const result = await apiService.get(`order/getOrdersByUser`);
                setDataSource(result.data)
                setDataSourceRoot(result.data)
            } catch (error) {
                console.log(error);
            }
        };
        cartItems();
    }, []);
    // React.useEffect(() => {
    //     fetch("https://localhost:7246/api", {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             // idLottery: 1,
    //             // idUser: 1
    //         }),
    //         credentials: "include",
    //     })
    //         .then((response) => response.json())
    //         .then((result) => {
    //             setDataSource(result);
    //             setDataSourceRoot(result);
    //         });
    // }, []);

    function toggleChecked() {
        setTimeout(() => setCodeClass(!codeClass), 100);
        setCheckedCode(!checkedCode);
    }

    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");

    function checkStatus(isWinner) {
        if (isWinner == true) {
            return <div className="btnStyle1">Won</div>;
        } else {
            return <div className="btnStyle2">Lost</div>;
        }
    }

    function checkPaymentMethod(wallet) {
        return <img src={logoBlue} alt="Yoda" />
    }

    function onInvoiceClick(idOrder) {
        return <Link to={`/apps/ecommerce/invoiceDetail/${idOrder}`}>
            <Button icon={<FaFileInvoice color="white" />}
                block className="hp-text-color-black-60 hp-hover-text-color-primary-1 hp-hover-text-color-dark-primary-2">
            </Button>
        </Link>
    }

    function calculateChance(ticketCount) {
        var tCount = (1 * 100) / ticketCount;
        return (tCount % 1 != 0 ? tCount.toFixed(1) : tCount) + "%";
    }

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }) => (
            <div style={{ padding: 8 }}>
                <Input
                    placeholder={"Search " + dataIndex}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: "block" }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<RiSearch2Line />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>

                    <Button
                        onClick={() => handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <RiSearch2Line style={{ color: filtered ? "#1890ff" : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex]
                    .toString()
                    .toLowerCase()
                    .includes(value.toLowerCase())
                : "",
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();

        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();

        setSearchText("");
    };

    const columns = [
        {
            title: "Order Code",
            dataIndex: "orderCode",
            key: "orderCode",
            width: "10%",
            ...getColumnSearchProps("lottery"),
        },
        {
            title: "Order Date",
            dataIndex: "dataCreatedDate",
            key: "dataCreatedDate",
            width: "10%",
            sorter: (a, b) => a.address.length - b.address.length,
            sortDirections: ["descend", "ascend"],
            render: (date) => moment(date).format("DD/MM/yyyy"),
        },
        {
            title: "Item Count",
            dataIndex: "itemCount",
            key: "itemCount",
            width: "10%",
        },
        {
            title: "Total",
            dataIndex: "total",
            key: "total",
            width: "10%",
            sorter: (a, b) => a.address.length - b.address.length,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Payment Method",
            dataIndex: "isWinner",
            width: "10%",
            key: "isWinner",
            className: "lotteryStatusLost",
            render: (isWinner) => checkPaymentMethod(isWinner),
        },
        {
            title: "Invoice",
            dataIndex: "id",
            width: "10%",
            key: "id",
            className: "lotteryStatusLost",
            render: (id) => onInvoiceClick(id),
        },
    ];

    function filterTable(isWinner) {
        setDataSource(
            dataSourceRoot.filter((o) =>
                isWinner
                    ? o.isWinner == true
                    : isWinner == false
                        ? o.isWinner == false
                        : o.isWinner !== null
            )
        );
    }
    return (
        <Card className="hp-border-color-black-40">
            <Row>
                <Col className="hp-mb-16" lg={15} span={20}>
                    <h4>ORDERS</h4>
                    <br />
                    <Row>
                        <Col span={24}>
                            <Button
                                onClick={() => filterTable(null)}
                                type="primary"
                                className="hp-btn-outline hp-text-color-warning-1 hp-border-color-warning-1 hp-hover-bg-warning-1 hp-mr-16 hp-mb-16"
                            >
                                All
                            </Button>

                            <Button
                                onClick={() => filterTable(true)}
                                type="primary"
                                className="hp-btn-outline hp-text-color-success-1  hp-border-color-success-1 hp-hover-bg-success-1 hp-mr-16 hp-mb-16"
                            >
                                Won
                            </Button>
                            <Button
                                onClick={() => filterTable(false)}
                                type="primary"
                                className="hp-btn-outline hp-text-color-danger-1 hp-border-color-danger-1 hp-hover-bg-danger-1 hp-mr-16 hp-mb-16"
                            >
                                Lost
                            </Button>
                        </Col>
                    </Row>
                </Col>

                <Col span={24}>
                    <Table
                        columns={columns}
                        dataSource={dataSource}
                        rowKey="id"
                        scroll={{ x: 500 }}
                    />
                </Col>
            </Row>

            {
                checkedCode && (
                    <SyntaxHighlighter
                        language="javascript"
                        className={`show-code hp-mt-24 ${codeClass && "show-code-active"}`}
                        style={monoBlue}
                    >
                        {customizedFilterPanel}
                    </SyntaxHighlighter>
                )
            }
        </Card >
    );
}
