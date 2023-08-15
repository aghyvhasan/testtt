import { makeAutoObservable, runInAction } from "mobx";

class AuthStates {
    isAuthenticated = false;
    error=null;

    constructor() {
        makeAutoObservable(this);
    }

    setIsAuth(bool) {
        runInAction(()=>{
            this.isAuth = bool;
        })
    }

    setError(error) {
        runInAction(()=>{
            this.error = error;
        })
    }
}

export default new AuthStates();