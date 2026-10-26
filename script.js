import { recettes } from "./data.js";
const button = document.getElementById('Ajouter');
const popup = document.getElementById('popupdiv');
const annuler = document.getElementById('Annuler');

function showPopup() {
    popup.classList.remove('hidden');
}
function annulerPopup() {
    popup.classList.add('hidden');
}

button.addEventListener('click', showPopup);
annuler.addEventListener('click', annulerPopup);

let listR=document.querySelector("#listR")
function afficherRecette(recette){
  let div=document.createElement("div")
  /*
  
  div.innerHTML=`

            <div class="bg-white border border-gray-200 rounded-2xl p-5 recipe-card ">
              <div class="flex justify-between items-center">
                  <span class="bg-green-100 text-green-700 text-xs font-bold rounded-full px-3 py-1">${recette.categorie}</span>
                  <div class="flex gap-2">
                      <div class="flex justify-end gap-2">
                          <button class="btn-edit bg-white rounded-lg p-1 border border-green-300 "> Modifier</button>
                          <button  class="btn-delete bg-white rounded-lg p-1 border border-red-500 ">Supprimer</button>
                        </div>
                  </div>
              </div>
              <h3 class="text-xl font-semibold mt-4">${recette.nom}</h3>
              <div class="flex justify-between items-center mt-4">
                  <p class="text-xs text-gray-500"><span class="text-green-500">●</span> ${recette.type}</p>
                  <p class="font-bold">${recette.prix} DH</p>
              </div>
          </div>
  `
  listR.append(div)
  div.querySelector(".btn-delete").addEventListener("click",()=>{
    recettes.splice(recettes.indexOf(recette),1)
  })
  */
    
div.innerHTML = `
  <div class="bg-white border border-gray-200 rounded-2xl p-5 recipe-card">
    <div class="flex justify-between items-center">
      <span class="bg-green-100 text-green-700 text-xs font-bold rounded-full px-3 py-1">
        ${recette.categorie}
      </span>

      <div class="flex gap-2">
        <button class="btn-edit bg-white rounded-lg p-1 border border-green-300">
          Modifier
        </button>

        <button class="btn-delete bg-white rounded-lg p-1 border border-red-500">
          Supprimer
        </button>
      </div>
    </div>

    <h3 class="text-xl font-semibold mt-4">${recette.nom}</h3>

    <div class="flex justify-between items-center mt-4">
      <p class="text-xs text-gray-500">
        <span class="text-green-500">●</span> ${recette.type}
      </p>
      <p class="font-bold">${recette.prix} DH</p>
    </div>
  </div>
`;

listR.append(div);

div.querySelector(".btn-delete").addEventListener("click", () => {
  const index = recettes.indexOf(recette);

  if (index !== -1) {
    recettes.splice(index, 1);
    div.remove();
  }
});

}
recettes.forEach((r)=>{
  afficherRecette(r)
})
