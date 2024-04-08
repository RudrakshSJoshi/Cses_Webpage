import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: `http://${window.location.hostname}:8000/api`
})

axiosInstance.interceptors.request.use((config) => {
    console.log(window.location.hostname)
    const authToken = localStorage.getItem('token')
    if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`
    }
    return config
})

axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response.status === 401 && error.response.data.message === "Not authorized, Token failed") {
            localStorage.removeItem('token');
            // alert('Your session has expired. Please login again.');
            window.location.href = '/token-expired';
        }
        return Promise.reject(error)
    }
)

export default axiosInstance
