function mostrarMensaje(tipo, mensaje) {
    const div = document.getElementById("mensajes");
    if( tipo == 'error') {
        div.className = "error"
    } else {
        div.className = "ok"
    }
    div.innerHTML = mensaje
}

function registrarAlumno(event){    
    // evito que el formulario haga un submit normal
    // para manejarlo dentro de la función
    event.preventDefault(); 

    const boton = document.getElementById("boton").disabled = true;

    // recupero los valores ingresador x el usuario
    const form      = event.currentTarget;
    const rut       = form[0].value 
    const dv        = form[1].value 
    const nombre    = form[2].value 
    const github    = form[3].value 
    
    // envío los datos vía API REST
    const baseURL   = "https://atkltguookjwtbtvavdu.supabase.co";
    const apiCall   = '/rest/v1/alumnos'
    const apiKey    = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzU5MDgwOSwiZXhwIjoxOTU5MTY2ODA5fQ.Cp0etHVDvjVFLPl2RWteZt0j-Mynpm52S6iryYTpbPI"
    const url       = baseURL + apiCall
    const alumno    = {
        rut,
        dv,
        nombre,
        github
    } 

    fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "apikey": apiKey,
            "authorization": "Bearer "+apiKey
        },
        body: JSON.stringify(alumno)
    })
        .then( response => {
            if( response.ok ) {
                mostrarMensaje("ok", "Se han guardado correctamente sus datos.");
                return response.json();
            } else {
                mostrarMensaje("error", "Hubo un error al guardar el registro.");
            }
        })
        .then( data     => console.log(data) ) 
        .catch( err     => mostrarMensaje("error", "Se generó una excepción al ejecutar, contacte al administrador si el problema persiste.") )
    ;

    return false;
}

document.getElementById("form-registro")
    .addEventListener("submit", registrarAlumno);
