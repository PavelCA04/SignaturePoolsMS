import axios from 'axios';

async function deleteData(url) {
  try {
    const response = await axios.delete(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export { deleteData };
