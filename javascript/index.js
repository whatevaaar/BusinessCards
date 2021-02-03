const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idCandidato = urlParams.get('id');
const ENLACE = 'https://whatevaaar.github.io/BusinessCards/index.html'

let usuarioUID = null;
let esPropia = false;

window.onload = cargarParametroIDSiExiste();

function cargarParametroIDSiExiste(){
    if (idCandidato) {
        usuarioUID = idCandidato;
        cargarDatosDeUsuario();
        cargarPreferenciasDeUsuario(usuarioUID);
    }
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user && !idCandidato) {
        usuarioUID = user.uid;
        cargarDatosDeUsuario();
        mostrarElementosDeEdicion();
        esPropia = true;
    }
});

const ulPerfil = document.getElementById('ul-perfil');
const redesPersonales = document.getElementById('div-redes-personales');
const redesCoorporativas = document.getElementById('div-redes-cooorporativas');
const divExperiencia = document.getElementById('div-experiencia');
const divEducacion = document.getElementById('div-educacion');
const divSkills = document.getElementById('div-skills');
const divIdiomas = document.getElementById('div-idiomas');

function conseguirQR(){
    const request = new Request('https://example.com', {method: 'POST', body: '{"foo": "bar"}'});
    const url = request.url;
    const method = request.method;
    const credentials = request.credentials;
    const bodyUsed = request.bodyUsed;

}

function mostrarElementosDeEdicion(){
    document.getElementById('a-editar').hidden = false;
    document.getElementById('a-personalizar').hidden = false;
    document.getElementById('a-agregar-skills').hidden = false;
    document.getElementById('div-agregar-educacion').hidden = false;
    document.getElementById('div-agregar-experiencia').hidden = false;
}

function crearLiCorreo(email) {
    let liClearfix = document.createElement('li');
    let spanTitle = document.createElement('span');
    let spanContent = document.createElement('span');
    let aEnlace = document.createElement('a');
    let icono = document.createElement('i');
    liClearfix.classList.add('clearfix');
    spanTitle.classList.add('title');
    icono.classList.add('far');
    icono.classList.add('fa-envelope');
    spanContent.classList.add('content');
    aEnlace.href = 'mailto:' + email;
    aEnlace.innerText = email;
    liClearfix.appendChild(spanTitle);
    spanTitle.appendChild(icono);
    liClearfix.appendChild(spanContent);
    spanContent.appendChild(aEnlace);
    ulPerfil.appendChild(liClearfix);
}

function crearLiCompartir() {
    let liClearfix = document.createElement('li');
    let spanTitle = document.createElement('span');
    let spanContent = document.createElement('span');
    let aEnlace = document.createElement('a');
    let icono = document.createElement('i');
    liClearfix.classList.add('clearfix');
    spanTitle.classList.add('title');
    icono.classList.add('fas');
    icono.classList.add('fa-share-alt');
    spanContent.classList.add('content');
    aEnlace.href = ENLACE + '?id=' + usuarioUID;
    aEnlace.innerText = 'Compartir';
    liClearfix.appendChild(spanTitle);
    spanTitle.appendChild(icono);
    liClearfix.appendChild(spanContent);
    spanContent.appendChild(aEnlace);
    ulPerfil.appendChild(liClearfix);
}

function crearBotonFacebook(facebook) {
    let enlace = document.createElement('a');
    let icono = document.createElement('i');
    enlace.href = facebook;
    enlace.classList.add('social');
    enlace.classList.add('btn-floating');
    enlace.classList.add('indigo');
    icono.classList.add('fab');
    icono.classList.add('fa-facebook-f');
    enlace.appendChild(icono);
    redesPersonales.appendChild(enlace);
}

function crearBotonFacebookCoorporativo(facebook) {
    let enlace = document.createElement('a');
    let icono = document.createElement('i');
    enlace.href = facebook;
    enlace.classList.add('social');
    enlace.classList.add('btn-floating');
    enlace.classList.add('indigo');
    icono.classList.add('fab');
    icono.classList.add('fa-facebook-f');
    enlace.appendChild(icono);
    redesCoorporativas.appendChild(enlace);
}

