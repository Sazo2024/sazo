document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll(".nav-item");
  const sections = document.querySelectorAll(".section");
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");
  const searchToggle = document.getElementById('search-toggle');
  const searchBarContainer = document.getElementById('search-bar-container');
  const cancelSearch = document.getElementById('cancel-search'); 
  const searchInput = document.getElementById("main-search");

  searchInput?.addEventListener("input", () => {
    const value = searchInput.value.trim().toLowerCase();
    console.log("Buscando:", value);
    // Aquí podrías filtrar resultados si agregas una lista
  });


  const notifBtn = document.getElementById('open-notifications');
  const profileBtn = document.getElementById('open-profile');
  const notifModal = document.getElementById('notifications-modal');
  const profileModal = document.getElementById('profile-modal');
  const closeNotif = document.getElementById('close-notifications');
  const closeProfile = document.getElementById('close-profile');

  const petsSection = document.getElementById('section-pets');
  const animalView = document.getElementById("animal-view");
  const emptyIcon = document.getElementById("empty-icon");

  const spaceCards = document.querySelectorAll(".space-card");

  const openModalBtn = document.getElementById("open-modal");
  const addModal = document.getElementById("add-pet-modal");
  const closeAddPetModal = document.getElementById("close-add-modal");

  const backBtns = document.querySelectorAll('.back-btn');
  const searchTabs = document.querySelectorAll('.search-tab');

  const editBtns = document.querySelectorAll(".edit-btn");
  const editModal = document.getElementById("edit-modal");
  const closeEditModal = document.getElementById("close-edit-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalInput = document.getElementById("modal-input");
  const modalError = document.getElementById("modal-error");
  const saveModalBtn = document.getElementById("save-modal-btn");

  let currentField = '';

  // Navegación
  navItems.forEach(item => {
    item.addEventListener("click", () => {
      const sectionId = item.dataset.section;

      navItems.forEach(i => i.classList.remove("selected"));
      item.classList.add("selected");

      sections.forEach(section => section.classList.add("hidden"));
      document.getElementById(sectionId).classList.remove("hidden");
    });
  });

  // Tabs Feed
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const selected = tab.dataset.tab;
      tabContents.forEach(c => c.classList.remove("show"));
      document.getElementById("tab-" + selected).classList.add("show");
    });
  });

  searchToggle?.addEventListener("click", () => {
    searchBarContainer?.classList.toggle("show");
  });

  cancelSearch?.addEventListener("click", () => {
    searchBarContainer?.classList.remove("show");
  });

  notifBtn?.addEventListener("click", () => notifModal?.classList.remove("hidden"));
  closeNotif?.addEventListener("click", () => notifModal?.classList.add("hidden"));

  profileBtn?.addEventListener("click", () => profileModal?.classList.remove("hidden"));
  closeProfile?.addEventListener("click", () => profileModal?.classList.add("hidden"));

  backBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      animalView.classList.add("hidden");
      petsSection.classList.remove("hidden");
      navItems.forEach(i => i.classList.remove("selected"));
      navItems[0].classList.add("selected");
    });
  });

  spaceCards.forEach(card => {
    card.addEventListener("click", () => {
      const animal = card.dataset.animal;
      let symbol = "🐾❓";
      if (animal === "conejos") symbol = "🐰❓";
      else if (animal === "gallinas") symbol = "🐔❓";
      else if (animal === "perros") symbol = "🐶❓";

      emptyIcon.textContent = symbol;
      petsSection.classList.add("hidden");
      animalView.classList.remove("hidden");
    });
  });

  searchTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      searchTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
    });
  });

  openModalBtn?.addEventListener("click", () => {
    addModal?.classList.remove("hidden");
  });

  closeAddPetModal?.addEventListener("click", () => {
    addModal?.classList.add("hidden");
  });

  document.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      addModal?.classList.remove("hidden");
    });
  });

  editBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      currentField = btn.getAttribute("data-field");
      modalTitle.textContent = `Editar ${btn.previousElementSibling.previousElementSibling.textContent}`;
      modalInput.value = btn.previousElementSibling.textContent.includes('Pon') || btn.previousElementSibling.textContent.includes('Cuéntanos') ? '' : btn.previousElementSibling.textContent;
      modalError.textContent = '';
      editModal.classList.remove('hidden');
    });
  });

  closeEditModal.addEventListener("click", () => {
    editModal.classList.add("hidden");
  });

  saveModalBtn.addEventListener("click", () => {
    const value = modalInput.value.trim();
    if (!value) {
      modalError.textContent = "Este campo no puede estar vacío.";
      return;
    }

    if (currentField === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
      modalError.textContent = "Correo electrónico inválido.";
      return;
    }

    if (currentField === "username" && value.toLowerCase() === "usuarioexistente") {
      modalError.textContent = "Nombre de usuario ocupado.";
      return;
    }

    document.getElementById(currentField).textContent = value;
    editModal.classList.add("hidden");
  });
});
