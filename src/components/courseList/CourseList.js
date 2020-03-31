import styled from "styled-components";
import React, { Component } from "react"
import {variables} from "../global/variables"
import CourseEntry from "./CourseEntry"
import AddCourse from "./AddCourse"


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
        this.getCourses = this.getCourses.bind(this);
    }

    componentDidMount() {
        this.getCourses()
    }
    
    getCourses(){
        let posts = [];
        
        this.props.fireBase.getCourses().then(res => {
            posts = res;
            this.setState({
                posts: posts
            });
          })
    }

    


    render(){
        return(
            <CourseListContainer>
                <AddCourse currentPosts={this.state.posts} firebase={this.props.fireBase} courseCallback={this.getCourses} user={this.props.user}/>
                {this.state.posts
                    .sort((a, b) => b.timestamp - a.timestamp)
                    .filter(post => {
                        const regex = new RegExp(this.props.filterText, "gi")
                        return post.platform.match(regex) || post.author.match(regex) ||post.title.match(regex) ||post.category.match(regex) ||post.difficulty.match(regex);
                    })
                    .map(post => <CourseEntry course={post} firebase={this.props.fireBase} user={this.props.user} key={post.url}/>)
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