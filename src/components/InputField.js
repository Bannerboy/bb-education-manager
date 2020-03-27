import styled from "styled-components";
import React, { Component } from "react"
import {variables} from "./global/variables"


const SearchField  = styled.input`
    width: 100%;
    @media (orientation: landscape) {
        width: 50%;
    }
    /* background-color: ${variables.colorRed}; */
    border-radius: 3rem 3rem 2rem 2rem;
    height: 4rem;
    font-size: 2rem;
    padding:1rem;
    
    
`

class InputField extends Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        
    }

    handleChange(e) {
        this.props.searchTextCallback(e.target.value)
        // console.log(e.target.value)
    }


    render(){
        return(
            <SearchField type="text" name="searchfield" placeholder="Search Courses..." onChange={this.handleChange} value={this.props.searchText}/>
        )
    }
}
InputField.propTypes = {
    
};
InputField.defaultProps = {
    
  };

export default InputField;