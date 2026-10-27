import { recettes } from "./data.js";

const button  = document.getElementById("Ajouter");
const form    = document.getElementById("recetteForm");
const annuler = document.getElementById("Annuler");
const listR   = document.getElementById("listR");

function showPopup() {
  form.classList.remove("hidden");
  form.classList.add("flex");
}
function annulerPopup() {
  form.classList.add("hidden");
  form.classList.remove("flex");
  form.reset();
}
button.addEventListener("click", showPopup);
annuler.addEventListener("click", annulerPopup);

function afficherRecette(recette) {
  const div = document.createElement("div");

  div.innerHTML = `
    <div class="bg-white border border-gray-200 rounded-2xl p-5 recipe-card">
      <div class="flex justify-between items-center">
        <span class="bg-green-100 text-green-700 text-xs font-bold rounded-full px-3 py-1">
          ${recette.categorie}
        </span>
        <div class="flex gap-2">
          <button class="btn-edit bg-white rounded-lg p-1 border border-green-300">Modifier</button>
          <button class="btn-delete bg-white rounded-lg p-1 border border-red-500">Supprimer</button>
        </div>
      </div>

      <h3 class="text-xl font-semibold mt-4">${recette.nom}</h3>

      <div class="flex justify-between items-center mt-4">
        <p class="text-xs text-gray-500"><span class="text-green-500">●</span> ${recette.type}</p>
        <p class="font-bold">${recette.prix} DH</p>
      </div>
    </div>
  `;

  listR.append(div);

  
  div.querySelector(".btn-delete").addEventListener("click", () => {
    supprimerRecette(recette, div);
  });
  div.querySelector(".btn-edit").addEventListener("click", () => {
    form.classList.remove("hidden");
    form.classList.add("flex");

    form.querySelector('[name="nom"]').value =recette.nom
    form.querySelector('[name="categorie"]').value = recette.categorie;
    form.querySelector('[name="prix"]').value = recette.prix;

    
    form.querySelectorAll('input[name="qualite"]').forEach(checkbox => {
        checkbox.checked = recette.type.includes(checkbox.value);
    });

    form.querySelector("h3").textContent = "Modifier une recette";
    form.querySelector(".btn-submit").textContent = "Modifier";


  });
}


function ajouterRecette(nom, categorie, prix, type) {
  const recette = { id: Date.now(), nom, categorie, prix, type };
  recettes.push(recette);
  afficherRecette(recette);
}


function supprimerRecette(recette, element) {
  const index = recettes.indexOf(recette);
  if (index !== -1) {
    recettes.splice(index, 1);
  }
  element.remove();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nom       = form.querySelector("#nom").value.trim();
  const categorie = form.querySelector("#categorie").value;
  const prix      = Number(form.querySelector("#prix").value);

  const qualites = [...form.querySelectorAll('input[name="qualite"]:checked')]
    .map((c) => c.value);
  const type = qualites.length ? qualites.join(", ") : "Classique";

  if (!nom || !categorie || prix < 0) return;

  ajouterRecette(nom, categorie, prix, type);
  annulerPopup(); 
});


recettes.forEach(afficherRecette);
    