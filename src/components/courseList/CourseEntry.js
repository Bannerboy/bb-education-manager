import React, { Component } from "react"
import styled from "styled-components";
import PropTypes from 'prop-types';
import {variables} from "../global/variables"

class CourseEntry extends Component{
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
        }
        this.expandCard = this.expandCard.bind(this);
    }
    expandCard(e){
        this.setState({clicked: !this.state.clicked});
    }

    render(){
        const Course  = styled.li`
            width: 100%;
            height: auto;
            background-color: ${variables.colorLightBlue};
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
                    > * {
                        margin-bottom: 2rem;
                    }
                    & .tags {
                        display: flex;
                        align-items: flex-end;
                        flex-direction: column;
                    }
                    & .tag {
                        /* width: inherit; */
                        text-align: center;
                        border-radius: 1rem;
                        padding: 0.1rem .5rem;
                        color: ${variables.colorWhite}
                    }
                    & .category {
                        background-color: ${variables.colorRed};
                    }
                    & .difficulty {
                        background-color: ${variables.colorDarkBlue}
                    }
                }
                & .previewCard {
                    padding: 2rem 0;
                    justify-content: space-between;
                    flex-direction: row;
                }
                & .expandedCard {
                    border-top: 0.1rem solid ${variables.colorWhite};
                    transition: max-height 0.7s cubic-bezier(0.4, 0, 0.2, 1);
                    padding: ${this.state.clicked ? "2rem 0rem" : "0 0"};
                    justify-content: space-between;
                    flex-direction: column;
                    max-height: ${this.state.clicked ? "100rem" : "0rem"};
                    overflow: hidden;
                    & .courseCardButtons {
                        display: flex; 
                        flex-direction: row;
                        justify-content: flex-start;
                        & button {
                            padding: 1rem;
                            margin-right: 1rem;
                            font-weight: 900;
                        }
                        & .btnEnroll {
                            color: ${variables.colorBlack};
                            background-color: ${variables.colorGreen};
                        }
                        & .btnDelete {
                            color: ${variables.colorWhite};
                            background-color: ${variables.colorRed};
                        }
                    }
                    & .courseInfo {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        & > li:first-child {
                            @media (orientation: landscape) {
                                width: 50%;
                            }
                            width: 100%;
                        }
                        
                        & > *:not(:last-child) {
                            margin-bottom: 2rem;
                        }
                    }
                    & .courseDetailParent {
                        display: flex;
                        justify-content: center;
                        
                        flex-direction: column;
                    }
                    & .courseDetails {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        border-bottom: ${variables.colorBlack} 0.01rem solid;
                    }
                    & a {
                        font-weight: 900;
                    }
                }

                & .courseTitle {
                    font-weight: 900;
                    font-size: 2rem;
                }
            }
            &:hover {

                opacity: 0.7;
            } 

        `   
        return(
            <Course>
                <ul>
                    <li>
                        <ul className="previewCard card" onClick={this.expandCard}>
                            <li>
                                <ul>
                                    <li className="courseTitle">{this.props.course.title}</li>
                                    <li>{this.props.course.platform}</li>
                                </ul>
                            </li>
                            <li>
                                <ul className="tags">
                                    <li className="tag category">{this.props.course.tag}</li>
                                    <li className="tag difficulty">{this.props.course.difficulty}</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <ul className="expandedCard card">
                                <li>
                                    <ul className="courseInfo">
                                        <li>
                                            <ul className="courseDetailParent">
                                                <li>
                                                    <ul className="courseDetails">
                                                        <li>Teacher:</li>
                                                        <li>{this.props.course.author}</li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <ul className="courseDetails">
                                                        <li>Length:</li>
                                                        <li>{this.props.course.courseLength}</li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <ul className="courseDetails">
                                                        <li>Link:</li>
                                                        <li><a href={this.props.course.url}>{this.props.course.platform}</a></li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <ul className="courseDetails">
                                                        <li>Upload Excersize here:</li>
                                                        <li><a href={this.props.course.excersize}>Attaboy</a></li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <ul className="courseDetails">
                                                        <li>Resource Files:</li>
                                                        <li><a href={this.props.course.resource}>Link to Resource Files</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul>
                                                <li>{this.props.course.description}</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li className="courseCardButtons">
                                    <button className="btnEnroll">Enroll</button>
                                    <button className="btnDelete">Delete Course</button>
                                </li>
                                <li className="courseCardButtons">
                                    {/* <img src={this.props.course.bbUploader.photo} /> */}
                                    
                                </li>
                            
                        </ul>
                    </li>
                </ul>
                
            </Course>
        )


    }
}
CourseEntry.propTypes = {
    course: PropTypes.object,
};
CourseEntry.defaultProps = {
    course: {
        title: "Course Title",
        author: "Author Name",
        tag: "Motion Design",
        platform: "Tutorial Site",
        difficulty: "Easy",
        courseLength: "5 Hours",
        description: "Minim id sint sit dolore consectetur labore laboris do aliqua ut eu proident est. Elit mollit pariatur deserunt deserunt laborum amet tempor anim in qui ullamco. Minim nulla Lorem qui non labore tempor. Sit ea dolore ullamco enim dolore irure eu. Exercitation ipsum magna commodo adipisicing elit laboris esse proident labore culpa. Proident nostrud Lorem voluptate est ut.",
        url: "https://example.com",
        excersize: "https://attaboy.io",
        resource: "https://drive.google.com",
        bbUploader: {
            name: "Elliot Sverin",
            photo: "http://bannerboy.com/img/team/sto/2x/elliot-sverin-2x.webp",
            email: "elliot.sverin@bannerboy.com"
        },
    },
    };


export default CourseEntry;