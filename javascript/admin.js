const divTabla = document.getElementById('div-tabla');

window.onload = cargarDatos();

firebase.auth().onAuthStateChanged(function (userL) {
    if (userL) {
        cargarPreferencias();
        fadeoutLoader();
    }
});

function eliminarUsuario(key) {
    let refString = 'usuarios/' + key;
    firebase.database().ref(refString).remove().then(function () {
    })
        .catch(function (error) {
            alert('Error! Intenta de nuevo', error);
        });
}

function activarUsuario(key) {
    firebase.database().ref('suspendidos').remove().then(function () {
    })
        .catch(function (error) {
            alert('Error! Intenta de nuevo', error);
        });
}
function suspenderUsuario(key) {
    firebase.database().ref('suspendidos/' + key).set({
        uid: key
    });
}

function activarCorreo() {
    let email = document.getElementById('input-email-activar').value;
    firebase.database().ref('correos_para_activar/').push({
        email: email
    }, (error) => {
            if (error) {
                // The write failed...
                alert('Error! Intenta de nuevo', error);
            } else {
                // Data saved successfully!
                alert('Correo Activado');
            }
        }


    );
}
function crearRow(childSnapshot) {
    let datos = childSnapshot.val();
    let hilera = document.createElement('tr');
    hilera.appendChild(crearCeldaNombre(datos.nombre));
    hilera.appendChild(crearCeldaEmail(datos.email));
    hilera.appendChild(crearCeldaVer(datos.username));
    hilera.appendChild(crearCeldaActivar(childSnapshot.key));
    hilera.appendChild(crearCeldaSuspender(childSnapshot.key));
    hilera.appendChild(crearCeldaEliminar(childSnapshot.key));
    hilera.appendChild(crearCeldaEstado(datos.uid));
    divTabla.appendChild(hilera);
}

function crearCeldaNombre(nombre) {
    let columaNombre = document.createElement('th');
    columaNombre.innerText = nombre;
    return columaNombre;
}

function crearCeldaEmail(email) {
    let columaEmail = document.createElement('th');
    columaEmail.innerText = email;
    return columaEmail;
}

function crearCeldaVer(username) {
    let columaVer = document.createElement('th');
    let iconoVer = document.createElement('i');
    let aVer = document.createElement('a');
    columaVer.appendChild(aVer);
    aVer.appendChild(iconoVer);
    iconoVer.classList.add('far');
    iconoVer.classList.add('fa-eye');
    aVer.href = 'index.html?u=' + username;
    return columaVer;
}

function crearCeldaActivar(key) {
    let columaActivar = document.createElement('th');
    let iconoActivar = document.createElement('i');
    let botonActivar = document.createElement('a');
    columaActivar.appendChild(botonActivar);
    botonActivar.appendChild(iconoActivar);
    iconoActivar.classList.add('fas');
    iconoActivar.classList.add('fa-play');
    botonActivar.addEventListener('click', function () {
        activarUsuario(key);
    });
    return columaActivar;
}

function crearCeldaSuspender(key) {
    let columaSuspender = document.createElement('th');
    let iconoSuspender = document.createElement('i');
    let botonSuspender = document.createElement('a');
    columaSuspender.appendChild(botonSuspender);
    botonSuspender.appendChild(iconoSuspender);
    iconoSuspender.classList.add('fas');
    iconoSuspender.classList.add('fa-pause');
    botonSuspender.addEventListener('click', function () {
        suspenderUsuario(key);
    });
    return columaSuspender;
}

function crearCeldaEliminar(key) {
    let columaEliminar = document.createElement('th');
    let iconoEliminar = document.createElement('i');
    let botonEliminar = document.createElement('a');
    columaEliminar.appendChild(botonEliminar);
    botonEliminar.appendChild(iconoEliminar);
    iconoEliminar.classList.add('far');
    iconoEliminar.classList.add('fa-trash-alt');
    botonEliminar.addEventListener('click', function () {
        eliminarUsuario(key);
    });
    return columaEliminar;
}

function crearCeldaEstado(uid) {
    let columaEstado = document.createElement('th');
    firebase.database().ref("suspendidos").orderByChild("uid").equalTo(uid).on("value",snapshot => {
        if (snapshot.exists()){
            columaEstado.innerText = 'Suspendido'
        }
        else {

            columaEstado.innerText = 'Activo'
        }
        return columaEstado;
    });
    return columaEstado;
}

function cargarDatos() {
    let query = firebase.database().ref("usuarios");
    query.on("value", function (snapshot) {
        if (snapshot.empty)
            return;
        divTabla.innerHTML = '';
        snapshot.forEach(function (childSnapshot) {
            crearRow(childSnapshot);
        });
    }, function (error) {
    });
}



