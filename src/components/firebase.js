import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";


console.log(process.env)
var firebaseConfig = {
    apiKey: process.env.FB_APIKEY,
    authDomain: process.env.FB_AUTHDOMAIN,
    databaseURL: process.env.FB_DATABASEURL,
    projectId: process.env.FB_PROJECTID,
    storageBucket: process.env.FB_STORAGEBUCKET,
    messagingSenderId: process.env.FB_MESSAGINGSENDERID,
    appId: process.env.FB_APPID
  };
  // Initialize Firebase

class FirebaseManager{
    constructor() {
      console.table(firebaseConfig);

        // super(props)
        // userCallback ? console.log(userCallback) : console.log("No name callback");
        // Initialize Firebase
        // if (!firebase.apps.length) {
        //   firebase.initializeApp(firebaseConfig);
        // }
        // // super(nameCallback, this);
        // this.auth = firebase.auth()
        // this.db = firebase.firestore()
        // this.provider = new firebase.auth.GoogleAuthProvider();
        // console.log(firebase);
        // console.log(this);
        // // this.getUserState.bind(this)
        // // this.login.bind(this)
        // this.auth.onAuthStateChanged(function(user) {
        //     console.log(user)
        //   });
    }


}

export default FirebaseManager