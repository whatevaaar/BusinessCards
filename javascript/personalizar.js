const imgLoader = document.getElementById('img-loader');
const colorPrimario = document.getElementById('input-color')
const fuente = document.getElementById('input-fuente')

let usuarioUID;

firebase.auth().onAuthStateChanged(function (user) {
    if (user){
        usuarioUID = user.uid;
        cargarPreferencias();
        cargarDatosPreferencias();
    }
});

function iniciarJsColor(colorPrimario) {
    jscolor.presets.default = {
        value: colorPrimario,
        position: 'right',
        backgroundColor: colorPrimario,
        palette: '#fff #000 #808080 #996e36 #f55525 #ffe438 #88dd20 #22e0cd #269aff #bb1cd4',
    };
}

function cargarDatosPreferencias() {
    let query = firebase.database().ref("preferiencias/" + usuarioUID);
    query.on("value", function (snapshot) {
        if (snapshot.empty || !snapshot.val())
            return;
        let preferencia = snapshot.val();
        iniciarJsColor(preferencia.colorPrimario);
    }, function (error) {
    });
}

function guardarPreferencias(urlImgBg) {
    if (urlImgBg)
        updates = {
            imgBg: urlImgBg,
            colorPrimario: colorPrimario.value,
            fuente: fuente.value
        }
    else
        updates = {
            colorPrimario: colorPrimario.value,
        }
    firebase.database().ref('preferencias/' + usuarioUID).update(updates, (error) => {
        if (error)
            alert(error);
        else window.location.href='index.html';
    });
}

function guardarBG() {
    if (!$('#input-img').prop('files')[0]){
        guardarPreferencias();
        imgLoader.hidden = true;
        return;
    }
    let storageRef = firebase.storage().ref('imagenes_bg/' + usuarioUID);
    let uploadTask = storageRef.put($('#input-img').prop('files')[0]);
    if (!uploadTask){
        guardarPreferencias('');
    }
    imgLoader.hidden = false;
    uploadTask.on('state_changed', function (snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                break;
        }
    }, function (error) {
        alert("Error, intenta de nuevo", error);
        imgLoader.hidden = true;
    }, function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            guardarPreferencias(downloadURL);
            imgLoader.hidden = true;
        });
    });

}


