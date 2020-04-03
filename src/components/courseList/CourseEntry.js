import React, { Component } from "react"
import styled from "styled-components";
import PropTypes from 'prop-types';
import {variables} from "../global/variables"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as starSolid } from '@fortawesome/free-solid-svg-icons'
import { faStar as starRegular } from '@fortawesome/free-regular-svg-icons'

const Course  = styled.li`
            width: 100%;
            height: auto;
            background-color: ${variables.colorLightBlue};
            font-weight: 400;
            transition: opacity 0.3s ease-in-out;
            opacity: 1;
            color: ${variables.colorBlack};
            box-shadow: inset 0 -1rem 2rem -1rem rgba(0,0,0,0.3);
            
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
                    /* border-top: 0.1rem solid ${variables.colorWhite}; */
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
                        & .btnModify {
                            color: ${variables.colorWhite};
                            background-color: ${variables.colorDarkBlue};
                        }
                    }
                    & .courseCardOwner {
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        &>*:not(:last-child) {
                            margin-right: 1rem;
                        }
                        & img {
                            width: 4rem;
                            height: 4rem;
                            object-fit: cover;
                            border-radius: 100rem;
                        }
                    }
                    & .courseCardFooterOwner{
                        margin-top: 1rem;
                        width: 100%;
                        justify-content: space-around;
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
                        & .ratings{
                            &>ul {
                                display: flex;
                                flex-direction: row;
                                justify-content: center;
                                &>li{
                                    
                                    &>*, >*>svg{
                                        position: relative;
                                        height: 3rem;
                                        width: 3rem;
                                    }
                                    &>span {
                                        margin-top: -3rem;
                                        display: block
                                    }
                                    .starFilled {
                                        top: 0;
                                    }
                                }
                            }
                        }
                        & .enrolledUsers {
                            width: 100%;
                            & .enrolledHeader {
                                cursor: pointer;
                            }
                            & .enrolledUsersOpen {
                                height: auto;
                            }
                            & .enrolledUsersClosed {
                                height: 0;
                            }
                            & .enrolledUsersChildren {
                                transition: height 0.7s cubic-bezier(0.4, 0, 0.2, 1);
                                overflow: hidden;
                            }
                            & > ul>li {
                                    /* margin-bottom: 1rem; */
                                }
                            & .enrolledUser>a{
                                border-bottom: ${variables.colorBlack} 0.01rem solid;
                                display: flex;
                                flex-direction: row;
                                justify-content: center;
                                padding-bottom: 0.5rem;
                                margin-bottom: 0.5rem;
                                & > *{
                                    margin-right: 1rem;
                                }
                                
                                & img {
                                    width: 2rem;
                                    height: 2rem;
                                    object-fit: cover;
                                    border-radius: 100rem;
                                }
                                
                            }
                        }
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
            clicked: true,
            enrolled: (this.props.course.enrolledUsers && this.props.course.enrolledUsers.indexOf(this.props.user.uid) > -1),
            enrolledListOpen: false,
            rating: 3.8,
            stars: {
                1: "0%",
                2: "0%",
                3: "0%",
                4: "0%",
                5: "0%"
            }
        }
        this.expandCard = this.expandCard.bind(this);
        this.expandEnrolledUsers = this.expandEnrolledUsers.bind(this);
        this.enroll = this.enroll.bind(this);
        this.userListLoaded = this.userListLoaded.bind(this);
        this.setstarRating = this.setstarRating.bind(this);
        
    }
    
    componentDidMount(){
        this.setstarRating();

    }
    expandCard(e){
        this.setState({clicked: !this.state.clicked});
    }
    expandEnrolledUsers(e){
        this.setState({enrolledListOpen: !this.state.enrolledListOpen});
    }
    async enroll(e){
        e.preventDefault();
        await this.props.firebase.enrollUser(this.props.course.id, this.props.user.uid, !this.state.enrolled)
        this.setState({enrolled: !this.state.enrolled});
        this.props.fetchCourse();
    }
    userListLoaded(){
        const userListExist = (Object(this.props.userList) && this.props.userList[this.props.user.uid]) ? true : false
        return userListExist
    }

    percentageNormalizer(val) {
        return Math.round((val / 5) * 100);
    }

    setstarRating() {
        const ratingPercentage = this.percentageNormalizer(this.state.rating) //Normalize the score on a percentage scale
        // console.log("RatingsPercent", ratingPercentage, "modifier", modifier, ((ratingPercentage - this.percentageNormalizer(2)) / .2))
        
        if(ratingPercentage <= 20){
            this.setState({stars: {
                1: ((ratingPercentage - this.percentageNormalizer(0)) / .2) + "%", 
                2: "0%",
                3: "0%",
                4: "0%",
                5: "0%",
            }});
        }
        else if(ratingPercentage <= 40){
            this.setState({stars: {
                1: "100%",
                2: ((ratingPercentage - this.percentageNormalizer(1)) / .2) + "%", 
                3: "0%",
                4: "0%",
                5: "0%",
            }});
        }
        else if(ratingPercentage <= 60){
            console.log(((ratingPercentage - this.percentageNormalizer(2)) / .2))
            this.setState({stars: {
                1: "100%",
                2: "100%",
                3:  ((ratingPercentage - this.percentageNormalizer(2)) / .2) + "%", 
                4: "0%",
                5: "0%",
            }});
        }
        else if(ratingPercentage <= 80){
            this.setState({stars: {
                1: "100%",
                2: "100%",
                3: "100%",
                4: ((ratingPercentage - this.percentageNormalizer(3)) / .2) + "%", 
                5: "0%",
            }});
        }
        else if(ratingPercentage <= 100){
            this.setState({stars: {
                1: "100%",
                2: "100%",
                3: "100%",
                4: "100%",
                5: ((ratingPercentage - this.percentageNormalizer(4)) / .2) + "%", 
            }});
        }
    }

    render(){
        return(
            <Course className={this.state.enrolled ? "enrolled" : ""}>
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
                                                <li className="ratings">
                                                    <ul>
                                                        <li>
                                                            <FontAwesomeIcon icon={starRegular}/>
                                                            <span style={{clipPath: `polygon(0 0, ${this.state.stars[1]} 0, ${this.state.stars[1]} 100%, 0 100%)`}}>
                                                                <FontAwesomeIcon className="starFilled" icon={starSolid} />
                                                            </span>
                                                        </li>
                                                        <li>
                                                            <FontAwesomeIcon icon={starRegular}/>
                                                            <span style={{clipPath: `polygon(0 0, ${this.state.stars[2]} 0, ${this.state.stars[2]} 100%, 0 100%)`}}>
                                                                <FontAwesomeIcon className="starFilled" icon={starSolid} />
                                                            </span>
                                                        </li>
                                                        <li>
                                                            <FontAwesomeIcon icon={starRegular}/>
                                                            <span style={{clipPath: `polygon(0 0, ${this.state.stars[3]} 0, ${this.state.stars[3]} 100%, 0 100%)`}}>
                                                                <FontAwesomeIcon className="starFilled" icon={starSolid} />
                                                            </span>
                                                        </li>
                                                        <li>
                                                            <FontAwesomeIcon icon={starRegular}/>
                                                            <span style={{clipPath: `polygon(0 0, ${this.state.stars[4]} 0, ${this.state.stars[4]} 100%, 0 100%)`}}>
                                                                <FontAwesomeIcon className="starFilled" icon={starSolid} />
                                                            </span>
                                                        </li>
                                                        <li>
                                                            <FontAwesomeIcon icon={starRegular}/>
                                                            <span style={{clipPath: `polygon(0 0, ${this.state.stars[5]} 0, ${this.state.stars[5]} 100%, 0 100%)`}}>
                                                                <FontAwesomeIcon className="starFilled" icon={starSolid} />
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </li>
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
                                                {this.userListLoaded() ? // && this.props.course.enrolledUsers.count > 0) 
                                                <li className="enrolledUsers">
                                                    <ul>
                                                        <li className="enrolledHeader" onClick={this.expandEnrolledUsers}>Users Enrolled {this.state.enrolledListOpen ? "▼" : "►"}</li>
                                                        <li className={this.state.enrolledListOpen ? "enrolledUsersOpen enrolledUsersChildren" : "enrolledUsersClosed enrolledUsersChildren"}>
                                                            <ul>
                                                                {this.props.course.enrolledUsers.map(user => {
                                                                    return(
                                                                        <li key={this.props.userList[user].id + "_name"} className="enrolledUser">
                                                                            <a href={`mailto: ${this.props.userList[user].email}?subject=I see that you're also taking "${this.props.course.title}" on ${this.props.course.platform}`}>
                                                                                <img src={this.props.userList[user].photoURL} alt={this.props.userList[user].displayName} />
                                                                                <span>{this.props.userList[user].displayName}</span>
                                                                            </a>
                                                                        </li>
                                                                    )
                                                                 })}
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </li> : ""}
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
                                            <button className="btnEnroll" style={this.state.enrolled ? {backgroundColor: variables.colorDarkBlue, color: variables.colorWhite}: {}} onClick={this.enroll}>{this.state.enrolled ? "Unroll" : "Enroll"}</button>
                                            {this.state.enrolled ? <button className="btnDelete">Course Completed</button> : ""}
                                        </li>
                                        <li className="courseCardOwner">
                                            <img src={this.userListLoaded() ? this.props.userList[this.props.course.uploader].photoURL : ""} alt={this.userListLoaded() ? this.props.userList[this.props.course.uploader].displayName : ""}/>
                                            <a href={`mailto: ${this.userListLoaded() ? this.props.userList[this.props.course.uploader].email : ""}?subject=Questions regarding "${this.props.course.title}" on ${this.props.course.platform}`}>{this.userListLoaded() ? this.props.userList[this.props.course.uploader].displayName : ""}</a>
                                        </li>
                                    </ul>
                                    {(this.props.course.uploader === this.props.user.uid) ?
                                        
                                            <ul className="courseCardFooter courseCardFooterOwner">
                                                <li className="courseCardButtons">
                                                    <button className="btnModify">Modify Course</button>
                                                    <button className="btnDelete">Delete Course</button>
                                                </li>
                                            
                                            </ul>
                                    : ""
                                    }
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
        enrolledUsers: [],
        excersize: "https://attaboy.io",
        resource: "https://drive.google.com",
        uploader: "testuser"
    },
    };


export default CourseEntry;