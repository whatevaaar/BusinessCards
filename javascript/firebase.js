const COLOR_ORIGINAL = '#F6800E';

var firebaseConfig = {
    apiKey: "AIzaSyB1Fagc4adWeHdpURSz4Bho6AECpapSeAk",
    authDomain: "businesscard-39cda.firebaseapp.com",
    projectId: "businesscard-39cda",
    storageBucket: "businesscard-39cda.appspot.com",
    messagingSenderId: "767215985443",
    appId: "1:767215985443:web:a579b9e8ab773e02112296",
    measurementId: "G-KZXQMKKFTW"
};

var actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'https://whatevaaar.github.io/BusinessCards/',
    // This must be true.
    handleCodeInApp: true,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

let user = null;
firebase.auth().onAuthStateChanged(function (userL) {
    if (userL) {
        user = userL;
        cargarPreferencias();
    }
});
function reestablecerPassword(){
    let auth = firebase.auth();
    let emailAddress = document.getElementById('input-email').value;
    auth.sendPasswordResetEmail(emailAddress).then(function() {
        alert("Correo enviado con éxito");
    }).catch(function(error) {
        alert(error);
    });

}

function signOut() {
    firebase.auth().signOut().then(function () {
        window.location.href = "signup.html";
    });
}

function enviarCorreoDeConfirmacion(email){
    firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
        .then(function() {
            alert('Te enviamos un correo de confirmación');
        })
        .catch(function(error) {
            alert('Error al mandar mensaje de confirmación');
        });
}

function cambiarColor(colorPrimario) {
    if(!colorPrimario || colorPrimario === COLOR_ORIGINAL)
        return;
    $(document).ready(function() {
        $("#changeColor").on("click", function() {
            $("*").css("color", function(i, val) {
                val = val.replace(/\s/g, "");
                if (rgbToHex(al) == COLOR_ORIGINAL || val == hexToRgb(COLOR_ORIGINAL)) {
                    return colorPrimario;
                }
                else {
                    return val;
                }
            });
        });
    });
}

function cargarPreferencias(){
    let query = firebase.database().ref('preferencias/' + user.uid);
    query.once('value').then((snapshot) => {
        let preferencia = snapshot.val();
        if(preferencia){
            document.getElementById('div-bg').src = preferencia.imgBg;
            cambiarColor(preferencia.colorPrimario);
            }
    });
}

function hexToRgb(hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? "rgb(" + parseInt(result[1], 16) + "," + parseInt(result[2], 16) + "," + parseInt(result[3], 16) + ")" : null;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

