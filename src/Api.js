import axios from 'axios';

const SERVER = 'https://api.stackexchange.com/2.2/questions?';

const defaultAxiosOptions = {
    baseURL: SERVER
};

export const fetch = axios.create(defaultAxiosOptions);

export const getItems = async (fromDate, toDate, pageSize, page) => {
    const response = await fetch.get(null, {
      params: {
        pageSize,
        fromDate,
        toDate,
        page,
        order: 'desc',
        sort: 'votes',
        site: 'stackoverflow'
      }
    });
    return response.data;
};