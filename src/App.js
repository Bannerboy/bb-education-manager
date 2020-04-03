import React, { Fragment, Component } from 'react';

import { GlobalStyle } from './components/global/globalStyle';
import styled from "styled-components";
import CourseList from "./components/courseList/CourseList"
import Header from "./components/Header"

const Wrapper = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column; 
  width: 100%;
  `


class App extends Component{
  constructor (props){
    super(props);
    this.setFieldText = this.setFieldText.bind(this);
    this.setUser = this.setUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state = ({
      searchFieldText: "",
      user: {},
      users: {}
    })
  }
  setFieldText(text) {
    this.setState({searchFieldText: text})
  }

  isUserOnline(user) {
    if(!user) return false
    return  Object.keys(user).length > 0
  }

  async setUser(user) {
    this.setState({user: user})
    if(!this.isUserOnline(this.state.user)) return;
    await this.props.firebase.getCollection("users").then((userList) => {
      this.setState({users: userList})
      return userList;
      }
    ).then(userList => {
      if(userList[this.state.user.uid] && this.state.user.metadata.lastSignInTime ===  userList[this.state.user.uid].lastSignInTime ) return; //Check if user isn't in the User Collection or if there's no login-difference
      if(this.state.user.metadata.lastSignInTime === this.state.user.metadata.creationTime) return; //Check if user isn't in the User Collection or if there's no login-difference
      console.log("FIRE")
      this.props.firebase.updateUser(this.state.user)
    })
  }
  componentDidMount(){
     this.props.firebase.addUserListener(this.setUser)
  }
 
  render(){
    return (
      <Fragment>
        <GlobalStyle />
        <Wrapper>  
            <Header input_searchFieldText={this.state.searchFieldText} input_setFieldText={this.setFieldText} fireBase={this.props.firebase} user={this.state.user} setUser={this.setUser}/>
            {
              (!this.isUserOnline(this.state.user))
              ? <p>Please Log IN</p>
              : <CourseList userList={this.state.users} fireBase={this.props.firebase} filterText={this.state.searchFieldText} user={this.state.user}/>
            }
          </Wrapper>
      </Fragment>
      );
  }
}

export default App;
