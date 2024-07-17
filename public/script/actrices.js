    const url_actrices = "http://localhost:8080/incaa-api/actrices"
    let actrices; 
    const getActrices =  async ()=>{

        const response = await fetch(url_actrices)
        const data = await response.json()

        return data

    }

    async function htmlArmado(){ 
        actrices = await getActrices()
    
        const wraper = document.querySelector(".wrapper")

        actrices.forEach((actriz)=>{
            const divs = document.createElement("div")
            divs.classList.add("item-image")
            
            divs.innerHTML = `
            <a onclick='popUpActriz(${actriz.id})'><img src=${actriz.image} alt="foto de ${actriz.name}"></a><h6 class="text-white text-center">${actriz.name}</h6>
            `
        
            wraper.appendChild(divs)


        })
        
    }

    htmlArmado()

    function popUpActriz(id){
        
        const boton = document.querySelector("#botonModals")
        
                actrices.forEach((element)=>{
                if(element.id == id){
                        document.querySelector("#exampleModalLabel").textContent = element.name
                        document.querySelector(".modal-body").innerText = element.description
                        document.querySelector("#wikiModal").href = element.wikilink
                }
            })
            boton.click()



    }

