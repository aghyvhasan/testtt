import { useEffect } from "react"
import authStates from "../mobx/auth/authStates"

export const useCheckUser=(history)=>{
    useEffect(()=>{
        const token=localStorage.getItem('token')
        if(token||authStates.isAuth){
            authStates.setIsAuth(true)
            history.replace('/main/dashboard/ecommerce')
        }else{
            authStates.setIsAuth(false)
            history.replace('/pages/authentication/login')
        }

    },[authStates.isAuth])
}