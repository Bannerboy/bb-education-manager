import styled from "styled-components";
import React, { Component } from "react"
import {variables} from "../global/variables"
import CourseEntry from "./CourseEntry"


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
    constructor(props){
        super(props);
        this.state = {
            posts: [],
        }
        this.componentDidMount.bind(this);
    }

    componentDidMount() {
        let posts = [];
        console.log(this.props.fireBase)
        this.props.fireBase.getCourses().then(res => {
            posts = res;
            console.log(posts)
            this.setState({
                posts: posts
            });
          })
    }

    


    render(){
        return(
            <CourseListContainer>
                {this.state.posts
                    .filter(post => {
                        const regex = new RegExp(this.props.filterText, "gi")
                        // console.log(this.props, post.platform, post.platform.match(regex))
                        return post.platform.match(regex) || post.author.match(regex) ||post.title.match(regex) ||post.category.match(regex) ||post.difficulty.match(regex);
                    })
                    .map(post => <CourseEntry course={post} key={post.url}/>)
                }
            </CourseListContainer>
        )
    }
}
CourseList.propTypes = {
    
};
CourseList.defaultProps = {
    
  };

export default CourseList;