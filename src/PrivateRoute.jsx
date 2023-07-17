import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);
  const token = useSelector((state) => state.login.token);
  console.log(isAuthenticated);
  console.log(token);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && token ? (
          <Component {...props} />
        ) : (
          <Redirect to="/pages/authentication/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
