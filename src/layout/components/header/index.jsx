import React, { useEffect, useRef, useState } from "react";

import { Layout, Button, Row, Col, Badge } from "antd";
import { RiCloseLine, RiMenuFill } from "react-icons/ri";
import { SearchNormal1, ShoppingCart } from "iconsax-react";
import { motion } from "framer-motion/dist/framer-motion";
import { Link } from "react-router-dom";

import HeaderSearch from "./HeaderSearch";
import HeaderUser from "./HeaderUser";
import HeaderNotifications from "./HeaderNotifications";
import HeaderLanguages from "./HeaderLanguages";
import HeaderCart from "./HeaderCart";
import HeaderText from "./HeaderText";
import connection from "../../../signalR";
import { apiService, authService } from "../../../apiService";

const { Header } = Layout;

// const authUser = async () => {
//   await authService.login("akmedliov@gmail.com", "Akmed600");
// };

export default function MenuHeader(props) {
  const { setVisible } = props;
  const [searchHeader, setSearchHeader] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [messages, setMessages] = useState([]);
  const [cartItemQty, setCartItemQty] = useState(0);

  useEffect(async () => {
    // await authUser();
    const cartItemsQty = await apiService
      .get("carts/getCartItemsQty")
      .then((response) => {
        setCartItemQty(response.data);
      })
      .catch((error) => {
        console.error("Error deleting cart item:", error);
      });
    if (connection) {
      try {
        connection
          .start()
          .then(() => console.log("SignalR Connected"))
          .catch((error) => console.log("SignalR Connection Error: ", error));

        connection.on("ReceiveMessage", (message) => {
          setMessages((prevMessages) => [...prevMessages, { message }]);
          setCartItemQty(message);
        });
      } catch (error) {
        console.error("Error starting SignalR connection:", error);
      }
    }
  }, [connection, setMessages, setCartItemQty]);

  // Focus
  const inputFocusRef = useRef(null);
  const inputFocusProp = {
    ref: inputFocusRef,
  };

  // Search Active
  setTimeout(() => setSearchActive(searchHeader), 100);

  const searchClick = () => {
    setSearchHeader(true);

    setTimeout(() => {
      inputFocusRef.current.focus({
        cursor: "start",
      });
    }, 200);
  };

  // Mobile Sidebar
  const showDrawer = () => {
    setVisible(true);
    setSearchHeader(false);
  };

  // Children
  const headerChildren = () => {
    return (
      <Row
        className="hp-w-100 hp-position-relative"
        align="middle"
        justify="space-between"
      >
        <Col className="hp-mobile-sidebar-button hp-mr-24">
          <Button
            type="none"
            ghost
            className="hp-mobile-sidebar-button hp-border-none"
            onClick={showDrawer}
            icon={
              <RiMenuFill
                size={24}
                className="remix-icon hp-text-color-black-80 hp-text-color-dark-30"
              />
            }
          />
        </Col>

        <Col
          flex="1"
          style={{ display: !searchHeader ? "none" : "block" }}
          className={`hp-mr-md-0 hp-mr-16 hp-pr-0 hp-header-search ${searchActive && "hp-header-search-active"
            }`}
        >
          <HeaderSearch
            inputFocusProp={inputFocusProp}
            setSearchHeader={setSearchHeader}
          />
        </Col>

        {!searchHeader && <HeaderText />}

        <Col>
          <Row align="middle">
            {/* <HeaderLanguages /> */}
            <Link to="/apps/ecommerce/orderDetail">
              <Button
                ghost
                type="primary"
                className="hp-border-none hp-hover-bg-black-10 hp-hover-bg-dark-100"
                icon={
                  <Badge count={cartItemQty} showZero>
                    <ShoppingCart className="hp-text-color-black-80 hp-text-color-dark-30" />
                  </Badge>
                }
              />
              {/* <p>{cartItemQty}</p> */}
            </Link>
            <Col className="hp-d-flex-center">
              {!searchHeader ? (
                <Button
                  ghost
                  type="primary"
                  className="hp-border-none hp-hover-bg-black-10 hp-hover-bg-dark-100"
                  icon={
                    <SearchNormal1
                      set="curved"
                      className="hp-text-color-black-80 hp-text-color-dark-30"
                    />
                  }
                  onClick={() => searchClick()}
                />
              ) : (
                <Button
                  ghost
                  type="primary"
                  className="hp-border-none hp-hover-bg-black-10 hp-hover-bg-dark-100"
                  icon={
                    <RiCloseLine
                      size={24}
                      className="hp-text-color-black-80 hp-text-color-dark-30"
                    />
                  }
                  onClick={() => setSearchHeader(false)}
                />
              )}
            </Col>

            <HeaderNotifications />

            {/* <HeaderCart /> */}

            <HeaderUser />
          </Row>
        </Col>
      </Row>
    );
  };

  return (
    <Header>
      <Row justify="center" className="hp-w-100">
        <Col span={24}>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.5, delay: 0.1 }}
            className="hp-w-100"
          >
            {headerChildren()}
          </motion.div>
        </Col>
      </Row>
    </Header>
  );
}
