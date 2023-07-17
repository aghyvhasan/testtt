import React, { useState } from "react";

import SyntaxHighlighter from "react-syntax-highlighter";
import { monoBlue } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { customizedFilterPanel } from "./code.js";

import Highlighter from 'react-highlight-words';
import { Table, Input, Button, Space, Row, Col, Card } from "antd";
import { RiCodeSSlashLine, RiSearch2Line } from "react-icons/ri";

export default function CustomizedFilterPanelTable() {
  const [checkedCode, setCheckedCode] = useState(false);
  const [codeClass, setCodeClass] = useState(false);

  function toggleChecked() {
    setTimeout(() => setCodeClass(!codeClass), 100);
    setCheckedCode(!checkedCode);
  }

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  function checkStatus(statuss) {
    if (statuss == 'won') {
      return (
        <div className="btnStyle1">
          Won
        </div>)
    }
    else {
      return (
        <div className="btnStyle2">
          Lost
        </div>)
    }
  }
  const data = [
    {
      key: '1',
      lottery: 'John Brown',
      date: 32,
      address: 'New York No. 1 Lake Park',
      status: checkStatus('won')
    },
    {
      key: '2',
      lottery: 'Joe Black',
      date: 42,
      address: 'New York No. 1 Lake Park',
      status: checkStatus('won')
    },
    {
      key: '3',
      lottery: 'Jim Green',
      date: 32,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '4',
      lottery: 'Jim Red',
      date: 32,
      address: 'New York No. 1 Lake Park',
      status: checkStatus('lost')
    },
    {
      key: '5',
      lottery: 'Joe Black',
      date: 42,
      address: 'New York No. 1 Lake Park',
      status: checkStatus('won')
    },
    {
      key: '6',
      lottery: 'Jim Green',
      date: 32,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '7',
      lottery: 'Jim Red',
      date: 32,
      address: 'New York No. 1 Lake Park',
      status: checkStatus('lost')
    }, {
      key: '8',
      lottery: 'Joe Black',
      date: 42,
      address: 'New York No. 1 Lake Park',
      status: checkStatus('won')
    },
    {
      key: '9',
      lottery: 'Jim Green',
      date: 32,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '10',
      lottery: 'Jim Red',
      date: 32,
      address: 'New York No. 1 Lake Park',
      status: checkStatus('lost')
    },
    {
      key: '11',
      lottery: 'Jim Green',
      date: 32,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '12',
      lottery: 'Jim Red',
      date: 32,
      address: 'New York No. 1 Lake Park',
      status: checkStatus('lost')
    }, {
      key: '13',
      lottery: 'Joe Black',
      date: 42,
      address: 'New York No. 1 Lake Park',
      status: checkStatus('won')
    },
    {
      key: '14',
      lottery: 'Jim Green',
      date: 32,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '15',
      lottery: 'Jim Red',
      date: 32,
      address: 'New York No. 1 Lake Park',
      status: checkStatus('lost')
    },
    {
      key: '16',
      lottery: 'Jim Green',
      date: 32,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '17',
      lottery: 'Jim Red',
      date: 32,
      address: 'New York No. 1 Lake Park',
      status: checkStatus('lost')
    }
  ];

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
      dataIndex: 'lottery',
      key: 'lottery',
      width: '20%',
      ...getColumnSearchProps('lottery'),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'age',
      width: '18%',
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Contributors',
      dataIndex: 'contributors',
      key: 'contributors',
      width: '15%',
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Found',
      dataIndex: 'found',
      key: 'found',
      width: '15%',
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Prize',
      dataIndex: 'prize',
      key: 'prize',
      width: '10%',
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Chance',
      dataIndex: 'chance',
      key: 'chance',
      width: '10%',
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '10%',
      key: 'status',
      // className: "lotteryStatusLost"
    },
  ];

  return (
    <Card className="hp-border-color-black-40">
      <Row>
        <Col className="hp-mb-16" lg={15} span={20}>
          <h4>HISTORY GIVEAWAYS</h4>
          {/* <p className="hp-p1-body">
            You are able to see all upcoming giveaways here including already joined ones.
         </p> */}
          <br />
          <Row>
            <Col span={24}>

              <Button type="primary" className="hp-btn-outline hp-text-color-warning-1 hp-border-color-warning-1 hp-hover-bg-warning-1 hp-mr-16 hp-mb-16">
                All
              </Button>

              <Button type="primary" className="hp-btn-outline hp-text-color-success-1  hp-border-color-success-1 hp-hover-bg-success-1 hp-mr-16 hp-mb-16">
                Won
              </Button>
              <Button type="primary" className="hp-btn-outline hp-text-color-danger-1 hp-border-color-danger-1 hp-hover-bg-danger-1 hp-mr-16 hp-mb-16">
                Lost
              </Button>
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
          <Table columns={columns} dataSource={data} scroll={{ x: 500 }} />
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
