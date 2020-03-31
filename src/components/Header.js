import styled from "styled-components";
import React, { Component } from "react"
import {variables} from "./global/variables"
import InputField from "./InputField"


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
    &>a>img{
        height: 4rem;
        padding: 0rem;
        width: 4rem;
        border-radius: 50%;
        object-fit: contain;
    }
    & > button {
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
                    (!this.props.user || Object.keys(this.props.user).length === 0) ? <button onClick={this.login}>Login</button> : <a onClick={this.logOut}><img src={this.props.user.photoURL} alt={this.props.user.displayName}/></a>
                }
            </HeaderBar>
        )
    }
}
Header.propTypes = {
    
};
Header.defaultProps = {
    
  };

export default Header;