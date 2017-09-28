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
        user: response.data
      })
    })
  }
  render() {
    const user = this.state.users.map((person, i) => {
      return (
        <div key={i} onClick={ () => { this.getUser(person.id) } }>
          <p>{person.first_name}</p>
          <p>{person.last_name}</p>
          <p>{person.email}</p>
          <p>{person.year_born}</p>
        </div>
      )
    })
    return (
      <div>{user}</div>
    );
  }
}

export default App;
