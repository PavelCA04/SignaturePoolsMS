import axios from 'axios';

async function makeRequest(method, url, data = null) {
  try {
    const config = {
      method,
      url,
      data
    };
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Request failed');
  }
}

const httpClient = {
  get: (url) => makeRequest('get', url),
  post: (url, data) => makeRequest('post', url, data),
  put: (url, data) => makeRequest('put', url, data),
  delete: (url) => makeRequest('delete', url)
};

export { httpClient };
