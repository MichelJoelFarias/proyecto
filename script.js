const container = document.getElementById("container")
let currentPage = 1;
let totalPages = 0;
let generoActual = ''; 



const personajesBtn= document.getElementById("personajes")
const femeninoBtn= document.getElementById("femenino")
const masculinoBtn= document.getElementById("masculino")
const indistintoBtn= document.getElementById("indistinto")

const getCharacters=(pageNumber)=>{ 

container.innerHTML="";
fetch (`https://rickandmortyapi.com/api/character/?page=${pageNumber}`)
.then(res => res.json())
.then((data) => {
renderCharacters(data)
totalPages=data.info.pages;
 })
}


getCharacters(currentPage)

const renderCharacters=(data)=>{
container.innerHTML=""
console.log(data)
data.results.forEach(characters => {
container.innerHTML +=
   `  <div class="card" style="width: 18rem;">
   <img src="${characters.image}" class="card-img-top" alt="...">
   <div class="card-body">
    <h5 class="card-title">${characters.name}</h5>
   <button class="button" onclick=verDescripcion("${characters.url}")>ver mas</button>
   </div>
</div>`
        
    });
}
const verDescripcion=(charactersUrl) =>{
    container.innerHTML=""
    fetch(charactersUrl)
    .then(res=>res.json())
   .then((character)=>{
    container.innerHTML+=`
    <div class="card" style="width: 18rem;">
    <img src="${character.image}" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${character.name}</h5>
    <p class="card-text"><b>genero:</b>${character.gender}</p>
    <p class="card-text"><b>especie:</b>${character.species}</p>
    <p class="card-text"><b>estado:</b>${character.status}</p>
    <p class="card-text"><b>origen:</b>${character.origin.name}</p>
    <p class="card-text"><b>locacion:</b>${character.location.name}</p>
    <button class="button" onclick=volver()>atras</button>
   
    </div>
    </div>
    `
   });
}
const volver=()=>{
    window.history.back
    location.reload();

}

const currentPageElement = document.getElementById("currentPage");
const totalPagesElement = document.getElementById("totalPages");
const firstBtn= document.getElementById("paginaPrincipal");
const nextBtn = document.getElementById("nextBtn");
const prevBtn= document.getElementById("previousBtn");
const lastBtn= document.getElementById("ultimaPagina");


const filterCharacters=()=>{
    fetch (`https://rickandmortyapi.com/api/character/?gender=${generoActual}&page=${currentPage}`)
    .then(res=>res.json())
    .then(data=> {
        renderCharacters(data) 
        totalPages=data.info.pages;
        updatePaginationInfo() ;
        // if (totalPages === 1) {
        //     nextBtn.setAttribute("disabled", true) 
        //     lastBtn.setAttribute("disabled", true) 
        // } else {
        //     nextBtn.removeAttribute("disabled", true)
        //     lastBtn.removeAttribute("disabled", true)
        // }
    }) 
}
const updatePaginationInfo = () => {
    currentPageElement.textContent = currentPage;
    totalPagesElement.textContent = totalPages;
  };

// funcion pagina siguiente
nextBtn.addEventListener("click", () => {
    // si es menor igual a 1 suma 1
    if(currentPage <=1) { // pag 1
        currentPage ++;
        prevBtn.removeAttribute("disabled", false) 
    } else if(currentPage >1 && currentPage < totalPages){ // 2 o mas & existe la siguiente
        prevBtn.removeAttribute("disabled", false) // se habilita btn pag anterior
        currentPage ++;
    }
    if(currentPage == totalPages ){ // si estamos en la ultima pag deshabilitamos el boton de pag siguiente
        console.log(currentPage, totalPages)
        nextBtn.setAttribute("disabled", true) 
    }

    if (generoActual) {
        filterCharacters()
    } else {
        getCharacters(currentPage);
        updatePaginationInfo();
    }
} )


prevBtn.addEventListener("click", () => {
    if(currentPage <=1){
        prevBtn.setAttribute("disabled",true)
    } else if(currentPage >= 1 && currentPage <= totalPages){
        currentPage --;
        nextBtn.removeAttribute("disabled", true)
    }

    if (generoActual) {
        filterCharacters()
    } else {
        getCharacters(currentPage);
        updatePaginationInfo();
    }
} )

lastBtn.addEventListener("click", () => {
    nextBtn.setAttribute("disabled",true)
    prevBtn.removeAttribute("disabled", true)
    currentPage = totalPages
    if (generoActual) {
        
        filterCharacters()
    } else {
        getCharacters(totalPages);
        updatePaginationInfo();
    }
})

firstBtn.addEventListener("click", () => {
    currentPage=1
    prevBtn.setAttribute("disabled", true)
    nextBtn.removeAttribute("disabled")
   
   filterCharacters();
    updatePaginationInfo();

})


femeninoBtn.addEventListener("click",()=> {
    currentPage = 1
    generoActual = "female"
    filterCharacters()
    
})
 
masculinoBtn.addEventListener("click",()=> {
    currentPage = 1
    generoActual = "male"
    filterCharacters()
})

indistintoBtn.addEventListener("click",()=> {
    currentPage = 1
    generoActual = "genderless"
    filterCharacters() 
})
personajesBtn.addEventListener("click", () => {
    currentPage = 1;
    generoActual = ''; 
    filterCharacters(); 
    
  });