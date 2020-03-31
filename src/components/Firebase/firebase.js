import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: process.env.REACT_APP_FB_APIKEY,
    authDomain: process.env.REACT_APP_FB_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_FB_DATABASEURL,
    projectId: process.env.REACT_APP_FB_PROJECTID,
    storageBucket: process.env.REACT_APP_FB_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FB_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FB_APPID,
    measurementId: process.env.REACT_APP_FB_MEASUREMENTID
  };

  // Initialize Firebase

class FirebaseManager{
  constructor() {
      // super(setUser)
      // userCallback ? console.log(userCallback) : console.log("No name callback");
      // Initialize Firebase
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
      this.auth = firebase.auth()
      this.db = firebase.firestore()
      this.provider = new firebase.auth.GoogleAuthProvider();
      // super(nameCallback, this);
      // this.getUserState.bind(this)
      this.login = this.login.bind(this)
      this.logOut = this.logOut.bind(this)
      // 

      
  }

  async addUserListener(callback){
    await this.auth.onAuthStateChanged(function(user) {
          console.log(!user ? "logged out" : "Logged in as " + user.displayName)
            callback(user);
        });
  }

  async getUserState() {
    let user = this.auth.currentUser;
    if(!user) return console.warn("User not logged in")
    return user;
  }

  async submitCourse(course) {
    await this.db.collection("courses").add(course)
      .then(result => {
          console.log("Successfully posted: ", course, " as " + result.id)
      })
  }
  
  async getCourses() {
    let courseArray = [];
    await this.db.collection("courses").get().then(documentSet => {
        // Print the ID and contents of each document
        documentSet.forEach(doc => {
          let course = Object.assign({}, doc.data())
          course.id = doc.id
          courseArray.push(course)
        });
      })
      .catch(err => {
        // Error fetching documents
        console.log('Error', err);
      });
      return courseArray;
  }
  async login() {
    let loggedInUser = await this.auth.signInWithPopup(this.provider).then(function(result, thisState) {
      console.log(result.user);
      return result.user;
      // This gives you a Google Access Token. You can use it to access the Google API.
    }).catch(function(error) {
      // Handle Errors here.
      console.error(error);
    });
    await this.getUserState();
    return loggedInUser
}
  async enrollUser(courseID, userID, enrollmentState){
    await this.db.collection("courses").doc(courseID).get() ///Get the Course by ID
      .then(course => {
          if(course.exists) {return course.data()}
          else {throw("Course not found")}
      })
      .then(course => {
        let tempCourse = course;
        let tempUsers = [];
        if(enrollmentState){ //Does the user want to Enroll(true) or Unroll(False)?
          if(tempCourse.hasOwnProperty("enrolledUsers")) tempUsers = tempCourse.enrolledUsers;
          if(tempCourse.enrolledUsers && tempCourse.enrolledUsers.indexOf(userID) <= -1 || !tempCourse.enrolledUsers){ //Check if array of users exist, and if the current user isn't already in it
            tempUsers.push(userID);
            tempCourse.enrolledUsers = tempUsers;
          }
        } else {
          if(tempCourse.hasOwnProperty("enrolledUsers")){
            tempCourse.enrolledUsers = tempCourse.enrolledUsers.filter(user => {return user !== userID}) //If the user is in the list, filter the user out
          }
        }
        return tempCourse
      }).then(course => {
        this.db.collection("courses").doc(courseID).update(course);
      })
  }

  async logOut() {
    await this.auth.signOut().then(() => {
      console.log("Signed out User")
    })
    .catch(error => {
      console.error(error)
    })
  }

}

export default FirebaseManager