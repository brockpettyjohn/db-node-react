import * as service from './service.js'
import axios from 'axios'

const GET_USERS = 'GET_USERS';
const GET_USERS_FULFILLED = 'GET_USERS_FULFILLED';
const GET_USER = 'GET_USER';
const GET_USER_FULFILLED = 'GET_USER_FULFILLED';
const INPUT = 'INPUT';
const CREATE = 'CREATE';
const CREATE_FULFILLED = 'CREATE_FULFILLED'
const MURDER_FULFILLED = 'MURDER_FULFILLED'
const MURDER = 'MURDER'

const initialState = {
    users: [],
    user: [],
    firstName: '',
    lastName: '',
    email: '',
    birthYear: null,
}

export default function reducer(state = initialState, action) {
    console.log(action.payload)
    switch (action.type) {
        case GET_USERS_FULFILLED:
            return Object.assign({}, state, { users: action.payload });
        case GET_USER_FULFILLED:
            return Object.assign({}, state, { user: action.payload });
        case INPUT:
            return Object.assign({}, state, { [action.payload.formField]: action.payload.input });
        case CREATE:
            return Object.assign({}, state, { users: action.payload, firstName: '', lastName: '', email: '', birthYear: null });
        case MURDER:
            return Object.assign({}, state, { users: action.payload })

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

export function create(firstName, lastName, email, birthYear) {

    return {
        type: CREATE,
        payload: service.create(firstName, lastName, email, birthYear)
    }
}

export function murderUser(id) {
    return {
        type: MURDER,
        payload: service.murderUser(id)
    }
}
