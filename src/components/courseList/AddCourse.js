import React, { Component } from "react"
import styled from "styled-components";
import PropTypes from 'prop-types';
import {variables} from "../global/variables"

const Course  = styled.li`
width: 100%;
height: auto;
background-color: ${variables.colorGreen};
font-weight: 400;
transition: opacity 0.3s ease-in-out;
opacity: 1;
color: ${variables.colorBlack};
&>ul {
    display: flex;
    flex-direction: column;
    padding: 0 2rem;
    & .card {
        display: flex;
        font-size: 1.5rem;
    }
    & .previewCard {
        padding: 2rem 0;
        justify-content: space-between;
        flex-direction: row;
        cursor: pointer;
        &:hover {
            color: ${variables.colorWhite};
        } 
    }
    & .clicked {
            padding: 2rem 0rem;
            max-height: 100rem;
        }
    & .unclicked {
            padding: 0rem 0rem;
            max-height: 0rem;
        }
    & .expandedCard {
        border-top: 0.1rem solid ${variables.colorWhite};
        transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        justify-content: space-between;
        flex-direction: column;
        overflow: hidden;
        

        & form{
            display: flex;
            flex-direction: column;
            & .form-group {
                display: flex;
                flex-direction: column;
                & > span {
                    width: 100%;
                    & > input {
                        width: 100%;
                    } 
                }

                & #difficulty-options {
                    display: flex;
                    flex-direction: row;
                    & li {
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-items: center;
                        margin-right: 2rem;
                        & * {
                            margin-right: 1rem;
                        }
                        
                }
            }
        }
        > * {
            margin-bottom: 2rem;
        }
        
    }

    & .courseTitle {
        font-weight: 900;
        font-size: 2rem;
    }
}
}

` 

