import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://humburger-166dd.firebaseio.com/'
})

export default instance