function crearBotonTwitter(twitter) {
    let enlace = document.createElement('a');
    let icono = document.createElement('i');
    enlace.href = twitter;
    enlace.classList.add('social');
    enlace.classList.add('btn-floating');
    enlace.classList.add('blue');
    icono.classList.add('fab');
    icono.classList.add('fa-twitter');
    enlace.appendChild(icono);
    redesPersonales.appendChild(enlace);
}

function crearBotonLinkedIn(linkedin) {
    let enlace = document.createElement('a');
    let icono = document.createElement('i');
    enlace.href = linkedin;
    enlace.classList.add('social');
    enlace.classList.add('btn-floating');
    enlace.classList.add('blue');
    enlace.classList.add('darken-3');
    icono.classList.add('fab');
    icono.classList.add('fa-linkedin-in');
    enlace.appendChild(icono);
    redesPersonales.appendChild(enlace);
}

function crearBotonLinkedInCoorporativo(linkedinCoorporativo) {
    let enlace = document.createElement('a');
    let icono = document.createElement('i');
    enlace.href = linkedinCoorporativo;
    enlace.classList.add('social');
    enlace.classList.add('btn-floating');
    enlace.classList.add('blue');
    enlace.classList.add('darken-3');
    icono.classList.add('fab');
    icono.classList.add('fa-linkedin-in');
    enlace.appendChild(icono);
    redesCoorporativas.appendChild(enlace);
}

function crearBotonWhatsappCoorporativo(whatsappCoorporativo) {
    let enlace = document.createElement('a');
    let icono = document.createElement('i');
    enlace.href = 'https://api.whatsapp.com/send?phone=' + whatsappCoorporativo
    enlace.classList.add('social');
    enlace.classList.add('btn-floating');
    enlace.classList.add('green');
    enlace.classList.add('darken-3');
    icono.classList.add('fab');
    icono.classList.add('fa-whatsapp');
    enlace.appendChild(icono);
    redesCoorporativas.appendChild(enlace);
}

function crearBotonWhatsapp(numeroTelefonico) {
    let enlace = document.createElement('a');
    let icono = document.createElement('i');
    enlace.href = 'https://api.whatsapp.com/send?phone=' + numeroTelefonico
    enlace.classList.add('social');
    enlace.classList.add('btn-floating');
    enlace.classList.add('green');
    enlace.classList.add('darken-3');
    icono.classList.add('fab');
    icono.classList.add('fa-whatsapp');
    enlace.appendChild(icono);
    redesPersonales.appendChild(enlace);
}

function escribirDatosGenerales(usuario){
    document.title = 'Business Card de ' + usuario.nombre;
    document.getElementById('h-carga-nombre').innerText = usuario.nombre;
    document.getElementById('h-carga-expertise').innerText = usuario.expertise;
    document.getElementById('h-nombre-intro').innerText = usuario.nombre;
    document.getElementById('h-expertise-intro').innerText = usuario.expertise;
    document.getElementById('img-perfil').src = usuario.imgPerfil;
    document.getElementById('a-cel').innerText = usuario.numeroTelefonico;
    document.getElementById('a-cel').href = 'tel:' + usuario.numeroTelefonico;
    document.getElementById('span-ubicacion').innerText = usuario.estado + ', ' + usuario.pais;
    crearLiCorreo(usuario.email);
    crearLiCompartir();
    crearBotonWhatsapp(usuario.numeroTelefonico);
    if (usuario.pagina !== '')
        crearLiPagina(usuario.pagina);
    if (usuario.facebook !== '')
        crearBotonFacebook(usuario.facebook);
    if (usuario.facebookCoorporativo !== '')
        crearBotonFacebookCoorporativo(usuario.facebookCoorporativo);
    if (usuario.linkedin !== '')
        crearBotonLinkedIn(usuario.linkedin);
    if (usuario.linkedinCoorporativo !== '')
        crearBotonLinkedInCoorporativo(usuario.linkedinCoorporativo);
    if (usuario.whatsappCoorporativo !== '')
        crearBotonWhatsappCoorporativo(usuario.whatsappCoorporativo);
    if (usuario.twitter !== '')
        crearBotonTwitter(usuario.twitter);
}

