import React, { useState, useEffect } from "react";
import { Row, Col, Divider, Switch } from "antd";
import { apiService } from "../../../apiService"

export default function NotificationsProfile() {
  const colTextClass = "hp-caption hp-text-color-black-80 hp-text-color-dark-30";
  const switchClass = "hp-mt-sm-8 hp-ml-sm-0 hp-ml-8";
  const dividerClass = "hp-border-color-black-40 hp-border-color-dark-80";
  const [dataSource, setDataSource] = useState([]);


  useEffect(() => {
    const cartItems = async () => {
      try {
        const result = await apiService.get(`user/getUserSettings`);
        setDataSource(result.data)
      } catch (error) {
        console.log(error);
      }
    };
    cartItems();
  }, []);

  const handleSwitchChange = async (checked, switchedToggle) => {
    try {
      const response = await apiService.post(`user/updateSetting`, {
        NotificationType: switchedToggle,
        NotificationStatus: checked
      });

      if (response.status === 200) {
        setDataSource((prevDataSource) => ({
          ...prevDataSource,
          [switchedToggle]: checked
        }));
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Row>
      <Col span={24}>
        <h2>Notification Settings</h2>
        <p className="hp-p1-body hp-mb-0">
          It is crucial to carefully consider your choices as there is a potential risk of missing out on significant notifications.
        </p>
      </Col>

      <Divider className={dividerClass} />

      <Col span={24}>
        <h3>Email Notifications</h3>

        <div className="hp-profile-notifications hp-mt-24">
          <Row className="hp-mt-18" align="middle" justify="space-between">
            <Col sm={15} span={24} className={colTextClass}>
              Notify me all about lotteries
            </Col>

            <Switch className={switchClass} checked={dataSource.isLotteryNotfActive} onChange={(checked) => handleSwitchChange(checked, "isLotteryNotfActive")} />
          </Row>

          <Row className="hp-mt-18" align="middle" justify="space-between">
            <Col sm={15} span={24} className={colTextClass}>
              Notify me about latest news
            </Col>

            <Switch className={switchClass} checked={dataSource.isNewsNotfActive} onChange={(checked) => handleSwitchChange(checked, "isNewsNotfActive")} />
          </Row>

          <Row className="hp-mt-18" align="middle" justify="space-between">
            <Col sm={15} span={24} className={colTextClass}>
              Notify me about tips on using account
            </Col>
            <Switch className={switchClass} checked={dataSource.isTipNotfActive} onChange={(checked) => handleSwitchChange(checked, "isTipNotfActive")} />
          </Row>
          <Row className="hp-mt-18" align="middle" justify="space-between">
            <Col sm={15} span={24} className={colTextClass}>
              Notify me when me or someone else login to my account
            </Col>
            <Switch className={switchClass} checked={dataSource.isLoggedNotfActive} onChange={(checked) => handleSwitchChange(checked, "isTipNotfActive")} />
          </Row>
        </div>
      </Col>
    </Row>
  );
}
