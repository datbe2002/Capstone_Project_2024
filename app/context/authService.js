import instance from './axiosConfig';

const setUserAuthToken = (token) => {
    console.log('auth service', token)
    if (token) {
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete instance.defaults.headers.common['Authorization'];
    }
};

export { setUserAuthToken };