function crearLiPagina(enlace){
    let liClearfix = document.createElement('li');
    let spanTitle = document.createElement('span');
    let spanContent = document.createElement('span');
    let aEnlace = document.createElement('a');
    let icono = document.createElement('i');
    liClearfix.classList.add('clearfix');
    spanTitle.classList.add('title');
    icono.classList.add('fas');
    icono.classList.add('fa-globe');
    spanContent.classList.add('content');
    aEnlace.href = enlace;
    aEnlace.innerText = enlace;
    liClearfix.appendChild(spanTitle);
    spanTitle.appendChild(icono);
    liClearfix.appendChild(spanContent);
    spanContent.appendChild(aEnlace);
    ulPerfil.appendChild(liClearfix);
}

function crearApartadoEducacion(childData, key) {
    let divTimelineBlock = document.createElement('div');
    let divTimelineDot = document.createElement('div');
    let hDot = document.createElement('h6');
    let divCard= document.createElement('div');
    let divCardContent = document.createElement('div');
    let hTitle = document.createElement('h6');
    let divInfo = document.createElement('div');
    let hInstituto = document.createElement('h6');
    let hFechas = document.createElement('h6');
    let smallInstituto = document.createElement('small');
    let smallFechas = document.createElement('small');
    let iEliminar = document.createElement('i');
    let aEliminar = document.createElement('a');
    aEliminar.hidden = !esPropia;
    aEliminar.addEventListener("click", function() {
        eliminarEducacion(key);
    }, false);
    iEliminar.classList.add('fas');
    iEliminar.classList.add('fa-times');
    aEliminar.appendChild(iEliminar);
    divTimelineBlock.classList.add('timeline-block');
    divTimelineBlock.appendChild(divTimelineDot);
    divTimelineBlock.appendChild(divCard);
    divTimelineDot.classList.add('timeline-dot');
    hDot.innerText = childData.titulo.slice(0,1);
    divTimelineDot.appendChild(hDot);
    divCard.classList.add('card');
    divCard.classList.add('timeline-content');
    divCard.appendChild(divCardContent);
    divCardContent.classList.add('card-content');
    divCardContent.appendChild(hTitle);
    divCardContent.appendChild(divInfo);
    divCardContent.appendChild(aEliminar);
    hTitle.classList.add('timeline-title');
    hTitle.innerText = childData.titulo;
    divInfo.classList.add('timeline-info');
    divInfo.appendChild(hInstituto);
    divInfo.appendChild(hFechas);
    hInstituto.appendChild(smallInstituto);
    hFechas.appendChild(smallFechas);
    smallInstituto.innerText = childData.instituto;
    smallFechas.innerText = childData.fechaInicio + ' - ' + childData.fechaFin;
    divEducacion.appendChild(divTimelineBlock);
}

function eliminarExperiencia(key) {
    let refString = 'usuarios/' + usuarioUID + '/experiencia/' + key;
    firebase.database().ref(refString).remove().then(function() {
        document.location.reload()
    })
        .catch(function(error) {
            alert('Error! Intenta de nuevo', error);
        });
}

function eliminarSkill(key) {
    let refString = 'usuarios/' + usuarioUID + '/skills/' + key;
    firebase.database().ref(refString).remove().then(function() {
        document.location.reload()
    })
        .catch(function(error) {
            alert('Error! Intenta de nuevo', error);
        });
}

