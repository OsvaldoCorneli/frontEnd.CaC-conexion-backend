const url_actores = "http://localhost:8080/incaa-api/actores"
let actores; 


const getActores =  async ()=>{

    const response = await fetch(url_actores)
    const data = await response.json()

    return data

}

async function htmlArmado(){ 

    actores = await getActores()
  
    const wraper = document.querySelector(".wrapper")

    actores.forEach((actor)=>{
        const divs = document.createElement("div")
        divs.classList.add("item-image")
        
        divs.innerHTML = `
        <a onclick='popUpActor(${actor.id})'><img src=${actor.image} alt="${actor.name}"></a><h6 class="text-white text-center">${actor.name}</h6>
        `
    
        wraper.appendChild(divs)


    })
    
}

htmlArmado()

function popUpActor(id){
 
    const boton = document.querySelector("#botonModals")
    
            actores.forEach((element)=>{
            if(element.id == id){
                    document.querySelector("#exampleModalLabel").textContent = element.name
                    document.querySelector(".modal-body").innerText = element.description
                    document.querySelector("#wikiModal").href = element.wikilink
            }
        })
         boton.click()



}

