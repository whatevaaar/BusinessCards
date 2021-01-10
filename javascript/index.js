const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idCandidato = urlParams.get('id');
const ENLACE = 'https://whatevaaar.github.io/BusinessCards/index.html'

let usuarioUID = null;

window.onload = cargarDatosPorGet();

function cargarDatosPorGet(){
    if (idCandidato) {
        usuarioUID = idCandidato;
        cargarDatosDeUsuario();
    }
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user && !idCandidato) {
        usuarioUID = user.uid;
        cargarDatosDeUsuario();
    }
});

const ulPerfil = document.getElementById('ul-perfil');
const redesPersonales = document.getElementById('div-redes-personales');
const redesCoorporativas = document.getElementById('div-redes-cooorporativas');
const divExperiencia = document.getElementById('div-experiencia');
const divEducacion = document.getElementById('div-educacion');
const divSkills = document.getElementById('div-skills');
const divIdiomas = document.getElementById('div-idiomas');

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
    enlace.href = whatsappCoorporativo;
    enlace.classList.add('social');
    enlace.classList.add('btn-floating');
    enlace.classList.add('green');
    enlace.classList.add('darken-3');
    icono.classList.add('fab');
    icono.classList.add('fa-whatsapp');
    enlace.appendChild(icono);
    redesCoorporativas.appendChild(enlace);
}

function escribirDatosGenerales(usuario){
    document.title = 'Business Card de ' + usuario.nombre;
    document.getElementById('h-carga-nombre').innerText = usuario.nombre;
    document.getElementById('h-carga-expertise').innerText = usuario.expertise;
    document.getElementById('h-nombre-intro').innerText = usuario.nombre;
    document.getElementById('h-expertise-intro').innerText = usuario.expertise;
    document.getElementById('img-perfil').src = usuario.imgPerfil;
    document.getElementById('span-cel').innerText = usuario.numeroTelefonico;
    document.getElementById('span-cel').innerText = usuario.numeroTelefonico;
    document.getElementById('span-ubicacion').innerText = usuario.estado + ', ' + usuario.pais;
    crearLiCorreo(usuario.email);
    crearLiCompartir();
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
    let icono = document.createElement('span');
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

function cargarDatosExperiencia() {
    let query = firebase.database().ref("usuarios/" + usuarioUID + "/experiencia");
    query.on("value", function (snapshot) {
        if (snapshot.empty)
            return;
        snapshot.forEach(function (childSnapshot) {
            let childData = childSnapshot.val();
           crearApartadoExperiencia(childData);
        });
    }, function (error) {
    });
}

function crearApartadoEducacion(childData) {
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
function crearApartadoExperiencia(childData) {
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

function cargarDatosEducacion() {
    let query = firebase.database().ref("usuarios/" + usuarioUID + "/educacion");
    query.on("value", function (snapshot) {
        if (snapshot.empty)
            return;
        snapshot.forEach(function (childSnapshot) {
            let childData = childSnapshot.val();
            crearApartadoEducacion(childData);
        });
    }, function (error) {
    });
}

function crearApartadoSkills(childData) {
    let divSkillbar = document.createElement('div');
    divSkillbar.classList.add('skillbar');
    divSkillbar.dataset.percent = childData.porcentaje + '%';
    let divSkillbarTitle = document.createElement('div');
    divSkillbarTitle.classList.add('skillbar-title');
    let spanSkillbarTitle = document.createElement('span');
    spanSkillbarTitle.innerText = childData.skill;
    divSkillbarTitle.appendChild(spanSkillbarTitle);
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

function cargarDatosSkills() {
    let query = firebase.database().ref("usuarios/" + usuarioUID + "/skills");
    query.on("value", function (snapshot) {
        if (snapshot.empty)
            return;
        snapshot.forEach(function (childSnapshot) {
            let childData = childSnapshot.val();
            crearApartadoSkills(childData);
        });
    }, function (error) {
    });
}

function crearApartadoIdiomas(childData) {
    let divSkillbar = document.createElement('div');
    divSkillbar.classList.add('skillbar');
    divSkillbar.dataset.percent = childData.porcentaje + '%';
    let divSkillbarTitle = document.createElement('div');
    divSkillbarTitle.classList.add('skillbar-title');
    let spanSkillbarTitle = document.createElement('span');
    spanSkillbarTitle.innerText = childData.idioma;
    divSkillbarTitle.appendChild(spanSkillbarTitle);
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

function cargarDatosIdiomas() {
    let query = firebase.database().ref("usuarios/" + usuarioUID + "/idiomas");
    query.on("value", function (snapshot) {
        if (snapshot.empty)
            return;
        snapshot.forEach(function (childSnapshot) {
            let childData = childSnapshot.val();
            crearApartadoIdiomas(childData);
        });
    }, function (error) {
    });
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
