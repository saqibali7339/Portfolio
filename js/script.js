document.addEventListener("DOMContentLoaded", function () {
  /* =============================
     NAVBAR: Hamburger Toggle
  ============================== */
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close navbar when a link is clicked
    navLinks.forEach((link) =>
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      })
    );
  }

  /* =============================
     THEME SWITCH (Dark / Light)
  ============================== */
  const toggleSwitch = document.querySelector(
    '.theme-switch input[type="checkbox"]'
  );

  function setTheme(mode) {
    document.documentElement.setAttribute("data-theme", mode);
    localStorage.setItem("theme", mode);
  }

  function switchTheme(e) {
    setTheme(e.target.checked ? "dark" : "light");
  }

  if (toggleSwitch) {
    toggleSwitch.addEventListener("change", switchTheme, false);

    // Load saved theme on init
    const currentTheme = localStorage.getItem("theme") || "light";
    setTheme(currentTheme);
    if (currentTheme === "dark") toggleSwitch.checked = true;
  }

  /* =============================
     AUTO DATE (Footer)
  ============================== */
  const myDate = document.querySelector("#datee");
  if (myDate) myDate.textContent = new Date().getFullYear();

  /* =============================
     SEO MODAL
  ============================== */
  const seoModal = document.getElementById("seoModal");
  const seoModalTitle = document.getElementById("seoModalTitle");
  const seoModalDesc = document.getElementById("seoModalDesc");
  const seoModalVideo = document.getElementById("seoModalVideo");
  const closeBtn = document.querySelector(".seo-modal .close");

  if (seoModal) {
    document.querySelectorAll("#seo-projects .card").forEach((card) => {
      card.addEventListener("click", () => {
        seoModalTitle.textContent =
          card.getAttribute("data-title") || "SEO Project";
        seoModalDesc.textContent =
          card.getAttribute("data-desc") ||
          "Confidential SEO project details.";
        seoModalVideo.src = card.getAttribute("data-video") || "";
        seoModal.style.display = "block";
      });
    });

    if (closeBtn) {
      closeBtn.onclick = () => {
        seoModal.style.display = "none";
        seoModalVideo.src = ""; // stop video
      };
    }

    window.onclick = (e) => {
      if (e.target === seoModal) {
        seoModal.style.display = "none";
        seoModalVideo.src = "";
      }
    };
  }

  /* =============================
     LOAD MORE BUTTONS
  ============================== */
  function setupLoadMore(cards, button, desktopCount, mobileCount) {
    if (!button || !cards.length) return;

    let initialVisible = window.innerWidth <= 768 ? mobileCount : desktopCount;
    let currentVisible = initialVisible;

    const showCards = () => {
      cards.forEach((card, index) => {
        card.style.display = index < currentVisible ? "block" : "none";
      });
      button.style.display =
        currentVisible >= cards.length ? "none" : "block";
    };

    // Initial state
    showCards();

    // Button click
    button.addEventListener("click", () => {
      currentVisible += initialVisible;
      showCards();
    });
  }

  const devProjects = document.querySelectorAll("#dev-projects .card");
  const seoProjects = document.querySelectorAll("#seo-projects .card");
  const devBtn = document.querySelector("#dev-projects #loadMoreBtn");
  const seoBtn = document.querySelector("#seoLoadMoreBtn");

  setupLoadMore(devProjects, devBtn, 6, 3);
  setupLoadMore(seoProjects, seoBtn, 4, 2);

  /* =============================
     MOBILE HOVER EFFECT
  ============================== */
  document.querySelectorAll("#dev-projects .card").forEach((card) => {
    card.addEventListener("touchstart", () => {
      card.classList.toggle("hover");
    });
  });
});
