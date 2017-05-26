import React from 'react'
import UserForm from './UserForm'
import VegeForm from './VegeForm'
const api = require('../api')

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      users: [],
      user_id: null

    }
  }

  componentDidMount () {
    this.refreshList()
  }

  refreshList () {
    api.getVegetables((err, users) => {
      this.setState({users})
    })
  }

  saveUser(user){
    api.saveUser(user, (user_id) => {
      user.id = user_id
    })
  }
  selectUser(user_id) {
    console.log({user_id});
    // let user = this.state.users.find((user) => user.id == user_id)
    this.setState({user_id})
  }

  render(){
    return (
      <div>
        <UserForm selectUser={this.selectUser.bind(this)} saveUser={this.saveUser.bind(this)}/>
        {this.state.user_id != null && <VegeForm userId={this.state.user_id}/> }
        {this.state.users.map((u, i) => <User user={u} key={i}/>)}
      </div>
    )
  }
}

const User = ({user}) => {
  return (
    <div className = 'user'>
      <h1>{user.name} : {user.email}</h1>
      <h2>{user.vegetables}</h2>
      <img src={user.imgURL}/>
    </div>
  )
}


export default App
