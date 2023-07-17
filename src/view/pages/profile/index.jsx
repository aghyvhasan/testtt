import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { Row, Col, Drawer, Button, Dropdown, Menu } from "antd";
import { RiMore2Line, RiMenuFill, RiCloseFill } from "react-icons/ri";
import Breadcrumbs from "../../../layout/components/content/breadcrumbs";
import ActionButton from "../../../layout/components/content/action-button";
import InfoProfile from "./personel-information";
import NotificationsProfile from "./notifications";
import Wallet from "./wallet";
import MenuProfile from "./menu";
import ActivityProfile from "./activity";
import SecurityProfile from "./security";
import PasswordProfile from "./password-change";
import EmailConfirmProfile from "./email-confirmation";
import SocialProfile from "./connect-with-social";
import { apiService } from "../../../apiService"

export default function Profile() {
  const [visible, setVisible] = useState(false);
  const [dataSource, setDataSource] = useState();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const rateMenu = (
    <Menu>
      <Menu.Item key="0">Change Avatar</Menu.Item>
    </Menu>
  );

  function moreBtn() {
    return (
      <Dropdown overlay={rateMenu} placement="bottomLeft">
        <Button
          type="text"
          icon={
            <RiMore2Line
              className="hp-text-color-black-100 hp-text-color-dark-0"
              size={24}
            />
          }
        ></Button>
      </Dropdown>
    );
  }
  useEffect(() => {
    const userDetail = async () => {
      try {
        const result = await apiService.get(`user/getUser`);
        setDataSource(result.data)
      } catch (error) {
        console.log(error);
      }
    };
    userDetail();
  }, []);

  return (
    <Row gutter={[32, 32]} className="hp-mb-32">
      <Drawer
        title={moreBtn()}
        className="hp-profile-mobile-menu"
        placement="left"
        closable={true}
        onClose={onClose}
        visible={visible}
        closeIcon={
          <RiCloseFill
            className="remix-icon hp-text-color-black-80"
            size={24}
          />
        }
      >
        <MenuProfile
          onCloseDrawer={onClose}
          moreBtnCheck="none"
          footer="none"
          userData={dataSource}
        />
      </Drawer>

      <Col span={24}>
        <Row gutter={[32, 32]} justify="space-between">
          <Breadcrumbs breadCrumbParent="Pages" breadCrumbActive="Profile" />
        </Row>
      </Col>

      <Col span={24}>
        <Row className="hp-profile-mobile-menu-btn hp-bg-color-black-0 hp-bg-color-dark-100 hp-border-radius hp-py-12 hp-px-sm-8 hp-px-24 hp-mb-16">
          <Button
            className="hp-p-0"
            type="text"
            icon={
              <RiMenuFill
                size={24}
                className="remix-icon hp-text-color-black-80 hp-text-color-dark-30"
              />
            }
            onClick={showDrawer}
          ></Button>
        </Row>

        <Row className="hp-bg-color-black-0 hp-bg-color-dark-100 hp-border-radius hp-pr-sm-16 hp-pr-32">
          <MenuProfile moreBtn={moreBtn} userData={dataSource} />

          <Col
            flex="1 1"
            className="hp-pl-sm-16 hp-pl-32 hp-py-sm-24 hp-py-32 hp-pb-24 hp-overflow-hidden"
          >
            <Switch>
              <Route path="/pages/profile/personel-information" exact>
                <InfoProfile userData={dataSource} />
              </Route>
              <Route path="/pages/profile/notifications">
                <NotificationsProfile />
              </Route>
              <Route path="/pages/profile/wallet">
                <Wallet />
              </Route>
              <Route path="/pages/profile/activity">
                <ActivityProfile />
              </Route>
              <Route path="/pages/profile/security">
                <SecurityProfile />
              </Route>
              <Route path="/pages/profile/password-change">
                <PasswordProfile />
              </Route>
              <Route path="/pages/profile/email-confirm">
                <EmailConfirmProfile />
              </Route>
              <Route path="/pages/profile/connect-with-social">
                <SocialProfile />
              </Route>
            </Switch>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}