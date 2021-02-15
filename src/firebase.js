import firebase from "firebase/app";
import "firebase/database";

let config = {
    apiKey: "AIzaSyCe2vWQ95h1uVcPthV6w0434SK56Kp6Ujs",
    authDomain: "idadilham-firebase.firebaseapp.com",
    projectId: "idadilham-firebase",
    storageBucket: "idadilham-firebase.appspot.com",
    messagingSenderId: "687815690141",
    appId: "1:687815690141:web:e4e390ffcc367b5ccb1174"
};

firebase.initializeApp(config);

export default firebase.database();