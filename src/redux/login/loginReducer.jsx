import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "login",
  storage: storage,
};

const initialState = {
  token: null,
  error: null,
  isAuthenticated: false,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        token: action.payload,
        error: null,
        isAuthenticated: true,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        token: null,
        error: action.payload,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default persistReducer(persistConfig, loginReducer);

// const initialState = {
//   token: null,
//   error: null,
//   isAuthenticated: false, 
// };

// const loginReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "LOGIN_SUCCESS":
//       return {
//         ...state,
//         token: action.payload,
//         error: null,
//         isAuthenticated: true, 
//       };
//     case "LOGIN_FAILURE":
//       return {
//         ...state,
//         token: null,
//         error: action.payload,
//         isAuthenticated: false, 
//       };
//     default:
//       return state;
//   }
// };

// export default loginReducer;