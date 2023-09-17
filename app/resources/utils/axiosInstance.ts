import axios from 'axios';
import { configVariable } from '../constant/ConfigVariable';

const axiosInstance = axios.create({
    baseURL:configVariable.BASE_URL
});

export default axiosInstance;