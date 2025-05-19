const menu = document.getElementById('mobile-menu');
const openBtn = document.getElementById('hamburger-btn');
const closeBtn = document.getElementById('close-menu');

// Toggle mobile menu
function toggleMenu() {
  if (menu.classList.contains('translate-x-full')) {
    menu.classList.remove('translate-x-full');
    menu.classList.remove('hidden');
  } else {
    menu.classList.add('translate-x-full');
    setTimeout(() => menu.classList.add('hidden'), 300); // Hide after animation
  }
}

openBtn.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);

// Scroll behavior for navbar search and sticky filter bar
window.addEventListener("scroll", () => {
  const heroSearch = document.getElementById("heroSearchWrapper");
  const navbarSearch = document.getElementById("navbar-search");
  const filterBar = document.getElementById("filterBar");

  if (!heroSearch || !navbarSearch || !filterBar) return;

  const heroBottom = heroSearch.getBoundingClientRect().bottom;

  // Toggle navbar search visibility
  if (heroBottom < 80) {
    navbarSearch.classList.remove("opacity-0", "translate-y-[-10px]");
    navbarSearch.classList.add("opacity-100", "translate-y-0");
  } else {
    navbarSearch.classList.remove("opacity-100", "translate-y-0");
    navbarSearch.classList.add("opacity-0", "translate-y-[-10px]");
  }

  // Sticky filter bar
  if (heroBottom <= 80) {
    filterBar.classList.add("fixed", "top-[80px]", "left-0", "right-0", "z-[49]", "shadow-md", "bg-[#325078]");
    filterBar.classList.remove("relative", "bg-[rgba(50,80,120,0.6)]");
  } else {
    filterBar.classList.remove("fixed", "top-[80px]", "left-0", "right-0", "z-[49]", "shadow-md", "bg-[#325078]");
    filterBar.classList.add("relative", "bg-[rgba(50,80,120,0.6)]");
  }
});




let allHospitalsData = []; // Store fetched data globally

// Render function to show data
function renderHospitals(data, query = "") {
  const listContainer = document.getElementById("listing-cards");
  const title = document.getElementById("listing-title");

  if (data.length === 0) {
    listContainer.innerHTML = "<p>No matching records found.</p>";
    title.textContent = `0 Results found for "${query}"`;
    return;
  }

  listContainer.innerHTML = "";
  title.textContent = `${data.length} Results found${query ? ` for "${query}"` : ""}`;

  data.forEach(item => {
    const card = `
      <div class="border-t border-gray-300 py-6">
        <div class="flex flex-col md:flex-row gap-4 justify-between">
          <div class="flex flex-col sm:flex-row gap-4 w-full md:w-3/4">
            <img src="${item.imageUrl || "./../assets/CityCare Clinic.jpeg"}" alt="${item.name}" class="w-full sm:w-[30%] h-auto object-cover rounded-md">
            <div class="flex flex-col justify-start space-y-2 w-full">
              <h3 class="text-lg font-semibold text-blue-800">${item.name}</h3>
              <p class="text-sm font-semibold text-gray-700">${item.address?.city || "Unknown City"}</p>
              <p class="text-sm text-gray-600">
                Consultation Fees:
                <span class="font-medium text-gray-800">₹${item.consultationFee || "N/A"}</span>
              </p>
              <p class="text-sm text-purple-600 font-medium">${item.slogan || "Healing Lives Across Every Specialty"}</p>
              <div class="flex items-center gap-2 text-sm text-gray-700">
                <i class="fas fa-thumbs-up text-blue-900 text-base"></i>
                <span class="font-semibold text-blue-900">${item.rating || "N/A"}%</span>
                <span class="ml-3 text-gray-500">(1,205 Patient Stories)</span>
              </div>
            </div>
          </div>
          <div class="flex items-center w-full sm:w-auto justify-center sm:justify-end mt-4 sm:mt-0">
            <div class="flex flex-col gap-2 w-full sm:w-auto items-center sm:items-end">
              <button class="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 w-48 rounded-sm hover:bg-blue-600 transition">
                Book Clinic Visit
              </button>
              <button class="border border-blue-700 text-blue-700 px-4 py-2 w-48 rounded-sm hover:bg-blue-50 transition">
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    listContainer.innerHTML += card;
  });
}

// Initial Fetch
async function fetchAllHospitals() {
  try {
    const res = await fetch("https://backend.kalopedental.com/public/list");
    const data = await res.json();
    if (data.success && Array.isArray(data.data)) {
      allHospitalsData = data.data;
      renderHospitals(allHospitalsData);
    } else {
      renderHospitals([]);
    }
  } catch (err) {
    console.error("Error fetching data:", err);
    renderHospitals([]);
  }
}

// Filter function
function handleSearch(query) {
  const searchQuery = query.toLowerCase().trim();
  let filtered = [];

  // 1. Exact match by name
  filtered = allHospitalsData.filter(item =>
    item.name.toLowerCase() === searchQuery
  );

  // 2. If no exact, try includes in name
  if (filtered.length === 0) {
    filtered = allHospitalsData.filter(item =>
      item.name.toLowerCase().includes(searchQuery)
    );
  }

  // 3. Optional: fallback to city or type if still no match
  if (filtered.length === 0) {
    filtered = allHospitalsData.filter(item =>
      item.type?.toLowerCase() === searchQuery ||
      item.address?.city?.toLowerCase() === searchQuery
    );
  }

  renderHospitals(filtered, query);
}

// Attach event listeners to both search bars
function setupSearchBars() {
  const navbarInput = document.querySelector("#navbar-search input");
  const navbarBtn = document.querySelector("#navbar-search button");

  const heroInput = document.querySelector("#heroSearchWrapper input");
  const heroBtn = document.querySelector("#heroSearchWrapper button");

  if (navbarBtn && navbarInput) {
    navbarBtn.addEventListener("click", () => handleSearch(navbarInput.value));
  }
  if (heroBtn && heroInput) {
    heroBtn.addEventListener("click", () => handleSearch(heroInput.value));
  }
}

// On page load
window.addEventListener("DOMContentLoaded", () => {
  fetchAllHospitals();
  setupSearchBars();
  document.getElementById("hospital-list")?.scrollIntoView({ behavior: "smooth" });
});