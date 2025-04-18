import { propertyApi } from "../apis"
import { apiConnector } from "../apiConnector"
import toast from "react-hot-toast"

export const getAllProperties = async () => {
    let result
    try {
        const response = await apiConnector("GET", propertyApi.GET_ALL_PROPERTIES_API)
        if(!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response?.data?.data
        console.log(result)
    } catch(err) {
        toast.error(err?.response?.data?.message)
        console.log(err?.response?.data?.message)
    }
    return result
}

export const addProperty = async (data, token, navigate) => {
    let result
    try {
        const response = await apiConnector("POST", propertyApi.ADD_PROPERTY_API, data, {
            'Authorization': `${token}`
        })
        if(!response.data.success) {
            throw new Error(response.data.message)
        }
        toast.success("Property Added")
        result = response?.data?.data
        navigate('/')
    } catch(err) {
        console.log(err)
        toast.error(err.response.data.message)
    }
    return result
}

export const getMyProperties = async (token) => {
    let result
    try {
        const response = await apiConnector("GET", propertyApi.GET_USER_PROPERTIES_API, null, {
            'Authorization': `${token}`
        })
        result = response?.data?.data?.properties
        // console.log(response?.data?.data?.properties)
    } catch(err) {
        console.log(err)
        toast.error(err.response.data.message)
    }
    return result
}

export const deleteProperty = async (propertyId, token) => {
    try {
        const response = await apiConnector("DELETE", propertyApi.DELETE_PROPERTY_API+`/${propertyId}`, null, {
            'Authorization': `${token}`
        })
        if(!response.data.success) {
            throw new Error(response.data.message)
        }
        window.location.reload()
        console.log(response)
    } catch(err) {
        console.log(err)
        toast.error(err.response.data.message)
    }
}

export const updateProperty = async (data, propertyId, token, navigate) => {
    try {
        const response = await apiConnector("POST", propertyApi.UPDATE_PROPERTY_API+`/${propertyId}`, data, {
            'Authorization': `${token}`
        })
        if(!response.data.success) {
            throw new Error(response.data.message)
        }
        navigate('/my-properties')
    } catch(err) {
        console.log(err)
        toast.error(err.response.data.message)
    }
}

export const getProperty = async (propertyId, token) => {
    let result
    try {
        const response = await apiConnector("GET", propertyApi.GET_PROPERTY_DETAILS_API+`/${propertyId}`, null, {
            'Authorization': `${token}`
        })
        if(!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response?.data?.data
        // navigate('')
    } catch(err) {
        console.log(err)
        toast.error(err.response.data.message)
    }
    return result
}