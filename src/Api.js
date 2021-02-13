import axios from 'axios';

const SERVER = 'https://api.stackexchange.com/2.2/questions?';

const defaultAxiosOptions = {
    baseURL: SERVER
};

export const fetch = axios.create(defaultAxiosOptions);

export const getItems = async () => {
    const response = await fetch.get('pagesize=30&order=desc&sort=votes&site=stackoverflow');
    return response.data;
};