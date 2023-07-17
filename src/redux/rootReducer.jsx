import { combineReducers } from "redux";
import calendarReducer from "./calendar/calendarReducer";
import contactReducer from "./contact/contactReducer";
import customiseReducer from "./customise/customiseReducer";
import ecommerceReducer from "./ecommerce/ecommerceReducer";
import loginReducer from "./login/loginReducer";

const rootReducer = combineReducers({
  calendar: calendarReducer,
  contact: contactReducer,
  ecommerce: ecommerceReducer,
  customise: customiseReducer,
  login: loginReducer,
});

export default rootReducer;