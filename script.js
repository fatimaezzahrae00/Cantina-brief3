import { recettes } from "./data.js";

const PLAFOND = 50;

const button = document.getElementById("Ajouter");
const form = document.getElementById("recetteForm");
const annuler = document.getElementById("Annuler");
const listR = document.getElementById("listR");

let recetteEnCours = null;

function showPopup() {
    form.reset();
    recetteEnCours = null;

    form.querySelector("h3").textContent = "Ajouter une recette";
    form.querySelector(".btn-submit").textContent = "Ajouter";

    form.classList.remove("hidden");
    form.classList.add("flex");
}

function annulerPopup() {
    form.classList.add("hidden");
    form.classList.remove("flex");
    form.reset();
    recetteEnCours = null;
}

button.addEventListener("click", showPopup);
annuler.addEventListener("click", annulerPopup);

/* ---------- Totaux et plafond ---------- */

// Total d'une carte. "exclure" = select à ignorer dans le calcul
function totalCarte(carte, exclure = null) {
    let total = 0;

    carte.querySelectorAll(".menu-select").forEach(select => {
        if (select === exclure) return;

        const recette = recettes.find(r => String(r.id) === select.value);
        if (recette) total += Number(recette.prix);
    });

    return total;
}

// Mise à jour du total affiché sur chaque carte
function calculerTotaux() {
    document.querySelectorAll(".total").forEach(totalEl => {
        const carte = totalEl.closest(".border-t-4");
        const total = totalCarte(carte);

        totalEl.firstChild.textContent = total + " ";
        totalEl.classList.toggle("text-red-600", total > PLAFOND);
    });
}

document.addEventListener("change", event => {
    const select = event.target;
    if (!select.classList.contains("menu-select")) return;

    const carte = select.closest(".border-t-4");
    const recette = recettes.find(r => String(r.id) === select.value);
    const nouveauTotal =
        totalCarte(carte, select) + (recette ? Number(recette.prix) : 0);

    // Dépassement : on revient au choix précédent
    if (nouveauTotal > PLAFOND) {
        select.value = select.dataset.precedent || "";
        alert(`Le total du jour ne peut pas dépasser ${PLAFOND} DH`);
        return;
    }

    select.dataset.precedent = select.value;
    calculerTotaux();
});


function actualiserMenus() {
    const menus = document.querySelectorAll(".menu-select");

    menus.forEach(select => {
        const ancienChoix = select.value;
        const categorie = select.dataset.type;
        const placeholder = select.options[0].textContent;

        select.innerHTML = "";

        const optionVide = document.createElement("option");
        optionVide.value = "";
        optionVide.textContent = placeholder;
        select.appendChild(optionVide);

        recettes
            .filter(recette => recette.categorie === categorie)
            .forEach(recette => {
                const option = document.createElement("option");

                option.value = String(recette.id);
                option.textContent = `${recette.nom} - ${recette.prix} DH`;

                select.appendChild(option);
            });

        // Conserver le choix s'il existe toujours
        const choixExiste = [...select.options].some(
            option => option.value === ancienChoix
        );

        select.value = choixExiste ? ancienChoix : "";
        select.dataset.precedent = select.value;
    });

    calculerTotaux();
}



function afficherToutesLesRecettes() {
    listR.innerHTML = "";

    recettes.forEach(recette => {
        afficherRecette(recette);
    });

    const compteur = document.querySelector("section h2 span");

    if (compteur) {
        compteur.textContent = recettes.length;
    }
}

function afficherRecette(recette) {
    const div = document.createElement("div");

    div.innerHTML = `
        <div class="bg-white border border-gray-200 rounded-2xl p-5 recipe-card">
            <div class="flex justify-between items-center">
                <span class="bg-green-100 text-green-700 text-xs font-bold rounded-full px-3 py-1">
                    ${recette.categorie}
                </span>

                <div class="flex gap-2">
                    <button type="button"
                        class="btn-edit bg-white rounded-lg p-1 border border-green-300">
                        Modifier
                    </button>

                    <button type="button"
                        class="btn-delete bg-white rounded-lg p-1 border border-red-500">
                        Supprimer
                    </button>
                </div>
            </div>

            <h3 class="text-xl font-semibold mt-4"></h3>

            <div class="flex justify-between items-center mt-4">
                <p class="text-xs text-gray-500">
                    <span class="text-green-500">●</span>
                    ${recette.type || "Classique"}
                </p>

                <p class="font-bold">${recette.prix} DH</p>
            </div>
        </div>
    `;

    
    div.querySelector("h3").textContent = recette.nom;

    listR.appendChild(div);

    div.querySelector(".btn-edit").addEventListener("click", () => {
        recetteEnCours = recette;

        form.querySelector("#nom").value = recette.nom;
        form.querySelector("#categorie").value = recette.categorie;
        form.querySelector("#prix").value = recette.prix;

        const qualites = (recette.type || "")
            .split(",")
            .map(q => q.trim());

        form.querySelectorAll('input[name="qualite"]')
            .forEach(checkbox => {
                checkbox.checked = qualites.includes(checkbox.value);
            });

        form.querySelector("h3").textContent = "Modifier une recette";
        form.querySelector(".btn-submit").textContent = "Modifier";

        form.classList.remove("hidden");
        form.classList.add("flex");
    });

    // Supprimer
    div.querySelector(".btn-delete").addEventListener("click", () => {
        const index = recettes.indexOf(recette);

        if (index !== -1) {
            recettes.splice(index, 1);
        }

        afficherToutesLesRecettes();
        actualiserMenus();
    });
}

form.addEventListener("submit", event => {
    event.preventDefault();

    const nom = form.querySelector("#nom").value.trim();
    const categorie = form.querySelector("#categorie").value;
    const prix = Number(form.querySelector("#prix").value);

    const qualites = [
        ...form.querySelectorAll('input[name="qualite"]:checked')
    ].map(checkbox => checkbox.value);

    const type = qualites.length ? qualites.join(", ") : "Classique";

    if (!nom || !categorie || prix < 0) {
        return;
    }

    if (recetteEnCours) {
        recetteEnCours.nom = nom;
        recetteEnCours.categorie = categorie;
        recetteEnCours.prix = prix;
        recetteEnCours.type = type;
    } else {
        recettes.push({
            id: Date.now(),
            nom,
            categorie,
            prix,
            type
        });
    }

    afficherToutesLesRecettes();
    actualiserMenus();
    annulerPopup();
});


afficherToutesLesRecettes();
actualiserMenus();