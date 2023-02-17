
//AÑADE TUS ENLACES DE FIREBASE
// Your web app's Firebase configuration
//cambia const por var
// Your web app's Firebase configuration
var firebaseConfig = {
      apiKey: "AIzaSyCjocMcL2iOLravFp5bbo8EQDWBxbbdRv8",
      authDomain: "salasdeinternet-9212e.firebaseapp.com",
      databaseURL: "https://salasdeinternet-9212e-default-rtdb.firebaseio.com",
      projectId: "salasdeinternet-9212e",
      storageBucket: "salasdeinternet-9212e.appspot.com",
      messagingSenderId: "875838445751",
      appId: "1:875838445751:web:b262f00e6482d49e975532"
    };



// Initialize Firebase
// cambia "const app" por "firebase."
firebase.initializeApp(firebaseConfig);



user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");
document.getElementById("user_name").innerHTML = "¡Hola " + user_name + "!";
function addRoom() {
      room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({ purpose: "agregar nombre de sala" });
      localStorage.setItem("room_name", room_name);
      window.location.replace("kwitter_page.html");
}


function getRoom() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Inicio del código
                  console.log("Room Name - " + Room_names);
                  row = "<div class= 'room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
                  document.getElementById("output").innerHTML += row;
                  //Final del código
            });
      });
}
getRoom();
function redirectToRoomName(Room_names) {
      console.log(Room_names);
      localStorage.setItem("room_name", Room_names);
      window.location = "kwitter_page.html";
}
//agregar funcion Logout 
function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location.replace("index.html");
}   
