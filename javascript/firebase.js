var firebaseConfig = {
    apiKey: "AIzaSyB1Fagc4adWeHdpURSz4Bho6AECpapSeAk",
    authDomain: "businesscard-39cda.firebaseapp.com",
    projectId: "businesscard-39cda",
    storageBucket: "businesscard-39cda.appspot.com",
    messagingSenderId: "767215985443",
    appId: "1:767215985443:web:a579b9e8ab773e02112296",
    measurementId: "G-KZXQMKKFTW"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

let user = null;
firebase.auth().onAuthStateChanged(function (userL) {
    if (userL) {
        user = userL;
    }
});
function reestablecerPassword(){
    let auth = firebase.auth();
    let emailAddress = document.getElementById('input-email').value;
    auth.sendPasswordResetEmail(emailAddress).then(function() {
        alert("Correo enviado con éxito");
    }).catch(function(error) {
        // An error happened.
        alert(error);
    });

}

function signOut() {
    firebase.auth().signOut().then(function () {
        window.location.href = "signup.html";
    });
}
