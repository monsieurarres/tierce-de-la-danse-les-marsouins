/* ==========================================================
   Tiercé de la Danse
   musiques.js
   ----------------------------------------------------------
   Modifier uniquement ce tableau avant chaque soirée.
   Conserver exactement 10 musiques.
   L'ordre indiqué ici correspond à l'ordre de référence
   utilisé pour générer la liste affichée aux vacanciers.
   ========================================================== */

const MUSIQUES = [
    "Magic In The Air - Magic System",
    "Freed From Desire - Gala",
    "Pedro - Jaxomy & Agatino Romero",
    "Titanium - David Guetta feat. Sia",
    "Jerusalema - Master KG",
    "Alors On Danse - Stromae",
    "Macarena - Los Del Rio",
    "Danza Kuduro - Don Omar & Lucenzo",
    "I Gotta Feeling - Black Eyed Peas",
    "Sweet Caroline - Neil Diamond"
];

/* ==========================================================
   Vérification automatique
   ========================================================== */

(function () {

    if (!Array.isArray(MUSIQUES)) {
        console.error("❌ MUSIQUES doit être un tableau.");
        return;
    }

    if (MUSIQUES.length !== 10) {
        console.warn(
            `⚠️ Le Tiercé de la Danse est prévu pour exactement 10 musiques. Actuellement : ${MUSIQUES.length}.`
        );
    }

    const doublons = MUSIQUES.filter(
        (titre, index) => MUSIQUES.indexOf(titre) !== index
    );

    if (doublons.length > 0) {
        console.warn("⚠️ Musiques en double :", doublons);
    }

})();
