const skill = document.getElementById("input-skill");
const porcentajeSkill = document.getElementById("input-porcentaje-skill");
let idioma = getElementById("input-idioma");
let porcentajeIdioma = document.getElementById("input-porcentaje-idioma");


function agregarSkill() {
    let ref= firebase.database().ref('usuarios/' + user.uid + '/skills').push();
    ref.set({
        skill: skill.value,
        porcentaje: porcentajeSkill.value
    }, (error) => {
        if (error) {
            alert(error);
        } else {
            alert("Agregado a CV!");
        }
    });
    limpiarApartadoSkill();
}

function agregarIdioma() {
    let ref = firebase.database().ref('usuarios/' + user.uid + '/idiomas').push();
    ref.set({
        idioma: idioma.value,
        porcentaje: porcentajeIdioma.value
    }, (error) => {
        if (error) {
            alert(error);
        } else {
            alert("Agregado a CV!");
        }
    });
    limpiarApartadoIdiomas();
}

function limpiarApartadoSkill() {
    skill.value = "";
    porcentajeSkill.value = "";
}

function limpiarApartadoIdiomas() {
    idioma.value = "";
    porcentajeIdioma.value = "";
}
