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
function send() {
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({ name: user_name, message: msg, like: 0 });
    document.getElementById("msg").value = "";

}
function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location.replace("index.html");


}
function regresar() {
    window.location.replace("kwitter_room.html");


}
function getData() {
    //linea 43 son para extraer información de la base de datos de Firebase no la programa el alumno ya vienen agregadas...
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(
            function (childSnapshot) {
                childKey = childSnapshot.key;
                childData = childSnapshot.val();
                if (childKey != "purpose") {
                    firebase_message_id = childKey; message_data = childData;
                    //Inicia código Alumno terminar la función Get Data 
                    console.log(firebase_message_id);
                    console.log(message_data);
                    //cambio name 
                    nombre = message_data['name'];
                    message = message_data['message'];
                    like = message_data['like'];
                    //ojo se programan las etiquetas html para que arroje el resultado adecuado
                    name_with_tag = "<h4> " + nombre + "<img class='user_tick' src='tick.png'>";
                    message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                    like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
                    span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";
                    // concatenación de las variables para que imprima todo lo que contengan las variables arriba asignadas
                    row = name_with_tag + message_with_tag + like_button + span_with_tag;
                    document.getElementById("output").innerHTML += row;
                    //Termina código
                }
            });
    });



}
getData();
//Agrega la funcion Update Like
function updateLike(message_id) {
    console.log("Haz clic Me gusta - " + message_id);
    button_id = message_id;
    //variable likes para aumentar el número de likes
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);
    firebase.database().ref(room_name).child(message_id).update({ like: updated_likes });
}