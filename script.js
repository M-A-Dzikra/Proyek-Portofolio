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

const supabaseUrl = 'https://ewuawqbxwxfgenfoapjq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3dWF3cWJ4d3hmZ2VuZm9hcGpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY0ODkwODgsImV4cCI6MjEwMjA2NTA4OH0.PtEvDbJ0k-HMobV9PbC9NVHJV_RAVOp6L23RkdmOBgE';
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

const proyekContainer = document.getElementById('proyek-container');

async function loadProyek() {
    const { data: proyekList, error } = await supabaseClient
        .from('proyek')
        .select('*');

    if (error) {
        console.error("Gagal memuat proyek:", error);
        return;
    }

    proyekContainer.innerHTML = '';

    proyekList.forEach(item => {
        const card = document.createElement('div');
        card.className = 'proyek-card';

        card.innerHTML = `
            <img src="${item.gambar_url}" alt="${item.judul}" class="proyek-img">
            <div class="proyek-content">
                <h3 class="proyek-title">${item.judul}</h3>
                <p class="proyek-desc">${item.deskripsi}</p>
            </div>
        `;

        proyekContainer.appendChild(card);
    });
}

loadProyek();

const contactForm = document.getElementById('contact-form');
const popupModal = document.getElementById('popup-modal');
const closePopup = document.getElementById('close-popup');
const emailInput = document.getElementById('email-input');
const submitBtn = contactForm.querySelector('button[type="submit"]');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = emailInput.value;
    
    if(email) {
        submitBtn.textContent = 'Mengirim...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7'; 
        submitBtn.style.cursor = 'not-allowed';

        const { data, error } = await supabaseClient
            .from('pesan')
            .insert([
                { nama: email }
            ]);

        submitBtn.textContent = 'Kirim';
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.style.cursor = 'pointer';

        if (error) {
            console.error("Gagal simpan data:", error);
            alert("Terjadi kesalahan saat mengirim email.");
        } else {
            popupModal.style.display = 'flex';
            emailInput.value = '';
        }
    }
});

closePopup.addEventListener('click', () => {
    popupModal.style.display = 'none';
});
