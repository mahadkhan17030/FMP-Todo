  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
  import { getDatabase,ref,set,push,onValue,onChildAdded,remove } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
  import { getAuth,createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
//   import { getStorage,ref as strRef,uploadBytesResumable,getDownloadURL } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDzCjbDCmx1FwBzNOwhuFeVkn3kMfZrDXQ",
    authDomain: "todo-with-database-and-a-a63b2.firebaseapp.com",
    databaseURL: "https://todo-with-database-and-a-a63b2-default-rtdb.firebaseio.com",
    projectId: "todo-with-database-and-a-a63b2",
    storageBucket: "todo-with-database-and-a-a63b2.appspot.com",
    messagingSenderId: "528092702059",
    appId: "1:528092702059:web:f4cec78ae15cb29601182e",
    measurementId: "G-WEKVHXDZ4V"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
 const db = getDatabase();
  const auth = getAuth();
//  const storage = getStorage();



var userName = document.getElementById('userName')
var email = document.getElementById('email')
var password = document.getElementById('password')

window.signupUser = function (e) {
    e.preventDefault();
    var obj = {
        userName: userName.value,
        email: email.value,
        password: password.value
    }
    console.log(obj)
    createUserWithEmailAndPassword(auth, obj.email, obj.password)
        .then(function (res) {
            console.log("User Created Successfully",res)

            obj.id = res.user.uid

            var reference = ref(db,`Alluser/${obj.id}`)
            set(reference,obj).then(function(){
                console.log("User Added in Database")
                localStorage.setItem('key',JSON.stringify(obj.id))
                window.location.href='todoFiles/index.html'
            }).catch(function(dbError){
                console.log("Database Error",dbError)
            })

            userName = ""
            email = ""
            password = ""           
        }).catch(function(err){
            console.log(err)
        })
}
