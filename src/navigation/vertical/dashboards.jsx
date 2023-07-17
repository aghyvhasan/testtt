import { Award, Calendar, Health, BagTick2, Setting, Grid5 } from 'iconsax-react';

import IntlMessages from "../../layout/components/lang/IntlMessages";

const main = [
    {
        id: "dashboards-dashboard",
        title: <IntlMessages id="sidebar-dashboard" />,
        icon: <Health size={18} />,
        navLink: "/main/dashboard/ecommerce",
    },
    {
        id: "dashboards-upcomings",
        title: <IntlMessages id="sidebar-upcomings" />,
        icon: <Health size={18} />,
        navLink: "/main/dashboard/upcomings",
    },
    {
        id: "dashboards-history",
        title: <IntlMessages id="sidebar-history" />,
        icon: <Health size={18} />,
        navLink: "/main/dashboard/history",
    },
    {
        id: "orders",
        title: <IntlMessages id="sidebar-apps-ecommerce-orders" />,
        icon: <BagTick2 size={18} />,
        navLink: "/apps/ecommerce/orders",
    },
    {
        id: "apps-calendar",
        title: <IntlMessages id="sidebar-apps-calendar" />,
        icon: <Calendar size={18} />,
        navLink: "/apps/calendar",
    },
    {
        id: "help",
        title: <IntlMessages id="sidebar-help" />,
        icon: <Award size={18} />,
        navLink: "/pages/faq",
    }
];

export default main