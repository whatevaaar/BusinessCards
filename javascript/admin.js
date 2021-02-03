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

function crearRow(childSnapshot) {
    let datos = childSnapshot.val();
    let hilera = document.createElement('tr');
    let columaNombre = document.createElement('th');
    let columaEmail = document.createElement('th');
    let columaVer = document.createElement('th');
    let columaEliminar = document.createElement('th');
    let iconoVer = document.createElement('i');
    let iconoEliminar = document.createElement('i');
    let aVer = document.createElement('a');
    let botonEliminar = document.createElement('button');
    hilera.appendChild(columaNombre);
    hilera.appendChild(columaEmail);
    hilera.appendChild(columaVer);
    hilera.appendChild(columaEliminar);
    columaVer.appendChild(aVer);
    columaEliminar.appendChild(botonEliminar);
    aVer.appendChild(iconoVer);
    botonEliminar.appendChild(iconoEliminar);
    iconoVer.classList.add('far');
    iconoVer.classList.add('fa-eye');
    iconoEliminar.classList.add('far');
    iconoEliminar.classList.add('fa-trash-alt');
    columaNombre.innerText = datos.nombre;
    columaEmail.innerText = datos.email;

    aVer.href = 'index.html?id=' + datos.uid;

    botonEliminar.addEventListener('click', function () {
        eliminarUsuario(childSnapshot.key);
    });
    divTabla.appendChild(hilera);
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



