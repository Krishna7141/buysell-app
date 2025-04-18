import { authApi } from "../apis"
import { apiConnector } from "../apiConnector"
import toast from "react-hot-toast"
import { setToken } from "../../slices/authSlice"


export const signup = async (data, navigate) => {
    try {
        const response = await apiConnector("POST", authApi.SIGNUP_API, data)
        if(!response.data.success) {
            throw new Error(response.data.message)
        }
        navigate('/login')
    } catch(err) {
        toast.error(err.response.data.message)
        console.log(err.response.data.message)
        navigate('/signup')
    }
}

export const login = async (data, navigate) => {
    // return async(dispatch) => {
        try {
            const response = await apiConnector("POST", authApi.LOGIN_API, data)
            if(!response.data.success) {
                throw new Error(response.data.message)
            }
            // dispatch(setToken(response.data.user.token))
            localStorage.setItem("user", JSON.stringify(response.data.user))
            localStorage.setItem("token", JSON.stringify(response.data.user.token))
            navigate('/')
            window.location.reload()
        } catch(err) {
            toast.error(err?.response?.data?.message)
            console.log(err?.response?.data?.message)
            navigate('/signup')
        }
    // }
}

export const logout = async (navigate) => {
    return async(dispatch) => {
        dispatch(setToken(null))
        // dispatch(setUser(null))
        navigate('/')
        localStorage.clear()
        window.location.reload()
    }
}