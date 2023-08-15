import axios from "axios";
import authStates from "../authStates";

export const loginAction = async (email, password) => {
    try {
        const response = await axios.post(
            "https://cryptolotteryapi.azurewebsites.net/api/user/login",
            {
                email,
                password,
            }
        );
        const token = response.data;
        if (token) {
            localStorage.setItem("token", token);
            authStates.setIsAuth(true)
            history.replace('/main/dashboard/ecommerce')
        }

        return token;
    } catch (error) {
        authStates.setError(error.response.data);
        throw new Error(error.response.data);
    }
}