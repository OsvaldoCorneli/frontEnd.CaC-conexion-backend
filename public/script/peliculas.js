const url_peliculas = "http://localhost:8080/incaa-api/peliculas"
let estrenos = []
let peliculas; 
const getPeliculas =  async ()=>{

    const response = await fetch(url_peliculas)
    const data = await response.json()

    return data

}

async function htmlArmado(){ 
    
    peliculas = await getPeliculas()

    const row = document.querySelector(".row")

    peliculas.forEach((pelicula)=>{
    
        if(pelicula.estreno.split("-")[0] != "2024" && pelicula.estreno.split("-")[0] != "2023"){ 
        const divs = document.createElement("div")
        divs.classList.add("col-sm-12", "col-md-6", "col-lg-4", "col-xxl-3", "text-center")
        
        divs.innerHTML = `
        <a onclick='popUpPelicula(${pelicula.idPelicula})' style="cursor: pointer"><img src="${pelicula.image}"  alt="${pelicula.tittle}" ></a>
        `
    
        row.appendChild(divs)
    }
    else{
        estrenos.push(pelicula)
    }

    })

    if(estrenos.length > 0){

            const wraper = document.querySelector(".wrapper")
        
            estrenos.forEach((pelicula)=>{
                const divs = document.createElement("div")
                divs.classList.add("item-image")
                
                divs.innerHTML = `
                <a onclick='popUpPelicula(${pelicula.idPelicula})'><img src=${pelicula.image} alt="${pelicula.title}"></a><h6 class="text-white text-center">${pelicula.title}</h6>
                `
            
                wraper.appendChild(divs)
        
        
            })
            
        }



    }
    
htmlArmado()

function popUpPelicula(id){

    const boton = document.querySelector("#botonPeliculaModals")
    
            peliculas.forEach((element)=>{
                
            if(element.idPelicula == id){            
            const titulo = document.querySelector("#staticBackdropLabel")
            const informacion = document.querySelector("#informacion")
            const imagen = document.querySelector("#imagenPelicula")
                
            titulo.textContent = element.title
            informacion.innerHTML = `

                <h5><b>Sinopsis: </b> ${element.sinopsis}</h5>
                <br>
                <h5><b>Elenco: </b> ${element.elenco}</h5>
                <br>
                <h5><b>Director: </b> ${element.director}</h5>
                <br>
                <h5><b>Duracion: </b> ${element.duracion}</h5>
                <br>
                <h5><b>Estreno:</b> ${element.estreno}</h5>
                <br>


            `

            imagen.src = element.image
            }
        })
         boton.click()



}
