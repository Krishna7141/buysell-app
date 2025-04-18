const BASE_URL = import.meta.env.VITE_BASE_URL

export const authApi = {
    SIGNUP_API: BASE_URL+'auth/signup',
    LOGIN_API: BASE_URL+'auth/login',
}

export const propertyApi = {
    ADD_PROPERTY_API: BASE_URL+'property/addProperty',
    UPDATE_PROPERTY_API: BASE_URL+'property/updateProperty',
    DELETE_PROPERTY_API: BASE_URL+'property/deleteProperty',
    GET_ALL_PROPERTIES_API: BASE_URL+'property/getAllProperties',
    GET_USER_PROPERTIES_API: BASE_URL+'property/getUserProperties',
    GET_PROPERTY_DETAILS_API: BASE_URL+'property/getProperty',
}