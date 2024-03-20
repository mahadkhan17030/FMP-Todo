// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getDatabase,ref,set,push,onValue,onChildAdded,remove } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
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





var userKey = JSON.parse(localStorage.getItem('key'));
var todoItem = document.getElementById("todoItem");
var list = document.getElementById("list");

var reference = ref(db,`Todos/${userKey}/`)
onChildAdded(reference,function(data){
    // console.log(data.val())
    var li = document.createElement('li')
var liText = document.createTextNode(data.val().value)
li.appendChild(liText)


var delBtn = document.createElement('button')
var detText = document.createTextNode('Delete')
delBtn.setAttribute('class','btn')
delBtn.setAttribute('id',data.val().id)
delBtn.setAttribute('class','delbtn')
delBtn.setAttribute('onclick','delTask(this)')
delBtn.appendChild(detText)
var editBtn =document.createElement('button')
var editText = document.createTextNode('Edit')
editBtn.appendChild(editText)
editBtn.setAttribute('onclick','editTask(this)')
editBtn.setAttribute('class','editbtn')
editBtn.setAttribute('class','btn')
editBtn.setAttribute('id',data.val().id)
li.appendChild(editBtn)
li.appendChild(delBtn) 

list.appendChild(li)



})




window.addTask=function (){

var obj = {
    value: todoItem.value,
}
 obj.id =   obj.id = push(ref(db, `Todos/${userKey}/`)).key;
var reference = ref(db, `Todos/${userKey}/${obj.id}`)
set(reference, obj)
console.log(obj)

todoItem.value = ""
}
window.delTask= function (e){
    var reference = ref(db, `Todos/${userKey}/${e.id}`);
    remove(reference)
    e.parentNode.remove()
}   
window.editTask=function (e){
    var editVal = prompt('Enter edit value',e.parentNode.firstChild.nodeValue )
    var editTodo = {
        value: editVal,
        id: e.id
    }
    var reference = ref(db, `Todos/${userKey}/${e.id}`)
    set(reference, editTodo)      
    e.parentNode.firstChild.nodeValue = editVal
}
window.delAllTasks=function (){
    var reference = ref(db, `Todos/${userKey}/`);
    remove(reference)   
    list.innerHTML = ""
}