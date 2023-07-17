import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import SyntaxHighlighter from "react-syntax-highlighter";
import { monoBlue } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { customizedFilterPanel } from "./code.js";
import { loadCurrentItem } from '../../../../redux/ecommerce/ecommerceActions';
import Highlighter from 'react-highlight-words';
import { Table, Input, DatePicker, Button, Space, Row, Col, Card } from "antd";
import { RiCodeSSlashLine, RiSearch2Line } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { apiService } from "../../../../apiService.jsx"
import { RiCalendarLine } from "react-icons/ri";

export default function UpcomingsTable() {
  const [checkedCode, setCheckedCode] = useState(false);
  const [codeClass, setCodeClass] = useState(false);
  const dispatch = useDispatch()
  function toggleChecked() {
    setTimeout(() => setCodeClass(!codeClass), 100);
    setCheckedCode(!checkedCode);
  }
  const [searchText, setSearchText] = useState('');
  const [dataSource, setDataSource] = useState([]);
  const [dataSourceRoot, setDataSourceRoot] = useState([]);
  const [fromDateFilter, setFromDateFilter] = useState([]);
  const [toDateFilter, setToDateFilter] = useState([]);
  const [searchedColumn, setSearchedColumn] = useState('');
  const { RangePicker } = DatePicker;

  useEffect(() => {
    const cartItems = async () => {
      try {
        const result = await apiService.get(`lottery/getUpcomingLotteryListByUser`);
        setDataSource(result.data)
        setDataSourceRoot(result.data)
      } catch (error) {
        console.log(error);
      }
    };
    cartItems();
  }, []);

  // function onChangeDateFilter(value) {
  //   var fromDate = moment(value[0].toDate()).format('DD/MM/yyyy')
  //   var toDate = moment(value[1].toDate()).format('DD/MM/yyyy')
  //   console.log(fromDate)
  //   // setFromDateFilter(value[0].toDate())
  //   // console.log(value[1].toDate());
  //   // setToDateFilter(value[1].toDate())
  //   setDataSource(dataSourceRoot.filter(o => (fromDate < o.playDate)))
  //   // setDataSource(dataSourceRoot.filter(o => fromDate < o.playDate && o.playDate < toDate))
  //   // setDataSource(dataSourceRoot.filter(o => fromDate.isBefore(o.playDate) && toDate.isAfter(o.playDate)))

  // }


  function checkStatus(leftTicketQty, id, isJoined) {
    if (leftTicketQty > 0) {
      if (isJoined == false) {
        return (
          <Link to={`/apps/ecommerce/product-detail/${id}`} >
            <Button block type="primary" className="btnStyle1 hp-bg-success-1 hp-border-color-success-1 hp-hover-bg-success-2 hp-hover-border-color-success-2">
              {isJoined == false ? 'Join' : 'Re-join'}
            </Button>
          </Link>
        )
      }
      else if (isJoined == true) {
        return (
          <Link to={`/apps/ecommerce/product-detail/${id}`} >
            <Button type="dashed" className="btnStyle3 hp-text-color-success-1 hp-border-color-success-1 hp-hover-text-color-success-2 hp-hover-border-color-success-2">
              Re-join
            </Button>
          </Link>
        )
      }
    }
    else {
      return (
        // <Link to={`/apps/ecommerce/product-detail/${id}`} >
        <Button block type="primary" className="btnStyle4 hp-text-color-success-1 hp-border-color-success-1 hp-hover-text-color-success-2 hp-hover-border-color-success-2">
          Sold out
        </Button>
        // </Link>
      )
    }
  }

  function calculateChance(ticketCount) {
    var tCount = 1 * 100 / ticketCount
    return (tCount % 1 != 0 ? tCount.toFixed(1) : tCount) + '%'
  }

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={'Search ' + dataIndex}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
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

          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <RiSearch2Line style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  function filterTable(isJoined) {
    setDataSource(dataSourceRoot.filter(o => isJoined ? o.isJoined !== null : o.isJoined && fromDateFilter >= o.playDate && o.playDate <= toDateFilter))
  }

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();

    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };


  const columns = [
    {
      title: 'Lottery',
      dataIndex: 'lotteryCode',
      key: 'lotteryCode',
      width: '20%',
      ...getColumnSearchProps('lottery'),
    },
    {
      title: 'Date',
      dataIndex: 'playDate',
      key: 'playDate',
      width: '18%',
      render: (date) => moment(date).format('DD/MM/yyyy')
    },
    {
      title: 'Contributors',
      dataIndex: 'ticketCount',
      key: 'ticketCount',
      width: '15%',
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Found',
      dataIndex: 'ticketPrice',
      key: 'ticketPrice',
      width: '15%',
      render: (ticketPrice) => '$' + ticketPrice,
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Prize',
      dataIndex: 'prize',
      key: 'prize',
      width: '10%',
      render: (prize) => '$' + prize,
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Chance',
      dataIndex: 'ticketCount',
      key: 'ticketCount',
      width: '10%',
      render: (ticketCount) => calculateChance(ticketCount)
    },
    {
      width: '10%',
      key: 'action',
      render: (action) => checkStatus(action.leftTicketQty, action.idLottery, action.isJoined),
    },
  ];

  return (
    <Card className="hp-border-color-black-40">
      <Row>
        <Col className="hp-mb-16" lg={15} span={20}>
          <h4>UPCOMING GIVEAWAYS</h4>
          {/* <p className="hp-p1-body">
            You are able to see all upcoming giveaways here including already joined ones.
         </p> */}
          <br />
          <Row>
            <Col span={24}>

              <Button onClick={() => filterTable(true)} type="primary" className="hp-btn-outline hp-text-color-warning-1 hp-border-color-warning-1 hp-hover-bg-warning-1 hp-mr-16 hp-mb-16">
                All
              </Button>

              <Button onClick={() => filterTable(false)} type="primary" className="hp-btn-outline hp-text-color-success-1  hp-border-color-success-1 hp-hover-bg-success-1 hp-mr-16 hp-mb-16">
                Joined
              </Button>
              {/* <RangePicker
                onChange={onChangeDateFilter}
                suffixIcon={<RiCalendarLine className="remix-icon hp-text-color-black-100" />}
              /> */}




              {/*                          
                            <Button type="primary" className="hp-btn-outline hp-text-color-black-100 hp-border-color-black-100 hp-hover-bg-black-100 hp-mr-16 hp-mb-16">
                                Dark Button
                            </Button>
                            <Button type="primary" className="hp-btn-outline hp-text-color-secondary-1 hp-border-color-secondary-1 hp-hover-bg-secondary-1 hp-mr-16 hp-mb-16">
                                Secondary Button
                            </Button>
                            <Button type="primary" className="hp-btn-outline hp-text-color-info-1 hp-border-color-info-1 hp-hover-bg-info-1 hp-mr-16 hp-mb-16">
                                Info Button
                            </Button> */}
            </Col>
          </Row>

        </Col>

        <Col span={24}>
          <Table columns={columns} dataSource={dataSource} rowKey="idLottery" scroll={{ x: 500 }} />
        </Col>
      </Row>

      {checkedCode && (
        <SyntaxHighlighter
          language="javascript"
          className={`show-code hp-mt-24 ${codeClass && "show-code-active"}`}
          style={monoBlue}
        >
          {customizedFilterPanel}
        </SyntaxHighlighter>
      )}
    </Card>
  );
}
