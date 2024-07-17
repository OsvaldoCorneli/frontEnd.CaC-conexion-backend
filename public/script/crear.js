let objeto = {
    rol: "",
    name: "",
    description: "",
    wikiLink: "",
    image: ""
}
let rol;

let validacion = {
    rol: false,
    name: false,
    description: true,
    wikiLink: true,
    image: true,
}

const regexUrl = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
const wikipediaUrl = /^https?:\/\/([a-z]{2,3}\.)?wikipedia\.org\/wiki\/[^\s]*$/;

document.querySelector("#crearboton").addEventListener("click", (e) => {
    e.preventDefault();

    const inputs = document.querySelectorAll("#crear .form-control")

    inputs.forEach((element) => {

        switch (element.name) {
            case "name":
                if (element.value != "") {
                    objeto.name = element.value;
                    validacion.name = true;
                } else {
                    validacion.name = false;
                }
                break;
            case "wikiLink":
                if (wikipediaUrl.test(element.value)) {
                    objeto.wikiLink = element.value
                    validacion.wikiLink = true;
                } else if (element.value != "") {
                    objeto.wikiLink = element.value
                    validacion.wikiLink = false
                } else {
                    objeto.wikiLink = element.value
                    validacion.wikiLink = true;
                }
                break;
            case "image":
                if (regexUrl.test(element.value)) {
                    objeto.image = element.value
                    validacion.image = true;
                } else if (element.value != "") {
                    objeto.image = element.value
                    validacion.image = false
                } else {
                    objeto.image = element.value
                    validacion.image = true;
                }

                break;
            case "description":
                objeto.description = element.value
                break;
            case "rol":

                if (element.value != "") {
                    objeto.rol = element.value
                    validacion.rol = true;
                } else {
                    validacion.rol = false;
                }
                break;
            default:
                break
        }
    })

    console.log(objeto)
    console.log(validacion)

    if (cumpleValidacion()) {
        agregarErrores()
        console.log("Cumple requisitos")
        enviarDatos(objeto)
    } else {
        agregarErrores()
        console.log("NO CUMPLE")
    }

})

function cumpleValidacion() {
    let retornar = true
    for (object in validacion) {

        if (!validacion[object]) {
            retornar = false
        }
    }
    return retornar
}

function agregarErrores() {
    const inputs = document.querySelectorAll("#crear .form-control");
    
    inputs.forEach((element) => {
        const errorElement = document.querySelector(`#error-${element.name}`);
        
        switch (element.name) {
            case "name":
                if (!validacion.name) {
                    errorElement.style.display = "block";
                    errorElement.textContent = "Este campo no puede estar vacio"
                } else {
                    errorElement.style.display = "none";
                }
                break;
            case "wikiLink":
                if (!validacion.wikiLink) {
                    errorElement.style.display = "block";
                    errorElement.textContent = "Debe ingresar una URL de wikipedia o puede dejar este campo vacio"
                } else {
                    errorElement.style.display = "none";
                }
                break;
            case "image":
                if (!validacion.image) {
                    errorElement.style.display = "block";
                    errorElement.textContent = "Debe ingresar una URL valida o puede dejar este campo vacio"
                } else {
                    errorElement.style.display = "none";
                }
                break;
            case "rol":
                if (!validacion.rol) {
                    errorElement.style.display = "block";
                    errorElement.textContent = "Debe seleccion un rol"
                } else {
                    errorElement.style.display = "none";
                }
                break;
            default:
                break;
        }
    });
}

function enviarDatos(data) {
  
    fetch(`http://localhost:8080/incaa-api/${data.rol}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: data.name,
            description: data.description,
            wikiLink: data.wikiLink,
            image: data.image == "" ? "https://static.vecteezy.com/system/resources/thumbnails/000/495/460/small/22_Profile.jpg" : data.image
        })
    })
    .then(response => {
        if (!response.ok) {
            alert(response.statusText)
            throw new Error("Error en la solicitud: " + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        alert(data)
        window.location.reload()
    })
    .catch(error => {
        alert(error)
    });
}
