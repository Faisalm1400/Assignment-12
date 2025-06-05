import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://newspaper-server-rose.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;