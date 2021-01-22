const imgLoader = document.getElementById('img-loader');

function crearCuentaConCorreo() {
    let email = document.getElementById("input-email").value;
    let password = document.getElementById("input-password").value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            mostrarFormularioPerfil();
            enviarCorreoDeConfirmacion(email);
        })
        .catch((error) => {
            alert(error);
        });
}

function mostrarFormularioPerfil(){
    document.getElementById('v-card').hidden = true;
    document.getElementById('formulario-perfil').hidden = false;
}

function mostrarFormularioExperiencia(){
    document.getElementById('formulario-perfil').hidden = true;
    document.getElementById('formulario-experiencia').hidden = false;
}

function mostrarFormularioEducacion(){
    document.getElementById('formulario-experiencia').hidden = true;
    document.getElementById('formulario-educacion').hidden = false;
}

function mostrarFormularioIdiomas(){
    document.getElementById('formulario-educacion').hidden = true;
    document.getElementById('formulario-idioma').hidden = false;
}

function mostrarFormularioSkills(){
    document.getElementById('formulario-idioma').hidden = true;
    document.getElementById('formulario-skills').hidden = false;
}

function guardarPerfil(urlImgPerfil){
    let user = firebase.auth().currentUser;
    let nombre = document.getElementById("input-nombre").value;
    let email = document.getElementById("input-email-perfil").value;
    let numeroTelefonico = document.getElementById("input-cel").value;
    let facebook = document.getElementById("input-fb-personal").value;
    let twitter = document.getElementById("input-twitter").value;
    let linkedin = document.getElementById("input-linkedin-personal").value;
    let linkedinCoorporativo = document.getElementById("input-linkedin-ccorporativo").value;
    let pais = document.getElementById("input-pais").value;
    let pagina = document.getElementById("input-pagina").value;
    let facebookCoorporativo = document.getElementById("input-facebook-coorporativo").value;
    let whatsappCoorporativo = document.getElementById("input-whatsapp-coorporativo").value;
    let estado = document.getElementById("input-estado").value;
    let expertise = document.getElementById("input-expertise").value;
    firebase.database().ref('usuarios/' + user.uid).set({
        nombre: nombre,
        email: email,
        uid: user.uid,
        whatsappCoorporativo: whatsappCoorporativo,
        pais: pais,
        numeroTelefonico: numeroTelefonico,
        twitter: twitter,
        linkedin: linkedin,
        linkedinCoorporativo: linkedinCoorporativo,
        facebookCoorporativo: facebookCoorporativo,
        facebook: facebook,
        estado: estado,
        pagina: pagina,
        expertise: expertise,
        imgPerfil: urlImgPerfil
    }, (error) => {
        if (error) {
            alert(error);
        } else {
            firebase.auth().currentUser.updateProfile({
                displayName: nombre,
                photoURL: urlImgPerfil
            }).then(function () {
                mostrarFormularioExperiencia();
                // Update successful.
            }).catch(function (error) {
                alert(error);
                // An error happened.
            });
        }
    });
}

function guardarImgDePerfil() {
    let storageRef = firebase.storage().ref('imagenes_de_perfil/' + user.uid);
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
function agregarExperiencia() {
    let puesto = document.getElementById("input-puesto").value;
    let fechaInicio = document.getElementById("input-fecha-inicio-puesto").value;
    let fechaFin = document.getElementById("input-fecha-fin-puesto").value;
    let empresa = document.getElementById("input-empresa").value;
    let ref= firebase.database().ref('usuarios/' + user.uid + '/experiencia').push()
    ref.set({
        puesto: puesto,
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        empresa: empresa,
    }, (error) => {
        if (error) {
            alert(error);
        } else {
            alert("Agregado! Utiliza este mismo apartado para agregar más datos de tu experiencia");
        }
    });
    limpiarApartadoExperiencia();
}
function agregarEducacion() {
    let titulo = document.getElementById("input-titulo").value;
    let fechaInicio = document.getElementById("input-fecha-inicio-educacion").value;
    let fechaFin = document.getElementById("input-fecha-fin-educacion").value;
    let instituto = document.getElementById("input-instituto").value;
    let ref= firebase.database().ref('usuarios/' + user.uid + '/educacion').push()
    ref.set({
        titulo: titulo,
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        instituto: instituto,
    }, (error) => {
        if (error) {
            alert(error);
        } else {
            alert("Agregado a CV! Utiliza este mismo apartado para agregar más datos de tu educación");
        }
    });
    limpiarApartadoEducacion();
}
function agregarSkill() {
    let skill = document.getElementById("input-skill").value;
    let porcentaje = document.getElementById("input-porcentaje-skill").value;
    let ref= firebase.database().ref('usuarios/' + user.uid + '/skills').push();
    ref.set({
        skill: skill,
        porcentaje: porcentaje
    }, (error) => {
        if (error) {
            alert(error);
        } else {
            alert("Agregado a CV! Utiliza este mismo apartado para agregar más skills");
        }
    });
    limpiarApartadoSkill();
}
function agregarIdioma() {
    let idioma = document.getElementById("input-idioma").value;
    let porcentaje = document.getElementById("input-porcentaje-idioma").value;
    let ref = firebase.database().ref('usuarios/' + user.uid + '/idiomas').push();
    ref.set({
        idioma: idioma,
        porcentaje: porcentaje
    }, (error) => {
        if (error) {
            alert(error);
        } else {
            alert("Agregado a CV! Utiliza este mismo apartado para agregar más idiomas");
        }
    });
    limpiarApartadoIdiomas();
}
function limpiarApartadoExperiencia() {
    document.getElementById("input-puesto").value = "";
    document.getElementById("input-fecha-fin-puesto").value = "";
    document.getElementById("input-fecha-inicio-puesto").value = "";
    document.getElementById("input-empresa").value = "";
}
function limpiarApartadoEducacion() {
    document.getElementById("input-titulo").value = "";
    document.getElementById("input-fecha-fin-educacion").value = "";
    document.getElementById("input-fecha-inicio-educacion").value = "";
    document.getElementById("input-instituto").value = "";
}
function limpiarApartadoSkill() {
    document.getElementById("input-porcentaje-skill").value = "";
    document.getElementById("input-skill").value = "";
}
function limpiarApartadoIdiomas() {
    document.getElementById("input-porcentaje-idioma").value = "";
    document.getElementById("input-idioma").value = "";
}
