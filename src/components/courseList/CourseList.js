import styled from "styled-components";
import React, { Component } from "react"
import {variables} from "../global/variables"

export const CourseListContainer  = styled.ul`
    width: 100%;
    @media (orientation: landscape) {
        width: 50%;
    }
    /* background-color: ${variables.colorRed}; */
    border-radius: 3rem 3rem 2rem 2rem;
    height: auto;
    overflow: hidden;
    & > li:not(:last-child) {
        border-bottom: 0.05rem solid ${variables.colorWhite}; 

    }
    
`

class CourseList extends Component{
    render(){
        return(
            <CourseListContainer>
                {this.props.children}
            </CourseListContainer>
        )
    }
}
CourseList.propTypes = {
    
};
CourseList.defaultProps = {
    
  };

export default CourseList;