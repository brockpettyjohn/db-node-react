import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
class App extends Component {
  constructor() {
    super();

    this.state = {
      users: [],
      user: []
    }
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
  getUser(id) {
    axios.get('http://localhost:3030/user/' + id)
      .then(response => {
        console.log(response.data)
        this.setState({
          user: response.data[0]
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
        </div>
      )
    })
    return (
      <div className='screen'>
        <div>{user}</div>
        <div>{this.state.user.first_name}</div>
      </div>

    );
  }
}

export default App;
