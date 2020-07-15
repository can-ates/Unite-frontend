import axios from 'axios'

export const validateForm = (data, cb) => {
    axios.post('http://localhost:3002/api/users/register', data).then((res) => {
        console.log(res.data.doc)
        cb(res.data)
    })
}