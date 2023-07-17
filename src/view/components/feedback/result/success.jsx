import React, { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monoBlue } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { success } from "./code.js";
import { Card, Row, Col, Result, Button } from "antd";
import { RiCheckboxCircleFill, RiCodeSSlashLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Upcomings from "../../../main/dashboard/upcomings/index.jsx";

export default function SuccessResult() {
  const [checkedCode, setCheckedCode] = useState(false);
  const [codeClass, setCodeClass] = useState(false);

  function toggleChecked() {
    setTimeout(() => setCodeClass(!codeClass), 100);
    setCheckedCode(!checkedCode);
  }

  return (
    <Card className="hp-border-color-black-40">
      <Row>
        <Col span={24}>
          <Result
            className="hp-px-sm-8"
            status="success"
            title={<h3>Successfully Purchased!</h3>}
            icon={<RiCheckboxCircleFill className="remix-icon" />}
            extra={
              <div className="hp-result-button hp-mt-32">
                <Link to="/main/dashboard/upcomings">
                  <Button type="primary">Go to Lottery List</Button>
                </Link>

                <Button className="hp-ml-8" ghost>
                  Buy Again
                </Button>
              </div>
            }
          />
        </Col>
      </Row>

      {checkedCode && (
        <SyntaxHighlighter
          language="javascript"
          className={`show-code hp-mt-24 ${codeClass && "show-code-active"}`}
          style={monoBlue}
        >
          {success}
        </SyntaxHighlighter>
      )}
    </Card>
  );
}
