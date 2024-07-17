const botonLogin = document.querySelector("#botonLogin");
const submit = document.querySelector("#botonIngresar")
const inputs = document.querySelectorAll(".form-control")
const mensajeVacio = "Este campo no puede estar vacio"
const emailValido = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

let login = {
    email: false,
    password: false
}

inputs.forEach((element)=>{

    switch(element.name){
        case "email":
            element.addEventListener("input", (event)=>{
                const error = document.querySelector(`#error-${element.name}`)
                if(event.target.value == ""){
                    error.textContent = mensajeVacio
                    error.style.display = "block"
                    login.email = false
                }
                else if(!emailValido.test(event.target.value)){
                    error.textContent = "Debe ingresar un Email valido"
                    error.style.display = "block"
                    login.email = false
                }
                else{
                    login.email = true
                    error.style.display = "none"
                }
                


            })

        break
        case "password":
            element.addEventListener("input", (event)=>{
                const error = document.querySelector(`#error-${element.name}`)
                if(event.target.value == ""){
                    error.textContent = mensajeVacio
                    error.style.display = "block"
                    login.password = false
                }else{

                    login.password = true
                    error.style.display = "none"

                }


            })
        break
        default:
        break
    }
})

submit.addEventListener("click", (e)=>{
    e.preventDefault()
    if(login.email && login.password){
        alert("Inicio sesion")
    }else{
        if(!login.email){
            document.querySelector("#error-email").textContent = mensajeVacio
            document.querySelector("#error-email").style.display = "block"
        }

        if(!login.password){
            document.querySelector("#error-password").textContent = mensajeVacio
            document.querySelector("#error-password").style.display = "block"
        }
    }
})




botonLogin.addEventListener("click", () => {
    LoginBoton()
});


function LoginBoton(){


    const botonModalLogin = document.createElement("button");

    botonModalLogin.setAttribute('type', 'button');
    botonModalLogin.className = 'btn btn-primary';
    botonModalLogin.setAttribute('data-bs-toggle', 'modal');
    botonModalLogin.setAttribute('data-bs-target', '#exampleModal');
    botonModalLogin.textContent = 'Launch demo modal';
    document.body.appendChild(botonModalLogin);
    botonModalLogin.click();
    botonModalLogin.remove();



}

  