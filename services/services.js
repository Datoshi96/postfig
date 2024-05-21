import axios from 'axios';

export const serviceGetPost = () => {
    return axios.get(`https://dummyapi.io/data/v1/post?limit=10`,{headers:{'app-id':'6112dc7c3f812e0d9b6679dd'}});
 }