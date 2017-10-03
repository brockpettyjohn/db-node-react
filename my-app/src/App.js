import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
class App extends Component {
  constructor() {
    super();

    this.state = {
      users: [],
      user: [],
      firstName: '',
      lastName: '',
      email: '',
      birthYear: null

    }
    this.handleInput = this.handleInput.bind(this)
    this.create = this.create.bind(this)
  }

  componentDidMount() {
    axios.get('http://localhost:3030/users')
      .then(response => {
        console.log(response)
        this.setState({
          users: response.data
        })
      })

  }

  handleInput(e, formField) {
    this.setState({
      [formField]: e.target.value
    })
  }

  create() {
    // e.preventDefault()
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      birthYear: null
    })
    const data = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
      year_born: this.state.birthYear
    }
    axios.post('http://localhost:3030/create', data)
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

  getUser(id) {
    axios.get('http://localhost:3030/user/' + id)
      .then(response => {
        console.log(response.data)
        this.setState({
          user: response.data[0]
        })
      })
  }

  murderUser(id){
    axios.delete('http://localhost:3030/user/' + id)
      .then(responseFromDeath => {
        axios.get('http://localhost:3030/users')
        .then(responseFromDeath => {
          console.log(responseFromDeath)
          this.setState({
            users: responseFromDeath.data
          })
        })
        
      })
  }
  render() {
    const user = this.state.users.map((person, i) => {
      return (
        <div className='user-box' key={i} onClick={() => { this.getUser(person.id) }}>
          <p>{person.first_name}</p>
          <p>{person.last_name}</p>
          <p>{person.email}</p>
          <p>{person.year_born}</p>
          <button onClick={() => { this.murderUser(person.id) }}>Murder</button>
        </div>
      )
    })
    return (
      <div className='screen'>
        <div className='text-fields'>
          <span>First</span>
          <input type='text' name='First' onChange={(e) => { this.handleInput(e, 'firstName') }} />
          <span>Last</span>
          <input type='text' name='Last' onChange={(e) => { this.handleInput(e, 'lastName') }} />
          <span>Email</span>
          <input type='text' name='Email' onChange={(e) => { this.handleInput(e, 'email') }} />
          <span>Birth</span>
          <input type='text' name='Birth' onChange={(e) => { this.handleInput(e, 'birthYear') }} />
          <button onClick={this.create}>Create</button>
        </div>
        <div className='user-boxes'>{user}</div>
        <div>{this.state.user.first_name}</div>
      </div>

    );
  }
}

export default App;
