/* ==========================================================
   Tiercé de la Danse
   script.js
   ----------------------------------------------------------
   Gestion de l'application joueur
   ========================================================== */

"use strict";

/* ==========================================================
   Variables globales
   ========================================================== */

const form = document.getElementById("tierceForm");
const musicList = document.getElementById("musicList");

const btnSubmit = document.getElementById("submitBtn");

const message = document.getElementById("message");

let sortable = null;

/* ==========================================================
   Vérifications
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    if (!window.CONFIG) {

        console.error("config.js introuvable");

        return;
    }

    if (!window.MUSIQUES) {

        console.error("musiques.js introuvable");

        return;
    }

    construireListe();

    initialiserSortable();

    form.addEventListener("submit", envoyerParticipation);

});

/* ==========================================================
   Création de la liste
   ========================================================== */

function construireListe() {

    musicList.innerHTML = "";

    MUSIQUES.forEach((titre, index) => {

        const li = document.createElement("li");

        li.className = "music-item";

        li.dataset.music = titre;

        li.innerHTML = `

            <div class="rank">
                ${index + 1}
            </div>

            <div class="title">
                ${titre}
            </div>

            <div class="drag">
                ☰
            </div>

        `;

        musicList.appendChild(li);

    });

}

/* ==========================================================
   SortableJS
   ========================================================== */

function initialiserSortable() {

    sortable = new Sortable(musicList, {

        animation: 250,

        ghostClass: "sortable-ghost",

        chosenClass: "sortable-chosen",

        dragClass: "sortable-drag",

        onEnd: () => {

            mettreAJourNumeros();

        }

    });

}

/* ==========================================================
   Mise à jour des positions
   ========================================================== */

function mettreAJourNumeros() {

    const elements = musicList.querySelectorAll(".music-item");

    elements.forEach((item, index) => {

        item.querySelector(".rank").textContent = index + 1;

    });

}

/* ==========================================================
   Validation formulaire
   ========================================================== */

function verifierFormulaire() {

    const nom = document.getElementById("nom").value.trim();

    const prenom = document.getElementById("prenom").value.trim();

    const emplacement = document.getElementById("emplacement").value.trim();

    if (!nom) {

        afficherMessage("Veuillez saisir votre nom.", "error");

        return false;

    }

    if (!prenom) {

        afficherMessage("Veuillez saisir votre prénom.", "error");

        return false;

    }

    if (!emplacement) {

        afficherMessage("Veuillez saisir votre numéro de mobile-home.", "error");

        return false;

    }

    return true;

}

/* ==========================================================
   Construction des données
   ========================================================== */

function recupererClassement() {

    const liste = [];

    document.querySelectorAll(".music-item").forEach((item) => {

        liste.push(item.dataset.music);

    });

    return liste;

}

/* ==========================================================
   Désactivation bouton
   ========================================================== */

function charger(etat = true) {

    btnSubmit.disabled = etat;

    btnSubmit.textContent = etat
        ? "Envoi..."
        : CONFIG.BOUTON_VALIDER;

}

/* ==========================================================
   Message
   ========================================================== */

function afficherMessage(texte, type = "success") {

    message.className = `message ${type}`;

    message.textContent = texte;

    message.style.display = "block";

    window.scrollTo({

        top: document.body.scrollHeight,

        behavior: "smooth"

    });

}
/* ==========================================================
   Envoi vers Google Apps Script
   ========================================================== */

async function envoyerParticipation(event) {

    event.preventDefault();

    message.style.display = "none";

    if (!verifierFormulaire()) {
        return;
    }

    charger(true);

    const classement = recupererClassement();

    const donnees = {
        date: new Date().toISOString(),

        nom: document.getElementById("nom").value.trim(),

        prenom: document.getElementById("prenom").value.trim(),

        emplacement: document
            .getElementById("emplacement")
            .value
            .trim(),

        positions: classement
    };

    try {

        const reponse = await fetch(CONFIG.API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(donnees)

        });

        if (!reponse.ok) {
            throw new Error("Erreur HTTP");
        }

        const resultat = await reponse.json();

        if (resultat.success) {

            afficherMessage(
                CONFIG.MESSAGE_SUCCES,
                "success"
            );

            reinitialiserFormulaire();

        } else {

            afficherMessage(
                resultat.message || CONFIG.MESSAGE_ERREUR,
                "error"
            );

        }

    }

    catch (erreur) {

        console.error(erreur);

        afficherMessage(
            CONFIG.MESSAGE_ERREUR,
            "error"
        );

    }

    finally {

        charger(false);

    }

}

/* ==========================================================
   Réinitialisation
   ========================================================== */

function reinitialiserFormulaire() {

    form.reset();

    construireListe();

    if (sortable) {

        sortable.destroy();

    }

    initialiserSortable();

}

/* ==========================================================
   Utilitaires
   ========================================================== */

function escapeHtml(texte) {

    return texte
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}

/* ==========================================================
   Debug
   ========================================================== */

function afficherConsole() {

    console.group("Tiercé de la Danse");

    console.log("API :", CONFIG.API_URL);

    console.log("Nombre de musiques :", MUSIQUES.length);

    console.log("Liste :", MUSIQUES);

    console.groupEnd();

}

afficherConsole();

/* ==========================================================
   Fin du fichier
   ========================================================== */
