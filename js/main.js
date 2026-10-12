/* ============================================
   Estudio Jurídico - Interacciones
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initActiveNavHighlight();
  initContactForm();
  initFooterYear();
});

/* ---------- Navegación móvil ---------- */
function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".nav-list");

  if (!toggle || !navList) return;

  toggle.addEventListener("click", () => {
    const isOpen = navList.classList.toggle("open");
    toggle.classList.toggle("open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  navList.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navList.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------- Resaltar sección activa ---------- */
function initActiveNavHighlight() {
  const links = document.querySelectorAll(".nav-list a[href^='#']");
  if (!links.length) return;

  const sections = [...links]
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => link.classList.remove("active"));
        const active = document.querySelector(
          `.nav-list a[href="#${entry.target.id}"]`
        );
        if (active) active.classList.add("active");
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---------- Formulario de contacto ---------- */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const status = document.getElementById("form-status");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = form.nombre.value.trim();
    const email = form.email.value.trim();
    const mensaje = form.mensaje.value.trim();

    if (!nombre || !email || !mensaje) {
      setStatus("Por favor, complete todos los campos obligatorios.", "error");
      return;
    }

    if (!isValidEmail(email)) {
      setStatus("Por favor, ingrese un correo electrónico válido.", "error");
      return;
    }

    setStatus(
      "Gracias por su mensaje. Un abogado del estudio se pondrá en contacto con usted a la brevedad.",
      "success"
    );
    form.reset();
  });
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function setStatus(message, type) {
  const status = document.getElementById("form-status");
  if (!status) return;
  status.textContent = message;
  status.classList.remove("success", "error");
  status.classList.add(type);
}

/* ---------- Año dinámico en el pie ---------- */
function initFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
