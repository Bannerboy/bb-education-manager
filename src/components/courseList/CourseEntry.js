import React, { Component, useState } from "react"
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
            transition: opacity 0.3 ease-in-out;
            opacity: 1;
            color: ${variables.colorBlack};
            border-bottom: 0.05rem solid ${variables.colorWhite}; 
            &>ul {
                display: flex;
                flex-direction: column;
                padding: 0 2rem;
                & .card {
                    display: flex;
                }
                & .previewCard {
                    padding: 2rem 0;
                    justify-content: space-between;
                    flex-direction: row;
                }
                & .expandedCard {
                    transition: max-height 0.7s cubic-bezier(0.4, 0, 0.2, 1);
                    padding: 0 0;
                    justify-content: space-between;
                    flex-direction: row;
                    max-height: ${this.state.clicked ? "10rem" : "0rem"};
                    overflow: hidden;
                }

                & .courseTitle {
                    font-weight: 900;
                    font-size: 2rem;
                }
            }
            &:hover {

                opacity: 0.7
            } 

        `   
        return(
            <Course>
                <ul>
                    <li>
                        <ul className="previewCard card" onClick={this.expandCard}>
                            <li className="courseTitle">{this.props.course.title}</li>
                            <li>{this.props.course.platform}</li>
                        </ul>
                    </li>
                    <li>
                        <ul className="expandedCard Card">
                            <li>Hej!</li>
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
        platform: "TutorialSite"
    },
    };


export default CourseEntry;