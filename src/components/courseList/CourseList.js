import styled from "styled-components";
import React, { Component } from "react"
import {variables} from "../global/variables"

export const CourseListContainer  = styled.ul`
    width: 100%;
    /* background-color: ${variables.colorRed}; */
    border-radius: 3rem 3rem 2rem 2rem;
    height: auto;
    overflow: hidden;
    
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