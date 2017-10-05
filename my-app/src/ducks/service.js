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

export const create = () => {
    // this.setState({
    //     firstName: '',
    //     lastName: '',
    //     email: '',
    //     birthYear: null
    // })
    // const data = {
    //     first_name: state.firstName,
    //     last_name: state.lastName,
    //     email: state.email,
    //     year_born: state.birthYear
    // }
    axios.post('http://localhost:3030/create')
        .then(response => {
            axios.get('http://localhost:3030/users')
                .then(responseFromCreate => {
                    console.log(responseFromCreate)
                    this.setState({
                        users: responseFromCreate.data
                    })
                })
        }).catch(err => {
            console.log('create user err', err)
        })
}

export const murderUser = (id) => {
    return axios.delete('http://localhost:3030/users/' + id).then(responseFromMurder => {
        axios.get('http://localhost:3030/users')
            .then(getNewObject => getNewObject.data)
    })
}