function eliminarIdioma(key) {
    let refString = 'usuarios/' + usuarioUID + '/idiomas/' + key;
    firebase.database().ref(refString).remove().then(function() {
        document.location.reload()
    })
        .catch(function(error) {
            alert('Error! Intenta de nuevo', error);
        });
}

function eliminarEducacion(key) {
    let refString = 'usuarios/' + usuarioUID + '/educacion/' + key;
    firebase.database().ref(refString).remove().then(function() {
        document.location.reload()
    })
        .catch(function(error) {
            alert('Error! Intenta de nuevo', error);
        });
}

function crearApartadoSkills(childData,key) {
    let divSkillbar = document.createElement('div');
    divSkillbar.classList.add('skillbar');
    divSkillbar.dataset.percent = childData.porcentaje + '%';
    let divSkillbarTitle = document.createElement('div');
    divSkillbarTitle.classList.add('skillbar-title');
    let spanSkillbarTitle = document.createElement('span');
    spanSkillbarTitle.innerText = childData.skill;
    divSkillbarTitle.appendChild(spanSkillbarTitle);
    let aIcono = document.createElement('a');
    aIcono.addEventListener("click", function() {
        eliminarSkill(key);
    }, false);
    spanSkillbarTitle.appendChild(aIcono);
    let iBasura = document.createElement('i');
    iBasura.classList.add('far');
    iBasura.classList.add('fa-trash-alt');
    iBasura.style.color = 'black';
    aIcono.appendChild(iBasura);
    let divSkillbarBar = document.createElement('div');
    divSkillbarBar.classList.add('skillbar-bar');
    divSkillbarBar.style.width = childData.porcentaje + '%';
    let divSkillbarPercent = document.createElement('div');
    divSkillbarPercent.classList.add('skill-bar-percent');
    divSkillbarPercent.innerText = childData.porcentaje + '%';
    divSkillbar.appendChild(divSkillbarTitle);
    divSkillbar.appendChild(divSkillbarBar);
    divSkillbar.appendChild(divSkillbarPercent);
    divSkills.appendChild(divSkillbar);
}

function crearApartadoIdiomas(childData, key) {
    let divSkillbar = document.createElement('div');
    divSkillbar.classList.add('skillbar');
    divSkillbar.dataset.percent = childData.porcentaje + '%';
    let divSkillbarTitle = document.createElement('div');
    divSkillbarTitle.classList.add('skillbar-title');
    let spanSkillbarTitle = document.createElement('span');
    spanSkillbarTitle.innerText = childData.idioma;
    divSkillbarTitle.appendChild(spanSkillbarTitle);
    let aIcono = document.createElement('a');
    aIcono.addEventListener("click", function() {
        eliminarIdioma(key);
    }, false);
    spanSkillbarTitle.appendChild(aIcono);
    let iBasura = document.createElement('i');
    iBasura.classList.add('far');
    iBasura.classList.add('fa-trash-alt');
    iBasura.style.color = 'black';
    aIcono.appendChild(iBasura);
    let divSkillbarBar = document.createElement('div');
    divSkillbarBar.classList.add('skillbar-bar');
    divSkillbarBar.style.width = childData.porcentaje + '%';
    let divSkillbarPercent = document.createElement('div');
    divSkillbarPercent.classList.add('skill-bar-percent');
    divSkillbarPercent.innerText = childData.porcentaje + '%';
    divSkillbar.appendChild(divSkillbarTitle);
    divSkillbar.appendChild(divSkillbarBar);
    divSkillbar.appendChild(divSkillbarPercent);
    divIdiomas.appendChild(divSkillbar);
}

