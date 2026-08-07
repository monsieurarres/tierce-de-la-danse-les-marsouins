/* ==========================================================
   Tiercé de la Danse
   config.js
   ----------------------------------------------------------
   Configuration générale de l'application
   ========================================================== */

const CONFIG = {

    /* ======================================================
       Google Apps Script
       ====================================================== */

    API_URL:
        "https://script.google.com/macros/s/AKfycbxuBrL7PxrTn8wMM7fqayHkxYfYnHyvLJPuHu00K-6btE2_ur0BKVg9Kzvhi4gR9WDQFA/exec",

    /* ======================================================
       Administration
       ====================================================== */

    ADMIN_PASSWORD: "Camping2026",

    /* ======================================================
       Jeu
       ====================================================== */

    MAX_MUSIQUES: 10,

    POINTS: {
        0: 10, // Bonne position
        1: 8,  // Décalage de 1
        2: 6,  // Décalage de 2
        3: 4   // Décalage de 3
        // Au-delà : 0 point
    },

    /* ======================================================
       Interface
       ====================================================== */

    TITRE: "Tiercé de la Danse",

    SOUS_TITRE:
        "Classe les 10 musiques dans l'ordre où tu penses qu'elles seront jouées.",

    BOUTON_VALIDER: "🎵 Valider mon Tiercé",

    MESSAGE_SUCCES:
        "🎉 Merci ! Ta participation a bien été enregistrée. Bonne soirée !",

    MESSAGE_ERREUR:
        "❌ Une erreur est survenue. Merci de réessayer.",

    /* ======================================================
       Validation formulaire
       ====================================================== */

    CHAMPS_OBLIGATOIRES: [
        "nom",
        "prenom",
        "emplacement"
    ],

    /* ======================================================
       Export
       ====================================================== */

    EXPORT_CSV: "classement-tierce-danse.csv"

};

/* ==========================================================
   Vérifications automatiques
   ========================================================== */

(function () {

    if (!CONFIG.API_URL || !CONFIG.API_URL.startsWith("https://")) {
        console.error("❌ API_URL invalide dans config.js");
    }

    if (MUSIQUES.length !== CONFIG.MAX_MUSIQUES) {
        console.warn(
            `⚠️ Nombre de musiques (${MUSIQUES.length}) différent de MAX_MUSIQUES (${CONFIG.MAX_MUSIQUES}).`
        );
    }

})();
