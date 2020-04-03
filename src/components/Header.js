import styled from "styled-components";
import React, { Component } from "react"
import {variables} from "./global/variables"
import InputField from "./InputField"
import PropTypes from "prop-types";


const HeaderBar  = styled.header`
width: 100%;
display: flex;
flex-direction: row;
@media (orientation: landscape) {
    width: 50%;
}
/* background-color: ${variables.colorRed}; */
border-radius: 3rem 3rem 2rem 2rem;
height: 4rem;
font-size: 2rem;
padding:1rem;
& > a {
    cursor: pointer;
}
& #btn-avatar{
    height: 4rem;
    padding: 0rem;
    width: 4rem;
    border-radius: 50%;
    background-size: 4rem;
    object-fit: cover;
    object-position: 50% 50%;
}
& > #btn-login {
    background-color: ${variables.colorLightBlue};
    color: ${variables.colorBlack};
    height: 4rem;
    padding: 0 1rem;
}
margin-bottom: 2rem;


`

class Header extends Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.login = this.login.bind(this)
        this.logOut = this.logOut.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this);
        
    }

    componentDidMount() {
        
    }

    handleChange(e) {
        this.state.input.callback(e.target.value)
        // console.log(e.target.value)
    }
    
    async login(e){
        e.preventDefault();
        this.props.setUser(await this.props.fireBase.login());
    }
    async logOut(e){
        e.preventDefault();
        const userConfirm = window.confirm("Do you wish to log out?")
        await this.props.fireBase.logOut();
        if(userConfirm) this.props.setUser({});
    }


    render(){
    
        return(
            <HeaderBar>
                <InputField searchText={this.props.input_searchFieldText} searchTextCallback={this.props.input_setFieldText}/>
                {
                    (!this.props.user || Object.keys(this.props.user).length === 0) ? <button id="btn-login" onClick={this.login}>Login</button> : <button id="btn-avatar" style={{backgroundImage: `url(${this.props.user.photoURL})`}} onClick={this.logOut} alt={this.props.user.displayName}></button>
                }
            </HeaderBar>
        )
    }
}
Header.propTypes = {
    user: PropTypes.object,
    
};
Header.defaultProps = {
    user: {
        displayName: "User",
        photoURL: "https://i.pravatar.cc/300"
    }
  };

export default Header;