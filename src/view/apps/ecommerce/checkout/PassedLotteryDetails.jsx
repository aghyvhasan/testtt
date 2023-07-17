import React, { useState, useEffect } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monoBlue } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Highlighter from "react-highlight-words";
import { Table, Input, Button, Space, Row, Col, Card } from "antd";
import { RiSearch2Line } from "react-icons/ri";
import moment from "moment";
import { ImportSquare } from "iconsax-react";
import FeatureCard from "../../../main/dashboard/analytics/featureCard";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { apiService } from "../../../../apiService"

export default function PassedLotteryDetails(props) {
    const [checkedCode, setCheckedCode] = useState(false);
    const [codeClass, setCodeClass] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [dataLottery, setDataLottery] = useState([]);
    const [dataSourceRoot, setDataSourceRoot] = useState([]);
    let detail = useParams();


    useEffect(async () => {
        const getLotteryDetailByLotteryId = async () => {
            try {
                const result = await apiService.get(`lottery/getLotteryById/${detail.id}`);
                setDataLottery(result)
            } catch (error) {
                console.log(error);
            }
        };
        const getTicketsByLotteryId = async () => {
            try {
                const result = await apiService.get(`ticket/getTicketsByLotteryId/${detail.id}`);
                setDataSource(result.data);
                setDataSourceRoot(result.data);
            } catch (error) {
                console.log(error);
            }
        };
        await getLotteryDetailByLotteryId();
        await getTicketsByLotteryId();
    }, []);


    useEffect(async () => {

    }, []);



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
            title: "Ticket Code",
            dataIndex: "ticketCode",
            key: "ticketCode",
            width: "20%",
            ...getColumnSearchProps("lottery"),
        },
        {
            title: "Date",
            dataIndex: "playDate",
            key: "playDate",
            width: "18%",
            sorter: (a, b) => a.address.length - b.address.length,
            sortDirections: ["descend", "ascend"],
            render: (date) => moment(date).format("DD/MM/yyyy"),
        },
        // {
        //     title: "Contributors",
        //     dataIndex: "ticketCount",
        //     key: "ticketCount",
        //     width: "15%",
        //     sorter: (a, b) => a.address.length - b.address.length,
        //     sortDirections: ["descend", "ascend"],
        // },
        // {
        //     title: "Found",
        //     dataIndex: "ticketPrice",
        //     key: "ticketPrice",
        //     width: "15%",
        //     sorter: (a, b) => a.address.length - b.address.length,
        //     sortDirections: ["descend", "ascend"],
        // },
        // {
        //     title: "Prize",
        //     dataIndex: "prize",
        //     key: "prize",
        //     width: "10%",
        //     sorter: (a, b) => a.address.length - b.address.length,
        //     sortDirections: ["descend", "ascend"],
        // },
        // {
        //     title: "Chance",
        //     dataIndex: "ticketCount",
        //     key: "ticketCount",
        //     width: "10%",
        //     render: (ticketCount) => calculateChance(ticketCount),
        // },
        {
            title: "Status",
            dataIndex: "isWinner",
            width: "10%",
            key: "isWinner",
            className: "lotteryStatusLost",
            render: (isWinner) => checkStatus(isWinner),
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
            <h2>#CL-12345</h2>
            <Row gutter={[32, 32]}>
                <Col sm={4} span={30}>
                    <FeatureCard
                        // icon={
                        //     <MoneyRecive
                        //         size="24"
                        //         variant="Bold"
                        //         className="hp-text-color-black-bg hp-text-color-dark-0"
                        //     />
                        // }
                        // title='Date'
                        // titleIcon={
                        //     <ExportSquare
                        //         size="14"
                        //         variant="Bold"
                        //         className="hp-text-color-success-1"
                        //     />
                        // }
                        date=''
                        price='April 2022'
                    />
                </Col>

                <Col sm={5} span={30}>
                    <FeatureCard
                        // icon={
                        //     <MoneySend
                        //         size="24"
                        //         variant="Bold"
                        //         className="hp-text-color-black-bg hp-text-color-dark-0"
                        //     />
                        // }
                        title='Contributors'
                        titleIcon={
                            <ImportSquare
                                size="14"
                                variant="Bold"
                                className="hp-text-color-danger-1"
                            />
                        }
                        date='_______'
                        price='100'
                    />
                </Col>

                <Col sm={4} span={30}>
                    <FeatureCard
                        // icon={
                        //     <WalletMinus
                        //         size="24"
                        //         variant="Bold"
                        //         className="hp-text-color-black-bg hp-text-color-dark-0"
                        //     />
                        // }
                        title='Fund'
                        date='April 2022'
                        price='$5'
                    />
                </Col>
                <Col sm={4} span={30}>
                    <FeatureCard
                        title='Prize'
                        date='April 2022'
                        price='$300'
                    />
                </Col>
                <Col sm={4} span={30}>
                    <FeatureCard
                        title='Chance'
                        date='April 2022'
                        price='%35'
                    />
                </Col>
            </Row>
            <br />
            <Row>
                <Col className="hp-mb-16" lg={15} span={20}>
                    <h4>TICKETS</h4>
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