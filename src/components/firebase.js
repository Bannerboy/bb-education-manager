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
        // super(props)
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
        // this.login.bind(this)
        this.auth.onAuthStateChanged(function(user) {
            // console.log(!user ? "logged out" : "Logged in as " + user)
          });

        
    }
    
    async getCourses() {
      console.log(this.db)
      let courseArray = [];
      await this.db.collection("courses").get().then(documentSet => {
          // Print the ID and contents of each document
          documentSet.forEach(doc => {
            courseArray.push(doc.data())
            console.log(doc.id, ' => ', doc.data());
          });
        })
        .catch(err => {
          // Error fetching documents
          console.log('Error', err);
        });
        return courseArray;
  }

}

export default FirebaseManager