import axios from 'axios'

export const getUsers = () => {
    return axios.get('http://localhost:3030/users')
        .then(usersObject => {
            console.log(usersObject)
            return usersObject.data
        })
}

export const getUser = (id) => {
    return axios.get('http://localhost:3030/user/' + id)
        .then(singleUserObject => {
            return singleUserObject.data[0]
        })
}

export const create = (firstName, lastName, email, birthYear) => {
    const data = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        year_born: birthYear
    }
    axios.post('http://localhost:3030/create', data)
        .then(response => {
            axios.get('http://localhost:3030/users')
                .then(getNewObject => getNewObject.data)
        }).catch(err => {
            console.log('create user err', err)
        })
}

export const murderUser = (id) => {
    return axios.delete('http://localhost:3030/user/' + id).then(responseFromMurder => {
        console.log(responseFromMurder)
        axios.get('http://localhost:3030/users')
            .then(getNewObject => getNewObject.data)
    })
}
