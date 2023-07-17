import { Calendar, Bookmark, Award, Messages1, Shop } from "iconsax-react";

import IntlMessages from "../../layout/components/lang/IntlMessages";

const apps = [
  {
    header: <IntlMessages id="sidebar-apps" />,
  },
  {
    id: "dashboards-analytics",
    title: <IntlMessages id="sidebar-dashboards-analytics" />,
    icon: <Bookmark size={18} />,
    navLink: "/main/dashboard/analytics",
  },
  {
    id: "dashboards-nft",
    title: <IntlMessages id="sidebar-dashboards-nft" />,
    icon: <Bookmark size={18} />,
    navLink: "/main/dashboard/nft",
  },
  {
    id: "contact",
    title: <IntlMessages id="sidebar-apps-contact" />,
    icon: <Bookmark size={18} />,
    navLink: "/apps/contact",
  },
  {
    id: "ecommerce",
    title: <IntlMessages id="sidebar-apps-lotteryPages" />,
    icon: <Award size={18} />,
    children: [
      {
        id: "passedLotteryDetails",
        title: <IntlMessages id="sidebar-apps-ecommerce-lottery" />,
        navLink: "/apps/ecommerce/passedLotteryDetails",
      },
      {
        id: "product-detail",
        title: <IntlMessages id="sidebar-apps-ecommerce-product-detail" />,
        navLink: "/apps/ecommerce/product-detail",
      },
      {
        id: "orderDetail",
        title: <IntlMessages id="sidebar-apps-ecommerce-order-detail" />,
        navLink: "/apps/ecommerce/orderDetail",
      },
      {
        id: "checkout",
        title: <IntlMessages id="sidebar-apps-ecommerce-checkout" />,
        navLink: "/apps/ecommerce/checkout",
      },
      {
        id: "orderSuccess",
        title: <IntlMessages id="sidebar-apps-ecommerce-orderSuccess" />,
        navLink: "/apps/ecommerce/orderSuccess",
      },
      {
        id: "invoiceDetail",
        title: <IntlMessages id="sidebar-apps-ecommerce-invoice" />,
        navLink: "/apps/ecommerce/invoiceDetail",
      },
    ],
  },
  {
    id: "knowledge-base",
    title: <IntlMessages id="sidebar-pages-knowledge-base" />,
    icon: <Award size={18} />,
    children: [
      {
        id: "knowledge-base-1",
        title: <IntlMessages id="sidebar-pages-knowledge-base-1" />,
        navLink: "/pages/knowledge-base/knowledge-base-1",
      },
      {
        id: "knowledge-base-2",
        title: <IntlMessages id="sidebar-pages-knowledge-base-2" />,
        navLink: "/pages/knowledge-base/knowledge-base-2",
      },
    ],
  },
];

export default apps;
