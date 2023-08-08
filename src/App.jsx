// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { ConfigProvider } from "antd";
// import { IntlProvider } from "react-intl";
// import AppLocale from "./languages";
// import Router from "./router/Router";
// import { useHistory } from "react-router-dom";
// import Login from "../src/view/pages/authentication/login";

// function App() {
//   const customise = useSelector((state) => state.customise);
//   const currentAppLocale = AppLocale[customise.language];

//   return (
//     <ConfigProvider
//       locale={currentAppLocale.antd}
//       direction={customise.direction}
//     >
//       <IntlProvider
//         locale={currentAppLocale.locale}
//         messages={currentAppLocale.messages}
//       >
//         <Router />
//       </IntlProvider>
//     </ConfigProvider>
//   );
// }

// function AppWithRedirect() {
//   const history = useHistory();
//   const token = localStorage.getItem("token");
//   const isLoggedIn = !!token;

//   useEffect(() => {
//     if (!isLoggedIn) {
//       history.push("/pages/authentication/login");
//     } else {
//       history.push("/main/dashboard/ecommerce");
//     }
//   }, [history, isLoggedIn]);

//   return isLoggedIn ? <App /> : <Login />;
// }
// export default AppWithRedirect;

// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { ConfigProvider } from "antd";
// import { IntlProvider } from "react-intl";
// import AppLocale from "./languages";
// import Router from "./router/Router";

// export default function App() {
//   // Redux
//   const customise = useSelector((state) => state.customise);

//   // Lang
//   const currentAppLocale = AppLocale[customise.language];

//   useEffect(() => {
//     document.querySelector("html").setAttribute("lang", customise.language);
//   }, [customise]);

//   return (
//     <ConfigProvider
//       locale={currentAppLocale.antd}
//       direction={customise.direction}
//     >
//       <IntlProvider
//         locale={currentAppLocale.locale}
//         messages={currentAppLocale.messages}
//       >
//         <Router />
//       </IntlProvider>
//     </ConfigProvider>
//   );
// }

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ConfigProvider } from "antd";
import { IntlProvider } from "react-intl";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AppLocale from "./languages";
import PrivateRoute from "./PrivateRoute";
import Home from "../src/view/main/dashboard/ecommerce";
import PasswordChange from "../src/view/pages/profile/password-change";
import Login from "../src/view/pages/authentication/login";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../src/redux/store";
import { Provider } from "react-redux";

export default function App() {
  const customise = useSelector((state) => state.customise);
  const currentAppLocale = AppLocale[customise.language];

  useEffect(() => {
    document.querySelector("html").setAttribute("lang", customise.language);
  }, [customise]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConfigProvider
          locale={currentAppLocale.antd}
          direction={customise.direction}
        >
          <IntlProvider
            locale={currentAppLocale.locale}
            messages={currentAppLocale.messages}
          >
            <Router>
              <Switch>
                <PrivateRoute
                  exact
                  path="/main/dashboard/ecommerce"
                  component={Home}
                />
                <Route
                  exact
                  path="/pages/authentication/login"
                  component={Login}
                />
                <PrivateRoute
                  exact
                  path="/pages/profile/password-change"
                  component={PasswordChange}
                />
                <Redirect to="/main/dashboard/ecommerce" />
              </Switch>
            </Router>
          </IntlProvider>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  );
}

// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { ConfigProvider } from "antd";
// import { IntlProvider } from "react-intl";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Redirect,
// } from "react-router-dom";
// import AppLocale from "./languages";
// import PrivateRoute from "./PrivateRoute";
// import Home from "../src/view/main/dashboard/ecommerce";
// import Login from "../src/view/pages/authentication/login";

// export default function App() {
//   const customise = useSelector((state) => state.customise);
//   const currentAppLocale = AppLocale[customise.language];

//   useEffect(() => {
//     document.querySelector("html").setAttribute("lang", customise.language);
//   }, [customise]);

//   return (
//     <ConfigProvider
//       locale={currentAppLocale.antd}
//       direction={customise.direction}
//     >
//       <IntlProvider
//         locale={currentAppLocale.locale}
//         messages={currentAppLocale.messages}
//       >
//         <Router>
//           <Switch>
//             <PrivateRoute exact path="/main/dashboard/ecommerce" component={Home} />
//             <Route exact path="/pages/authentication/login" component={Login} />
//             <Redirect to="/main/dashboard/ecommerce" />
//           </Switch>
//         </Router>
//       </IntlProvider>
//     </ConfigProvider>
//   );
// }