class AddCourse extends Component{
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
            course: this.props.course,
        }
        this.expandCard = this.expandCard.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    expandCard(e){
        this.setState({clicked: !this.state.clicked});

    }
    async handleSubmit(e){
        e.preventDefault();
        let course = {...this.state.course};
        course.bbUploader = {
            name: this.props.user.displayName,
            email: this.props.user.email,
            photo: this.props.user.photoURL
        }
        course.timestamp = Date.now();
        await this.props.firebase.submitCourse(course).then(() =>{
            this.props.courseCallback();

        });
        this.setState({course: this.props.course})
    }
    handleChange = e => {
        let { name, value } = e.target;
        let tempCourse = {...this.state.course};
        tempCourse[name] = value;
    
        this.setState({
            course: tempCourse
        });
      };
    capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    render(){
       
        return(
            <Course>
                <ul>
                    <li>
                        <ul className="previewCard card" onClick={this.expandCard}>
                            <li className="courseTitle">Add New Course</li>
                        </ul>
                    </li>
                    <li>
                        <div className={!this.state.clicked ? "expandedCard card unclicked": "clicked expandedCard card" }>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    {/* <label htmlFor="title">Title</label> */}
                                    <label htmlFor="title">Title</label>
                                    <input key="add-course-form_title" id="title" type="text" name="title" value={this.state.course.title} onChange={this.handleChange} placeholder="Title of the course" required="required"/>
                                    {/* <input key="add-course-form_title" id="title" type="text" name="title" value={this.state.course.title} onChange={this.handleChange} placeholder={this.props.user.uid} required="required"/> */}
                                </div>
                                <div className="form-group">
                                    {/* <label htmlFor="title">Title</label> */}
                                    <label htmlFor="author">Teacher</label>
                                    <input key="add-course-form_author" id="title" type="text" name="author" value={this.state.course.title} onChange={this.handleChange} placeholder="Name of Teacher" required="required"/>
                                    {/* <input key="add-course-form_title" id="title" type="text" name="title" value={this.state.course.title} onChange={this.handleChange} placeholder={this.props.user.uid} required="required"/> */}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="platform">Course Platform</label>
                                    <span>
                                        <input key="add-course-form_platform" id="platform" list="platformlist" type="text" name="platform" value={this.state.course.platform} onChange={this.handleChange} placeholder="Name of course platform" required="required"/>
                                        <datalist id="platformlist">
                                            {
                                            this.props.currentPosts
                                                .filter((post, i) => this.props.currentPosts.map(post => post.platform.toLowerCase()).indexOf(post.platform.toLowerCase()) === i)
                                                .map(post => <option key={post.platform + "_" + post.title} value={this.capitalize(post.platform)}>{this.capitalize(post.platform)}</option>)}
                                        </datalist>
                                    </span>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="difficulty">Level of Difficulty</label>
                                    <ul id="difficulty-options" >
                                        <li>
                                            <label htmlFor="difficultylevel-easy">Easy</label>
                                            <input key="add-course-form_difficultylevel-easy"  type="radio" id="difficultylevel-easy" onChange={this.handleChange} name="difficulty" value="easy" checked={this.state.course.difficulty === "easy"} required="required"/>
                                        </li>
                                        <li>
                                            <label htmlFor="difficultylevel-medium">Medium</label>
                                            <input key="add-course-form_difficultylevel-medium"  type="radio" id="difficultylevel-medium" onChange={this.handleChange} name="difficulty" value="medium" checked={this.state.course.difficulty === "medium"} required="required"/>
                                        </li>
                                        <li>
                                            <label htmlFor="difficultylevel-hard">Hard</label>
                                            <input key="add-course-form_difficultylevel-hard"  type="radio" id="difficultylevel-hard" onChange={this.handleChange} name="difficulty" value="hard" checked={this.state.course.difficulty === "hard"} required="required"/>
                                        </li>
                                    </ul>
                                    
                                </div>
                                <div className="form-group">
                                    <label htmlFor="courselink">Course Link</label>
                                    <input key="add-course-form_url" id="courselink" type="url" name="url" value={this.state.course.url} onChange={this.handleChange} placeholder="Link to course" required="required"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="estimatedTime">Estimated courselength</label>
                                    <input key="add-course-form_courseLength" id="estimatedTime" type="number" name="courseLength" value={this.state.course.courseLength} onChange={this.handleChange} placeholder="Estimated time in minutes" required="required"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="category">Category</label>
                                    <span>
                                        <input key="add-course-form_category" id="category" list="categorylist" type="text" name="category" value={this.state.course.category} onChange={this.handleChange} placeholder="Category" required="required"/>
                                        <datalist id="categorylist">
                                            {this.props.currentPosts
                                                .filter((post, i) => this.props.currentPosts.map(post => post.category.toLowerCase()).indexOf(post.category.toLowerCase()) === i)
                                                .map(post => <option key={post.category + "_" + post.title} value={this.capitalize(post.category)}>{this.capitalize(post.category)}</option>)}
                                        </datalist>
                                    </span>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="attaboylink">Attaboy Link for sharing progress</label>
                                    <input key="add-course-form_excersize" id="attaboylink" type="url" name="excersize" value={this.state.course.excersize} onChange={this.handleChange} placeholder="Attaboy link"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="googledrive">Resource Files</label>
                                    <input key="add-course-form_resource" id="googledrive" type="url" name="resource" value={this.state.course.resource} onChange={this.handleChange} placeholder="Google Drive link for excersize-files"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <input key="add-course-form_description" id="description" type="text" name="description" value={this.state.course.description} onChange={this.handleChange} placeholder="Short description of the course" required="required"/>
                                </div>
                                <button type="submit">Submit Course</button>
                            </form>     
                        </div>
                    </li>
                </ul>
                
            </Course>
        )


    }
}
AddCourse.propTypes = {
    course: PropTypes.object,
};
AddCourse.defaultProps = {
    course: {
        title: "",
        author: "",
        category: "",
        platform: "",
        difficulty: "",
        courseLength: "",
        description: "",
        url: "",
        excersize: "",
        resource: "",
        bbUploader: {
            name: "",
            photo: "",
            email: ""
        },
    },
    };


export default AddCourse;