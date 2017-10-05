import * as service from './service.js'
import axios from 'axios'

const GET_USERS = 'GET_USERS';
const GET_USERS_FULFILLED = 'GET_USERS_FULFILLED';
const GET_USER = 'GET_USER';
const GET_USER_FULFILLED = 'GET_USER_FULFILLED';
const INPUT = 'INPUT';
const CREATE = 'CREATE'

const initialState = {
    users: [],
    user: [],
    firstName: '',
    lastName: '',
    email: '',
    birthYear: null,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USERS_FULFILLED:
            return Object.assign({}, state, { users: action.payload });
        case GET_USER_FULFILLED:
            return Object.assign({}, state, { user: action.payload });
        case INPUT:
            return Object.assign({}, state, { [action.payload.formField]: action.payload.input });
        case CREATE:
            return Object.assign({}, state, { users: action.payload, firstName: '', lastName: '', email: '', birthYear: null })
        default:
            return state
    }
}

export function getUsers() {

    return {
        type: GET_USERS,
        payload: service.getUsers()
    }
}

export function getUser(id) {
    return {
        type: GET_USER,
        payload: service.getUser(id)
    }
}

export function handleInput(input, formField) {
    return {
        type: INPUT,
        payload: {
            formField,
            input
        }
    } 
}

export function create() {
    
    return {
        type: CREATE,
        payload: service.create()
    }
}
