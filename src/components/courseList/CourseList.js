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
        let posts = {};
        
        this.props.fireBase.getCollection("courses").then(res => {
            posts = Object.entries(res).map(course => course[1]);
            // console.log()
            this.setState({
                posts: posts
            });
          })
    }

    


    render(){
        return(
            <CourseListContainer>
                <AddCourse currentPosts={this.state.posts} firebase={this.props.fireBase} courseCallback={this.getCourses} user={this.props.user}/>
                {(this.state.posts)
                    .sort((post_a, post_b) => post_b.timestamp - post_a.timestamp)
                    .sort((post_a, post_b) => {
                        const a = post_a.enrolledUsers && post_a.enrolledUsers.length > 0 ? post_a.enrolledUsers.indexOf(this.props.user.uid) > -1 : false
                        const b = post_b.enrolledUsers && post_b.enrolledUsers.length > 0 ? post_b.enrolledUsers.indexOf(this.props.user.uid) > -1 : false
                        return (a === b)? 0 : a? -1 : 1
                    })
                    .filter(post => {
                        const regex = new RegExp(this.props.filterText, "gi")
                        return post.platform.match(regex)|| post.author.match(regex) ||post.title.match(regex) ||post.category.match(regex) ||post.difficulty.match(regex);
                    })
                    .map(post => <CourseEntry userList={this.props.userList} course={post} firebase={this.props.fireBase} user={this.props.user} key={post.url} fetchCourse={this.getCourses}/>)
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