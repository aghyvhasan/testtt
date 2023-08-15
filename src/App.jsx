import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ConfigProvider } from "antd";
import { IntlProvider } from "react-intl";
import AppLocale from "./languages";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../src/redux/store";
import { Provider } from "react-redux";
import Router from "./router/Router";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom";
import { useCheckUser } from "./hooks/useCheckUser";

export default function App() {
  const customise = useSelector((state) => state.customise);
  const currentAppLocale = AppLocale[customise.language];

  useEffect(() => {
    document.querySelector("html").setAttribute("lang", customise.language);
  }, [customise]);


  return (
    // <PersistGate loading={null} persistor={persistor}>
    <Provider store={store}>
      <BrowserRouter>
        <ConfigProvider locale={currentAppLocale.antd} direction={customise.direction}>
          <IntlProvider locale={currentAppLocale.locale} messages={currentAppLocale.messages}>
            <Router />
          </IntlProvider>
        </ConfigProvider>
      </BrowserRouter>
    </Provider>
    // </PersistGate>
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
