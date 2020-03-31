import React, { Component } from "react"
import styled from "styled-components";
import PropTypes from 'prop-types';
import {variables} from "../global/variables"

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
                   
                    & .tags {
                        display: flex;
                        align-items: flex-end;
                        flex-direction: column;
                        @media (orientation: landscape) {
                                flex-direction: row;
                                align-items: center;
                                justify-content: flex-end;
                                & > * {
                                    margin-left: 1rem;
                                }
                        }
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
                    > * {
                        margin-bottom: 2rem;
                    }
                    & .courseCardFooter {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                    }
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
                    & .courseCardOwner {
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        &>* {
                            margin-right: 1rem;
                        }
                        & img {
                            width: 4rem;
                            height: 4rem;
                            object-fit: cover;
                            border-radius: 100rem;
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
            

        `   

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
                                    <li className="tag category">{this.props.course.category.toString().toUpperCase()}</li>
                                    <li className="tag difficulty">{this.props.course.difficulty.toString().toUpperCase()}</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <ul className={!this.state.clicked ? "expandedCard card unclicked": "clicked expandedCard card" }>
                                <li>
                                    <ul className="courseInfo">
                                        <li>
                                            <ul className="courseDetailParent">
                                                <li>
                                                    <ul className="courseDetails">
                                                        <li>Link:</li>
                                                        <li><a href={this.props.course.url}  target="_blank" rel="noopener noreferrer">{this.props.course.platform}</a></li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <ul className="courseDetails">
                                                        <li>Teacher:</li>
                                                        <li>{this.props.course.author}</li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <ul className="courseDetails">
                                                        <li>Length:</li>
                                                        <li>{(Math.round(parseFloat(this.props.course.courseLength) * 10) / 600).toFixed(2).toString() + " Hours." }</li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <ul className="courseDetails">
                                                        <li>Upload Excersize here:</li>
                                                        <li><a href={this.props.course.excersize} target="_blank" rel="noopener noreferrer">Attaboy</a></li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <ul className="courseDetails">
                                                        <li>Resource Files:</li>
                                                        <li><a href={this.props.course.resource} target="_blank" rel="noopener noreferrer">Link to Resource Files</a></li>
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
                                <li>
                                    <ul className="courseCardFooter">
                                        <li className="courseCardButtons">
                                            <button className="btnEnroll">Enroll</button>
                                            <button className="btnDelete">Delete Course</button>
                                        </li>
                                        <li className="courseCardOwner">
                                            <img src={this.props.course.bbUploader.photo} alt={this.props.course.bbUploader.name}/>
                                            <figcaption><a href={"mailto:" + this.props.course.bbUploader.email.toString()}>{this.props.course.bbUploader.name}</a></figcaption>
                                        </li>
                                    </ul>
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
        category: "Motion Design",
        platform: "Tutorial Site",
        difficulty: "Easy",
        courseLength: "5 Hours",
        description: "Minim id sint sit dolore consectetur labore laboris do aliqua ut eu proident est. Elit mollit pariatur deserunt deserunt laborum amet tempor anim in qui ullamco. Minim nulla Lorem qui non labore tempor. Sit ea dolore ullamco enim dolore irure eu. Exercitation ipsum magna commodo adipisicing elit laboris esse proident labore culpa. Proident nostrud Lorem voluptate est ut.",
        url: "https://example.com",
        excersize: "https://attaboy.io",
        resource: "https://drive.google.com",
        bbUploader: {
            name: "Elliot Sverin",
            photo: "https://i.pravatar.cc/300",
            email: "elliot.sverin@bannerboy.com"
        },
    },
    };


export default CourseEntry;