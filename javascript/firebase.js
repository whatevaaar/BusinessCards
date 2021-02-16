const COLOR_ORIGINAL = '#f6800e';
const COLOR_ORIGINAL_RGB = 'rgb(246, 128, 14)';
let colorPreferencia = COLOR_ORIGINAL;

var firebaseConfig = {
    apiKey: "AIzaSyB1Fagc4adWeHdpURSz4Bho6AECpapSeAk",
    authDomain: "businesscard-39cda.firebaseapp.com",
    projectId: "businesscard-39cda",
    storageBucket: "businesscard-39cda.appspot.com",
    messagingSenderId: "767215985443",
    appId: "1:767215985443:web:a579b9e8ab773e02112296",
    measurementId: "G-KZXQMKKFTW"
};

var CORREOS_ADMIN = ['andres@cahum.net', 'at.macias@cahum.net']

function esAdmin(correo){
    return CORREOS_ADMIN.indexOf(correo) >= 0;
}


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
    }
});

function reestablecerPassword() {
    let auth = firebase.auth();
    let emailAddress = document.getElementById('input-email').value;
    auth.sendPasswordResetEmail(emailAddress).then(function () {
        alert("Correo enviado con éxito");
    }).catch(function (error) {
        alert(error);
    });

}

function signOut() {
    firebase.auth().signOut().then(function () {
        window.location.href = "signup.html";
    });
}

function enviarCorreoDeConfirmacion(email) {
    firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
        .then(function () {
            alert('Te enviamos un correo de confirmación');
        })
        .catch(function (error) {
            alert('Error al mandar mensaje de confirmación');
        });
}

function fadeoutLoader(){
    setTimeout(function () {

        $('div#loading').fadeOut(500);
        window.sr = ScrollReveal({reset: false});
    }, 2000);
}

function cargarPreferencias() {
    let query = firebase.database().ref('preferencias/' + user.uid);
    query.once('value').then((snapshot) => {
        let preferencia = snapshot.val();
        if (preferencia) {
            document.getElementById('div-bg').src = preferencia.imgBg;
            cambiarColor(preferencia.colorPrimario);
            if (preferencia.hasOwnProperty('fuente'))
                cambiarFuente()
        }
    });
    fadeoutLoader();
}


function cargarPreferenciasDeUsuario(uid) {
    let query = firebase.database().ref('preferencias/' + uid);
    query.once('value').then((snapshot) => {
        let preferencia = snapshot.val();
        if (preferencia) {
            document.getElementById('div-bg').src = preferencia.imgBg;
            colorPreferencia = preferencia.colorPrimario;
            cambiarColor(preferencia.colorPrimario);
            if (preferencia.hasOwnProperty('fuente'))
                cambiarFuente()
        }
    });
    fadeoutLoader();
}

function cambiarColor(replaceWith) {
    $('*').each(function () {
        let color = $(this).css("color");
        let colorBG = $(this).css("background");
        let colorBGC = $(this).css("backgroundColor");
        let colorBorder = $(this).css("borderLeftColor");
        if (color === COLOR_ORIGINAL_RGB) {
            $(this).css("color", replaceWith);
        }
        if (colorBG === COLOR_ORIGINAL_RGB) {
            $(this).css("background", replaceWith);
        }
        if (colorBGC === COLOR_ORIGINAL_RGB) {
            $(this).css("backgroundColor", replaceWith);
        }
        if (colorBorder === COLOR_ORIGINAL_RGB) {
            $(this).css("borderLeftColor", replaceWith);
        }
    });
}

function cambiarFuente(fuente) {
    $('*').css("font-family", fuente);
}
