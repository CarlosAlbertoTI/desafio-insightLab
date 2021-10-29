import Axios from 'axios';

const instance = Axios.create({
    baseURL:"http://localhost:1337/parse"
});

instance.defaults.headers.common['X-Parse-Application-Id'] = 'flight'

export default instance;