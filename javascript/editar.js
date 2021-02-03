const imgLoader = document.getElementById('img-loader');
const nombre = document.getElementById("input-nombre");
const email = document.getElementById("input-email-perfil");
const numeroTelefonico = document.getElementById("input-cel");
const facebook = document.getElementById("input-fb-personal");
const twitter = document.getElementById("input-twitter");
const linkedin = document.getElementById("input-linkedin-personal");
const linkedinCoorporativo = document.getElementById("input-linkedin-ccorporativo");
const pais = document.getElementById("input-pais");
const pagina = document.getElementById("input-pagina");
const facebookCoorporativo = document.getElementById("input-facebook-coorporativo");
const whatsappCoorporativo = document.getElementById("input-whatsapp-coorporativo");
const estado = document.getElementById("input-estado");
const expertise = document.getElementById("input-expertise");


firebase.auth().onAuthStateChanged(function (user) {
    if (user){
        usuarioUID = user.uid;
        cargarPreferencias();
        cargarDatosGenerales();
        fadeoutLoader();
    }
    else{
        window.location.href = 'registrar.html'
    }
});

function cargarDatosGenerales() {
    let query = firebase.database().ref("usuarios/" + usuarioUID);
    query.once('value').then((snapshot) => {
        cargarDatosDeUsuario(snapshot.val());
    });
}

function cargarDatosDeUsuario(user) {
    nombre.value = user.nombre;
    email.value = user.email;
    whatsappCoorporativo.value = user.whatsappCoorporativo;
    pais.value = user.pais;
    numeroTelefonico.value = user.numeroTelefonico;
    twitter.value = user.twitter;
    linkedin.value = user.linkedin;
    linkedinCoorporativo.value = user.linkedinCoorporativo;
    facebookCoorporativo.value = user.facebookCoorporativo;
    facebook.value = user.facebook;
    estado.value = user.estado;
    pagina.value = user.pagina;
    expertise.value = user.expertise;
}


function guardarPerfil(urlImgPerfil) {
    let user = firebase.auth().currentUser;
    firebase.database().ref('usuarios/' + usuarioUID).update({
        nombre: nombre.value,
        email: email.value,
        uid: usuarioUID,
        whatsappCoorporativo: whatsappCoorporativo.value,
        pais: pais.value,
        numeroTelefonico: numeroTelefonico.value,
        twitter: twitter.value,
        linkedin: linkedin.value,
        linkedinCoorporativo: linkedinCoorporativo.value,
        facebookCoorporativo: facebookCoorporativo.value,
        facebook: facebook.value,
        estado: estado.value,
        pagina: pagina.value,
        expertise: expertise.value,
        imgPerfil: urlImgPerfil
    }, (error) => {
        if (error) {
            alert(error);
        } else {
            firebase.auth().currentUser.updateProfile({
                displayName: nombre.value,
                photoURL: urlImgPerfil
            }).then(function () {
                window.location.href='index.html';
            }).catch(function (error) {
                alert(error);
            });
        }
    });
}

function guardarImgDePerfil() {
    let storageRef = firebase.storage().ref('imagenes_de_perfil/' + usuarioUID);
    let uploadTask = storageRef.put($('#input-img').prop('files')[0]);
    imgLoader.hidden = false;
    uploadTask.on('state_changed', function (snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
        }
    }, function (error) {
        // Handle unsuccessful uploads
        alert("Error, intenta de nuevo");
        imgLoader.hidden = true;
    }, function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            guardarPerfil(downloadURL)
            imgLoader.hidden = true;
        });
    });

}
