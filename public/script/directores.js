const url_directores = "http://localhost:8080/incaa-api/directores"
let directores; 


const getDirectores =  async ()=>{

    const response = await fetch(url_directores)
    const data = await response.json()

    return data

}

async function htmlArmado(){ 

    directores = await getDirectores()
  
    const wraper = document.querySelector(".wrapper")

    directores.forEach((director)=>{
        const alt1 = `foto de ${director.name}`
        const divs = document.createElement("div")
        divs.classList.add("item-image")
        
        divs.innerHTML = `
        <a onclick='popUpDirectores(${director.id})'><img src=${director.image} alt=${alt1}></a><h6 class="text-white text-center">${director.name}</h6>
        `
    
        wraper.appendChild(divs)


    })
    
}

htmlArmado()

function popUpDirectores(id){
 
    const boton = document.querySelector("#botonModals")
    
            directores.forEach((element)=>{
            if(element.id == id){
                    document.querySelector("#exampleModalLabel").textContent = element.name
                    document.querySelector(".modal-body").innerText = element.description
                    document.querySelector("#wikiModal").href = element.wikilink
            }
        })
         boton.click()



}

