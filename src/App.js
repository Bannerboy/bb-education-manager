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
      user: {}
    })
  }
  setFieldText(text) {
    this.setState({searchFieldText: text})
  }
  setUser(user) {
    this.setState({user: user})
  }
  componentDidMount(){
     this.props.firebase.addUserListener(this.setUser)
  }
 
  render(){
    return (
      <React.Fragment>
        <GlobalStyle />
        <Wrapper>  
            <Header input_searchFieldText={this.state.searchFieldText} input_setFieldText={this.setFieldText} fireBase={this.props.firebase} user={this.state.user} setUser={this.setUser}/>
            {
              (!this.state.user || Object.keys(this.state.user).length === 0)
              ? <p>Please Log IN</p>
              : <CourseList fireBase={this.props.firebase} filterText={this.state.searchFieldText} user={this.state.user}/>
            }
          </Wrapper>
      </React.Fragment>
      );
  }
}

export default App;
