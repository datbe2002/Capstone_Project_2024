// First we need to import axios.js
import axios from 'axios';
import { BASE_API_URL } from '../../constants/fakeInf';
// Next we make an 'instance' of it
const instance = axios.create({
    // .. where we make our configurations
    baseURL: BASE_API_URL,

});


// Also add/ configure interceptors && all the other cool stuff


export default instance;