import axios from "axios";

export const endpoints = {
    'login': '/user/login/',
    'register': '/user/register/',
    'current-user': '/user/current-user/',
    'profile': (id) => `/user/${id}/profile/`,
    'update': (id) => `/user/${id}/update/`,
    'change-password': '/change-password/',
    
    'create-appointment':  '/appointment/create-appointment/',
    'get-list-pending': '/appointment/get-list-pending/',
    'cancel-appointment': (id) => `/appointment/${id}/cancel-appointment/`,
    'status-change': (id) => `/appointment/${id}/status-change/`,
    'appointment-details': (id) => `/appointment/${id}/`,
    'get-user-appointment': '/appointment/get-user-appointment/',
    'user-cancel': (id) => `/appointment/${id}/user-cancel-appointment/`,

    'doctors': '/doctor/',
    'doctor_info': (id) => `/doctor/${id}/`,

    'medicines': (kw) => `/medicine/?kw=${kw}`,
    'medicine-details': (id) => `/medicine/?kw=${id}`,

    'patient': (id) => `/patient/${id}/`,

    'create-prescription': '/prescription/',
    'user-pres': '/prescription/user-pres/',
    'prescription-details': (prescriptionId) => `/prescription/${prescriptionId}/`,
    'add-medicine': (id) => `/prescription/${id}/add-medicine/`,
    'make-reciept': (id) => `/prescription/${id}/make-reciept/`,

    'services': (pageNumber) => `/service/?page=${pageNumber}&limit=3`,
    
}

export const authApi = (accessToken) => axios.create({
    baseURL: "http://192.168.1.219:8000",
    headers: {
        "Authorization": `Bearer ${accessToken}`
    }
})

export default axios.create({
    baseURL: "http://192.168.1.219:8000"
})