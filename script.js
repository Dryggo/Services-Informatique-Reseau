document.querySelectorAll(".carousel").forEach((carousel) => {
  const slides = carousel.querySelectorAll(".slide");
  const bouton_suivant = carousel.querySelector(".bouton-suivant ");
  const bouton_precedent = carousel.querySelector(".bouton-precedent");
  let index = 0;

  function showSlide(i) {
    slides.forEach((slide, idx) => {
      slide.style.display = idx === i ? "block" : "none";
    });
  }

  showSlide(index);

  bouton_suivant.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    showSlide(index);
  });

  bouton_precedent.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
  });

  setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide(index);
  }, 4000);
});

// === GESTION DES MODALES D’APERÇU ===

// Création d’une seule modale réutilisable
const modal = document.createElement("div");
modal.className = "modal";
modal.innerHTML = `
  <div class="modal-content">
    <div id="modal-desc"></div>
    <button id="close-modal">Fermer</button>
  </div>
`;
document.body.appendChild(modal);

// Quand on clique sur "Aperçu"
document.querySelectorAll(".bouton-voir").forEach((btn) => {
  btn.addEventListener("click", () => {
    // 🔍 On cherche la description n’importe où dans le même bloc .buttons
    const descDiv = btn.parentElement.querySelector(".text-apercu");
    const desc = descDiv ? descDiv.innerHTML : "Description non disponible.";

    // Affiche le contenu dans la modale
    document.getElementById("modal-desc").innerHTML = desc;
    modal.style.display = "flex";
  });
});

// Fermer la modale
document.getElementById("close-modal").addEventListener("click", () => {
  modal.style.display = "none";
});

// Fermer si on clique en dehors
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// pour la validation du numéro de telephone

document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("#telephone");
  const output = document.querySelector("#resultat");
  const form = document.querySelector("#form-identification");

  const iti = window.intlTelInput(input, {
    nationalMode: false,
    initialCountry: "ci", // toujours drapeau CI
    utilsScript:
      "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
  });

  // Validation dynamique
  input.addEventListener("input", () => {
    if (iti.isValidNumber()) {
      output.style.color = "lightgreen";
      output.textContent = "✅ Numéro valide";
    } else {
      output.style.color = "red";
      output.textContent = "❌ Numéro invalide";
    }
  });

  // Validation à l'envoi
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!iti.isValidNumber()) {
      alert("❌ Numéro invalide : vérifiez le code pays et la longueur !");
      return;
    }
    const numero = iti.getNumber();
    alert("✅ Formulaire envoyé avec succès !\nNuméro : " + numero);
   
    // Crée un champ caché avec le numéro formaté
    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = "telephone";
    hiddenInput.value = numero;
    form.appendChild(hiddenInput);

    // Maintenant, on envoie réellement le formulaire à Web3Forms
    form.submit();
  });
});

// Menu Responsive
// Sélectionne le bouton burger et le nav
const menuToggle = document.getElementById("menu-basculer");
const navbar = document.getElementById("menu-navigation");

// Ouvre / ferme le menu
menuToggle.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

// Ferme le menu quand on clique sur un lien
document.querySelectorAll("#menu-navigation a").forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
  });
});
