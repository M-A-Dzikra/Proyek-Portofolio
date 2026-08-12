const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

function setTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  themeToggle.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
}

function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = savedTheme || (prefersDark ? 'dark' : 'light');
  setTheme(theme);
}

themeToggle.addEventListener('click', () => {
  const currentTheme = root.getAttribute('data-theme');
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

loadTheme();

const skills = ["Rust", "Javascript & Tailwindcss", "Ms Office"];
const skillsContainer = document.getElementById("skills-container");

skills.forEach(skill => {
    const li = document.createElement("li");
    li.textContent = skill;
    skillsContainer.appendChild(li);
});

const contactForm = document.getElementById('contact-form');
const popupModal = document.getElementById('popup-modal');
const closePopup = document.getElementById('close-popup');
const emailInput = document.getElementById('email-input');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if(emailInput.value) {
        popupModal.style.display = 'flex';
        emailInput.value = '';
    }
});

closePopup.addEventListener('click', () => {
    popupModal.style.display = 'none';
});

const container = document.querySelector('#proyek-container')

proyek.forEach((item) => {
  const card = document.createElement('div')
  card.className = 'project-card'
  card.innerHTML = `
    <h3>${item.judul}</h3>
    <p>${item.deskripsi}</p>
  `
  container.appendChild(card)
})