function crearApartadoExperiencia(childData, key) {
    let divTimelineBlock = document.createElement('div');
    let divTimelineDot = document.createElement('div');
    let hDot = document.createElement('h6');
    let divCard= document.createElement('div');
    let divCardContent = document.createElement('div');
    let hTitle = document.createElement('h6');
    let divInfo = document.createElement('div');
    let hInstituto = document.createElement('h6');
    let hFechas = document.createElement('h6');
    let smallInstituto = document.createElement('small');
    let smallFechas = document.createElement('small');
    let iEliminar = document.createElement('i');
    let aEliminar = document.createElement('a');
    aEliminar.hidden = !esPropia;
    aEliminar.addEventListener("click", function() {
        eliminarExperiencia(key);
    }, false);
    iEliminar.classList.add('fas');
    iEliminar.classList.add('fa-times');
    aEliminar.appendChild(iEliminar);
    divTimelineBlock.classList.add('timeline-block');
    divTimelineBlock.appendChild(divTimelineDot);
    divTimelineBlock.appendChild(divCard);
    divTimelineDot.classList.add('timeline-dot');
    hDot.innerText = childData.puesto.slice(0,1);
    divTimelineDot.appendChild(hDot);
    divCard.classList.add('card');
    divCard.classList.add('timeline-content');
    divCard.appendChild(divCardContent);
    divCardContent.classList.add('card-content');
    divCardContent.appendChild(hTitle);
    divCardContent.appendChild(divInfo);
    divCardContent.appendChild(aEliminar);
    hTitle.classList.add('timeline-title');
    hTitle.innerText = childData.puesto;
    divInfo.classList.add('timeline-info');
    divInfo.appendChild(hInstituto);
    divInfo.appendChild(hFechas);
    hInstituto.appendChild(smallInstituto);
    hFechas.appendChild(smallFechas);
    smallInstituto.innerText = childData.empresa;
    smallFechas.innerText = childData.fechaInicio + ' - ' + childData.fechaFin;
    divExperiencia.appendChild(divTimelineBlock);
}

function cargarDatosExperiencia() {
    let query = firebase.database().ref("usuarios/" + usuarioUID + "/experiencia");
    query.on("value", function (snapshot) {
        if (snapshot.empty)
            return;
        divExperiencia.innerHTML = '';
        snapshot.forEach(function (childSnapshot) {
            let childData = childSnapshot.val();
            crearApartadoExperiencia(childData, childSnapshot.key);
        });
    }, function (error) {
    });
}

function cargarDatosEducacion() {
    let query = firebase.database().ref("usuarios/" + usuarioUID + "/educacion");
    query.on("value", function (snapshot) {
        if (snapshot.empty)
            return;
        divExperiencia.innerHTML = '';
        snapshot.forEach(function (childSnapshot) {
            let childData = childSnapshot.val();
            crearApartadoEducacion(childData, childSnapshot.key);
        });
    }, function (error) {
    });
}

function cargarDatosSkills() {
    let query = firebase.database().ref("usuarios/" + usuarioUID + "/skills");
    query.on("value", function (snapshot) {
        if (snapshot.empty)
            return;
        divSkills.innerHTML = '';
        snapshot.forEach(function (childSnapshot) {
            let childData = childSnapshot.val();
            crearApartadoSkills(childData, childSnapshot.key);
        });
    }, function (error) {
    });
}

function cargarDatosIdiomas() {
    let query = firebase.database().ref("usuarios/" + usuarioUID + "/idiomas");
    query.on("value", function (snapshot) {
        if (snapshot.empty)
            return;
        divIdiomas.innerHTML = '';
        snapshot.forEach(function (childSnapshot) {
            let childData = childSnapshot.val();
            crearApartadoIdiomas(childData, childSnapshot.key);
        });
    }, function (error) {
    });
    cargarPreferencias();
}

function cargarDatosGenerales() {
    let query = firebase.database().ref("usuarios/" + usuarioUID);
    query.once('value').then((snapshot) => {
        escribirDatosGenerales(snapshot.val());
    });
}

function cargarDatosDeUsuario() {
    cargarDatosGenerales();
    cargarDatosEducacion();
    cargarDatosExperiencia();
    cargarDatosSkills();
    cargarDatosIdiomas();
}

