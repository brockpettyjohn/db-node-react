import React, { Component } from 'react';
import { getUsers, getUser, handleInput, create, murderUser } from './ducks/reducer.js';
import { connect } from 'react-redux'
import './App.css';
// import axios from 'axios'
class App extends Component {
  constructor() {
    super();

    this.state = {
      users: [],
      user: [],
      firstName: '',
      lastName: '',
      email: '',
      birthYear: null,
      modal: false
    }

    // this.handleInput = this.handleInput.bind(this)
    // this.create = this.create.bind(this)
    this.modalToggle = this.modalToggle.bind(this)
  }

  // componentDidMount() {
  //   axios.get('http://localhost:3030/users')
  //     .then(response => {
  //       console.log(response)
  //       this.setState({
  //         users: response.data
  //       })
  //     })
  // }

  componentDidMount() {
    this.props.getUsers()
  }


  // handleInput(e, formField) {
  //   this.setState({
  //     [formField]: e.target.value
  //   })
  // }

  // create(e) {
  //   e.preventDefault()
  //   this.setState({
  //     firstName: '',
  //     lastName: '',
  //     email: '',
  //     birthYear: null
  //   })
  //   const data = {
  //     first_name: this.state.firstName,
  //     last_name: this.state.lastName,
  //     email: this.state.email,
  //     year_born: this.state.birthYear
  //   }
  //   axios.post('http://localhost:3030/create', data)
  //     .then(response => {
  //       axios.get('http://localhost:3030/users')
  //         .then(responseFromCreate => {
  //           console.log(responseFromCreate)
  //           this.setState({
  //             users: responseFromCreate.data
  //           })
  //         })
  //     }).catch(err => {
  //       console.log('create user err', err)
  //     })
  // }

  // getUser(id) {
  //   axios.get('http://localhost:3030/user/' + id)
  //     .then(response => {
  //       console.log(response.data)
  //       this.setState({
  //         user: response.data[0]
  //       })
  //     })
  // }

  // murderUser(id) {
  //   axios.delete('http://localhost:3030/user/' + id)
  //     .then(responseFromDeath => {
  //       axios.get('http://localhost:3030/users')
  //         .then(responseFromDeath => {
  //           console.log(responseFromDeath)
  //           this.setState({
  //             users: responseFromDeath.data
  //           })
  //         })

  //     })
  // }
modalToggle(){
  this.setState({
modal: !this.state.modal
  })
}

  render() {
    console.log(this.props.users)
    const user = this.props.users.map((person, i) => {
      return (
        <div className='user-box' key={i} onClick={() => { this.props.getUser(person.id) }}>
          <p>{person.first_name}</p>
          <p>{person.last_name}</p>
          <p>{person.email}</p>
          <p>{person.year_born}</p>
          <button onClick={() => { this.props.murderUser(person.id) }}>Murder</button>
        </div>
      )
    })
    return (
      <div className='screen'>
        <div className='text-fields'>
          <span>First</span>
          <input value={this.props.firstName} type='text' name='First' onChange={(e) => { this.props.handleInput(e.target.value, 'firstName') }} />
          <span>Last</span>
          <input value={this.props.lastName} type='text' name='Last' onChange={(e) => { this.props.handleInput(e.target.value, 'lastName') }} />
          <span>Email</span>
          <input value={this.props.email} type='text' name='Email' onChange={(e) => { this.props.handleInput(e.target.value, 'email') }} />
          <span>Birth</span>
          <input value={this.props.birthYear} type='text' name='Birth' onChange={(e) => { this.props.handleInput(e.target.value, 'birthYear') }} />
          <button onClick={() => { this.props.create(this.props.firstName, this.props.lastName, this.props.email, this.props.birthYear); this.props.getUsers() }}>Create</button>
        </div>
        <div className='user-boxes'>{user}</div>
        <div>{this.props.user.first_name}</div>
        <button onClick={this.modalToggle}>hola</button>
        {
          this.state.modal ?
        "brock"
        :
        null
        }
      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users,
    user: state.user,
    firstName: state.firstName,
    lastName: state.lastName,
    email: state.email,
    birthYear: state.birthYear
  }
}

export default connect(mapStateToProps, { getUsers, getUser, handleInput, create, murderUser })(App);
