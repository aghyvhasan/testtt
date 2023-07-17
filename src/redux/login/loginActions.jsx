import { authService } from "../../apiService";

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await authService.login(email, password);
    const token = response.token;
    dispatch(loginSuccess(token));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export const loginSuccess = (token) => ({
  type: "LOGIN_SUCCESS",
  payload: token,
});

export const loginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});
