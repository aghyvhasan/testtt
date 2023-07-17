import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import SaleFeatureCard from "../../../main/widgets/cards/advance/saleFeatureCard";
import ProfitFeatureCard from "../../../main/widgets/cards/advance/profitFeatureCard";
import OrdersFeatureCard from "../../../main/widgets/cards/advance/ordersFeatureCard";
import CustomerFeatureCard from "../../../main/widgets/cards/advance/customerFeatureCard";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  adjustItemQty,
  loadCurrentItem,
} from "../../../../redux/ecommerce/ecommerceActions";
import HotBidNFT from "../../../main/dashboard/nft/hotBid";

import Slider from "react-slick";
import { Row, Col, Button, Card, Rate, Divider, InputNumber, Tag } from "antd";
import {
  RiArrowRightUpLine,
  RiShoppingBagLine,
  RiTruckLine,
  RiCheckboxCircleLine,
  RiShieldLine,
  RiTimeLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "react-icons/ri";

import BreadCrumbs from "../../../../layout/components/content/breadcrumbs";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { apiService } from "../../../../apiService";

export default function Detail(props) {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [lotteryData, setLotteryData] = useState([]);
  const [lotteryListData, setLotteryListData] = useState([]);
  const history = useHistory();

  let lotoDetail = useParams();

  // let slider1 = [] //fa
  // let slider2 = []

  // useEffect(() => {
  //   setNav1(slider1)
  //   setNav2(slider2)
  // }, [slider1, slider2])

  //Fetch Related Data
  useEffect(() => {
    const lotteryDetail = async () => {
      try {
        const result = await apiService.get(`lottery/getLotteryById/${lotoDetail.id}`);
        setLotteryData(result.data)
      } catch (error) {
        console.log(error);
      }
    };
    const lotteries = async () => {
      try {
        const result = await apiService.get("lottery/getLotteries");
        setLotteryListData(result.data)
      } catch (error) {
        console.log(error);
      }
    };
    lotteryDetail();
    lotteries();
  }, []);

  // const onBuyTicketClick = async (idLottery) => {
  //   await apiService.post(`carts/createUpdate/` + idLottery)
  //   console.log('Link clicked!');
  // };
  const onBuyTicketClick = async (idLottery) => {
    try {
      await apiService.post(`carts/createUpdate/` + idLottery);
      history.push('/apps/ecommerce/orderDetail');
    } catch (error) {
      // Handle any errors here
    }
  };
  // Redux
  const products = useSelector((state) => state.ecommerce.products);

  const value = useSelector((state) => 1);
  const dispatch = useDispatch();

  // Qty
  const onChangeHandler = (e, valueId) => {
    dispatch(adjustItemQty(valueId, e));
  };

  // Price
  // const discountSplit1 = value.discount.toString().split(".")[0];
  // const discountSplit2 = value.discount.toString().split(".")[1];

  // const priceSplit1 = value.price.toString().split(".")[0];
  // const priceSplit2 = value.price.toString().split(".")[1];

  // Other Slide
  function SampleNextArrow(props) {
    const { onClick } = props;

    return (
      <Button
        onClick={onClick}
        className="hp-other-slide-next-arrow"
        icon={<RiArrowRightSLine className="remix-icon" size={18} />}
      ></Button>
    );
  }

  function SamplePrevArrow(props) {
    const { onClick } = props;

    return (
      <Button
        onClick={onClick}
        className="hp-other-slide-prev-arrow"
        icon={<RiArrowLeftSLine className="remix-icon" size={18} />}
      ></Button>
    );
  }

  return (
    <Row className="hp-ecommerce-app-detail hp-mb-32" key={value.id}>
      {/* <Col className="hp-mb-32" span={24}>//fa
        <Row gutter={[32, 32]}>
          <BreadCrumbs
            breadCrumbParent="Applications"
            breadCrumbParent2="E-Commerce"
            breadCrumbActive="Product Detail"
          />
        </Row>
      </Col> */}

      <Col span={24}>
        <Card className="detailUpperPart hp-border-color-black-40">
          <Row>
            {value.featured && (
              <Tag
                className="hp-position-absolute-top-left hp-z-index hp-m-sm-16 hp-m-32 hp-border-none hp-py-4 hp-font-weight-500"
                color="blue"
              >
                Featured
              </Tag>
            )}

            {value.onSale && (
              <Tag
                className="hp-position-absolute-top-left hp-z-index hp-m-sm-16 hp-m-32 hp-border-none hp-py-4 hp-font-weight-500"
                color="red"
              >
                On Sale
              </Tag>
            )}

            {value.new && (
              <Tag
                className="hp-position-absolute-top-left hp-z-index hp-m-sm-16 hp-m-32 hp-border-none hp-py-4 hp-font-weight-500"
                color="green"
              >
                New
              </Tag>
            )}

            {value.sponsored && (
              <Tag
                className="hp-position-absolute-top-left hp-z-index hp-m-sm-16 hp-m-32 hp-border-none hp-py-4 hp-font-weight-500"
                color="yellow"
              >
                Sponsored
              </Tag>
            )}

            <Col
              lg={11}
              span={24}
              className="hp-ecommerce-app-detail-slider hp-mt-sm-24 hp-mb-md-64 hp-mb-md-32"
            >
              <>
                <div className="detailPrizeCard">
                  <p className="title">PRIZE</p>
                  <span className="prizeAmount">{lotteryData.prize}$</span>
                </div>
              </>
            </Col>
            <Col lg={1} span={24}></Col>
            {/* <Col lg={12} span={24}>
              <h2 className="hp-mb-8">{value.title}</h2>

              <span className="hp-caption hp-d-block hp-text-color-black-60">
                By
                <span className="hp-ml-4 hp-text-color-black-80 hp-text-color-dark-30">{value.person}</span>
              </span>

              <Row className="hp-mt-24 hp-pr-42" align="middle" justify="space-between">
                <Col md={12} span={24}>
                  <Row align="middle">
                    {

                      value.discount !== '' && (
                        <div className="hp-d-inline-block hp-border-radius hp-bg-color-danger-1 hp-caption hp-line-height-normal hp-text-color-black-0 hp-text-center hp-px-6 hp-py-4 hp-mr-8">
                          Save <br /> %14
                        </div>
                      )
                    }

                    <Col>
                      <Row align="bottom" className="hp-h-100">
                        {
                          value.discount ? (
                            <>
                              <span className="h2 hp-d-inline-block hp-mb-0 hp-mr-4">
                                ${discountSplit1}.
                                <sup style={{ top: -6 }}>
                                  {discountSplit2}
                                </sup>
                              </span>

                              <span className="hp-d-inline-block hp-mb-6 hp-text-color-black-60 hp-text-line-through hp-p1-body hp-font-weight-500">
                                ${priceSplit1}.
                                <sup style={{ top: -3 }}>
                                  {priceSplit2}
                                </sup>
                              </span>
                            </>
                          ) : (
                            <span className="h2 hp-d-inline-block hp-mb-0 hp-mr-4">
                              ${priceSplit1}.
                              <sup style={{ top: -6 }}>
                                {priceSplit2}
                              </sup>
                            </span>
                          )
                        }
                      </Row>
                    </Col>
                  </Row>
                </Col>

                <Col className="hp-mt-sm-24">
                  <Row align="middle" className="hp-mb-4">
                    <Rate defaultValue={value.rate} allowHalf style={{ fontSize: 15 }}></Rate>

                    <span className="hp-d-block hp-text-left hp-caption hp-text-color-black-80 hp-text-color-dark-30 hp-ml-8">
                      {value.rate}
                    </span>
                  </Row>

                  <span className="hp-d-block hp-text-left hp-caption hp-text-color-black-80 hp-text-color-dark-30">
                    {value.ratings} Ratings
                  </span>
                </Col>
              </Row>

              <Divider />

              {
                value.colors && (
                  <>
                    <Row gutter={[16, 16]} className="hp-pr-32">
                      {
                        products.map((item) =>
                          value.colors.map((colorIndex) =>
                            (item.id == colorIndex) && (
                              <Col key={item.id} md={6} span={12} >
                                <Link
                                  to={`/apps/ecommerce/product-detail/${item.id}`}
                                  onClick={() => dispatch(loadCurrentItem(item))}
                                >
                                  <div className="hp-border-radius hp-border-1 hp-border-color-black-40 hp-px-8 hp-py-12">
                                    <Row align="middle" justify="center">
                                      <Col className="hp-mr-4">
                                        <img src={require(`../../../../assets/images/product/${item.imgList}`).default} height={28} alt={item.color} />
                                      </Col>

                                      <Col span={12} className="hp-text-center">
                                        <span className="hp-d-block hp-input-description hp-text-color-black-80 hp-font-weight-400">{item.color}</span>

                                        {
                                          item.discount ? (
                                            <span className="hp-d-block hp-input-description hp-text-color-black-100">{item.discount}</span>
                                          ) : (
                                            <span className="hp-d-block hp-input-description hp-text-color-black-100">{item.price}</span>
                                          )
                                        }
                                      </Col>
                                    </Row>
                                  </div>
                                </Link>
                              </Col>
                            )
                          )
                        )
                      }
                    </Row>

                    <Divider />
                  </>
                )
              }


              <Row gutter={[24, 24]}>
                {
                  !value.addToCartCheck ? (
                    value.basketBtn && (
                      <Col>
                        <Button
                          block
                          icon={<RiShoppingBagLine className="remix-icon" />}
                          type="primary"
                          onClick={() => dispatch(addToCart(value.id))}
                        >
                          Add to Cart
                        </Button>
                      </Col>
                    )
                  ) : (
                    <Col span={24}>
                      <Row gutter={[8, 8]}>
                        <Col>
                          <InputNumber
                            min={1}
                            max={99}
                            value={value.qty}
                            onChange={(e) => onChangeHandler(e, value.id)}
                          />
                        </Col>

                        <Col>
                          <Link to="/apps/ecommerce/checkout">
                            <Button
                              block
                              icon={<RiShoppingBagLine className="remix-icon" />}
                              type="primary"
                            >
                              Go to Cart
                            </Button>
                          </Link>
                        </Col>
                      </Row>
                    </Col>
                  )
                }

                <Col span={24}>
                  <Row gutter={[8, 8]}>
                    <Col span={24} className="hp-d-flex-center">
                      <RiTruckLine className="hp-text-color-primary-1" />
                      <span className="hp-caption hp-text-color-black-80 hp-text-color-dark-30 hp-font-weight-400 hp-text-underline hp-ml-4">Free Shipping Worldwide</span>
                    </Col>

                    <Col span={24} className="hp-d-flex-center">
                      <RiCheckboxCircleLine className="hp-text-color-primary-1" />
                      <span className="hp-caption hp-text-color-black-80 hp-text-color-dark-30 hp-font-weight-400 hp-text-underline hp-ml-4">Available in stocks</span>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Divider />

              <Row gutter={[24, 24]}>
                <Col md={10} span={24}>
                  <Row align="middle">
                    <Col
                      className="hp-border-radius-full hp-bg-color-primary-4 hp-d-flex-full-center hp-mr-8"
                      style={{ width: 36, height: 36 }}
                    >
                      <RiShieldLine className="hp-text-color-primary-1" size={24} />
                    </Col>

                    <Col>
                      <span className="hp-d-block hp-p1-body hp-font-weight-500 hp-text-color-black-100 hp-text-color-dark-0">
                        1 Year Warranty
                      </span>

                      <span className="hp-d-block hp-input-description hp-font-weight-400 hp-text-color-black-80 hp-text-color-dark-30">
                        Lorem Ipsum Dolor Sıt Amet
                      </span>
                    </Col>
                  </Row>
                </Col>

                <Col md={10} span={24}>
                  <Row align="middle">
                    <Col
                      className="hp-border-radius-full hp-bg-color-primary-4 hp-d-flex-full-center hp-mr-8"
                      style={{ width: 36, height: 36 }}
                    >
                      <RiTimeLine className="hp-text-color-primary-1" size={24} />
                    </Col>

                    <Col>
                      <span className="hp-d-block hp-p1-body hp-font-weight-500 hp-text-color-black-100 hp-text-color-dark-0">
                        14 Days Replacement
                      </span>
                      <span className="hp-d-block hp-input-description hp-font-weight-400 hp-text-color-black-80 hp-text-color-dark-30">
                        Lorem Ipsum Dolor Sıt Amet
                      </span>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col> */}
            <Col lg={12} span={24}>
              <Row>
                <Col lg={11} md={12} span={24}>
                  <CustomerFeatureCard
                    ticketCount={lotteryData.ticketCount}
                  />
                </Col>
                <Col lg={2} span={24}></Col>
                <Col lg={11} md={12} span={24}>
                  <OrdersFeatureCard
                    soldTicketCount={'Find field'}
                  />
                </Col>
              </Row>
              <br />
              <Row>
                <Col xl={11} md={12} span={24}>
                  <SaleFeatureCard ticketPrice={lotteryData.ticketPrice} />
                </Col>
                <Col lg={2} span={24}></Col>
                <Col xl={11} md={12} span={24}>
                  <ProfitFeatureCard
                    winChance={((1 * 100) / lotteryData.prize).toFixed(2)}
                  />
                </Col>
              </Row>
              <br />
              <Row>
                <Col lg={24} md={24} span={24}>
                  {lotteryData && (
                    <>
                      {lotteryData.isGotAllAvailableItems ? (
                        <div
                          size="large"
                          disabled
                          className="buyTicketBtn alreadyGotAllAvailableItems hp-bg-secondary-1 hp-border-color-secondary-1 hp-hover-bg-secondary-2 hp-hover-border-color-secondary-2"
                        >
                          You have added all possible quantity to the cart
                        </div>
                      ) : (
                        <Link to="/apps/ecommerce/orderDetail" onClick={(event) => { event.preventDefault(); onBuyTicketClick(lotoDetail.id); }}>
                          <Button
                            size="large"
                            className="buyTicketBtn hp-bg-secondary-1 hp-border-color-secondary-1 hp-hover-bg-secondary-2 hp-hover-border-color-secondary-2"
                          >
                            BUY TICKET
                          </Button>
                        </Link>
                      )}
                    </>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
          <Divider />

          <Row>
            <Col
              span={24}
              className="hp-ecommerce-app-detail-other-slider hp-mt-64"
            >
              <HotBidNFT lotteryListData={lotteryListData} />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
}
