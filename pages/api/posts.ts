import axios from 'lib/axios';

export const getPost = async id => {
    const { data } = await axios.get('/posts/' + id);
    return data;
}