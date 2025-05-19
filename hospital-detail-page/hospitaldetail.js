document.addEventListener("DOMContentLoaded", function () {
    // Mobile menu toggle
    const menu = document.getElementById('mobile-menu');
    const openBtn = document.getElementById('hamburger-btn');
    const closeBtn = document.getElementById('close-menu');

    function toggleMenu() {
      if (menu.classList.contains('translate-x-full')) {
        menu.classList.remove('translate-x-full', 'hidden');
      } else {
        menu.classList.add('translate-x-full');
        setTimeout(() => menu.classList.add('hidden'), 300);
      }
    }

    if (openBtn) openBtn.addEventListener('click', toggleMenu);
    if (closeBtn) closeBtn.addEventListener('click', toggleMenu);

    // Scroll-based navbar search & filter bar animation
    window.addEventListener("scroll", () => {
      const heroSearch = document.getElementById("heroSearchWrapper") || document.querySelector(".hero-search-wrapper");
      const navbarSearch = document.getElementById("navbar-search");
      const filterBar = document.getElementById("filterBar");

      if (heroSearch && navbarSearch) {
        const heroBottom = heroSearch.getBoundingClientRect().bottom;

        if (heroBottom < 80) {
          navbarSearch.classList.remove("opacity-0", "translate-y-[-10px]");
          navbarSearch.classList.add("opacity-100", "translate-y-0");
        } else {
          navbarSearch.classList.remove("opacity-100", "translate-y-0");
          navbarSearch.classList.add("opacity-0", "translate-y-[-10px]");
        }

        if (filterBar) {
          if (heroBottom <= 80) {
            filterBar.classList.add("fixed", "top-[80px]", "left-0", "right-0", "z-[49]", "shadow-md", "bg-[#325078]");
            filterBar.classList.remove("relative", "bg-[rgba(50,80,120,0.6)]");
          } else {
            filterBar.classList.remove("fixed", "top-[80px]", "left-0", "right-0", "z-[49]", "shadow-md", "bg-[#325078]");
            filterBar.classList.add("relative", "bg-[rgba(50,80,120,0.6)]");
          }
        }
      }
    });

    // Image modal functionality
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalContent = document.getElementById('modalContent');

    const imageSources = [
      "./../assets/apollo-hospital.jpeg",
      "./../assets/Healing Touch Multispeciality Hospital.webp",
      "./../assets/apollo-hospital.jpeg",
      "./../assets/doctor1.jpeg",
      "./../assets/doctor2.jpeg",
      "./../assets/doctor3.jpeg",
      "../assets/Ophthalmology.jpeg",
      "../assets/Dermatology.jpeg",
      "../assets/Pediatrics.jpeg",
      "../assets/Orthopedics.jpeg",
      "./../assets/Cardiology.jpeg",
      "../assets/Neurology.jpeg"
    ];

    let currentIndex = 0;

    window.openModal = function (index) {
      currentIndex = index;
      if (modalImage && imageModal) {
        modalImage.src = imageSources[currentIndex];
        imageModal.classList.remove('hidden');
        imageModal.classList.add('flex');
        document.body.style.overflow = 'hidden';
      }
    };

    window.closeModal = function () {
      if (imageModal) {
        imageModal.classList.add('hidden');
        imageModal.classList.remove('flex');
        document.body.style.overflow = '';
      }
    };

    window.nextImage = function () {
      currentIndex = (currentIndex + 1) % imageSources.length;
      if (modalImage) modalImage.src = imageSources[currentIndex];
    };

    window.prevImage = function () {
      currentIndex = (currentIndex - 1 + imageSources.length) % imageSources.length;
      if (modalImage) modalImage.src = imageSources[currentIndex];
    };

    // 👇 Add click-outside-to-close logic
    if (imageModal && modalContent) {
      imageModal.addEventListener('click', function (e) {
        if (!modalContent.contains(e.target)) {
          closeModal();
        }
      });
    }

    // 👇 Dynamic "+X More" count logic
    // 👇 Responsive "+X More" count logic
function updateMoreImageCount() {
    const thumbnailImages = document.querySelectorAll('[onclick^="openModal"]');
    const moreImageCountEl = document.getElementById('moreImageCount');
    const moreImagesContainer = document.getElementById('moreImagesContainer');
  
    let visibleCount = 0;
  
    thumbnailImages.forEach((img) => {
      const style = window.getComputedStyle(img);
      if (style.display !== 'none' && style.visibility !== 'hidden' && img.offsetParent !== null) {
        visibleCount++;
      }
    });
  
    const remainingCount = imageSources.length - visibleCount;
  
    if (moreImageCountEl && remainingCount > 0) {
      moreImageCountEl.textContent = `+${remainingCount} More`;
      moreImagesContainer.style.display = 'flex';
    } else if (moreImagesContainer) {
      moreImagesContainer.style.display = 'none';
    }
  }
  
  // Call it once on load
  updateMoreImageCount();
  
  // Also re-calculate on window resize (for responsiveness)
  window.addEventListener('resize', updateMoreImageCount);
  
  });





 // STEP 1: Get hospital ID from query parameter
function getHospitalIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function getHospitaltypeFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("type");
}
// STEP 2: Fetch hospital by ID from your API
async function fetchHospitalById(id,type) {
  const container = document.getElementById("hospital-list");
  container.innerHTML = "<p>Loading hospital details...</p>";

  try {
    console.log("Hospital ID from URL:", id); // ✅
  const res = await fetch(`https://backend.kalopedental.com/public/list/${id}?type=${type}`);
    // const res = await fetch(`http://localhost:5000/public/list/${id}?type=${type}`);
    const result = await res.json();
    console.log("API response:", result); // ✅

    const { success, data } = result;

    if (success && data) {
      // STEP 3: Render hospital details
      renderHospitalDetails(data);
    } else {
      container.innerHTML = "<p>Hospital not found.</p>";
    }
  } catch (error) {
    console.error("Error fetching hospital:", error);
    container.innerHTML = "<p>Something went wrong while fetching hospital details.</p>";
  }
}

// STEP 3: Render hospital details
function renderHospitalDetails(hospital) {
  const container = document.getElementById("hospital-list");

  const {
    name,
    address,
    contact,
    servicesOffered,
    operationalDetails,
    media,
    images,
    doctors,
    registrationNumber,
    accreditation,
    yearEstablished,
    licenseNumber,
    medicalEquipment,
    bedCapacity
  } = hospital;

  const doctorCount = doctors?.length || 0;
  const firstDoctor = doctors?.[0];
  const doctorInfo = firstDoctor
    ? `
    <div class="mt-4">
      <h4 class="text-lg font-semibold text-blue-700">Doctor: ${firstDoctor.personalInfo?.username || "N/A"}</h4>
      <p>Email: ${firstDoctor.personalInfo?.email || "N/A"}</p>
      <img src="${firstDoctor.image}" alt="Doctor Image" class="w-24 h-24 rounded-full mt-2 border object-cover" />
    </div>`
    : "<p class='mt-4 text-sm text-gray-500'>No doctors listed.</p>";

  const serviceList = servicesOffered?.length ? servicesOffered.join(", ") : "Not specified";
  const openDays = operationalDetails.openDays?.join(", ") || "Not specified";
  const emergency = operationalDetails.emergencyAvailable ? "24x7 Available" : "Not Available";

  container.innerHTML = `
    <div class="max-w-6xl mx-auto rounded-sm shadow-md p-6 bg-gradient-to-br from-blue-100 to-white">
      <div class="flex flex-col md:flex-row gap-8">

        <!-- Hospital Image -->
        <div class="w-full md:w-1/4 relative">
          <img src="${media.logo}" alt="${name}" class="rounded-sm object-contain md:object-cover object-center w-full h-60 md:h-72 border" />
          <div class="bg-blue-900 text-white text-center text-sm font-medium py-2 mt-2 rounded-sm">
            ${bedCapacity || 'N/A'} Beds • ${doctorCount} Doctors
          </div>
        </div>

        <!-- Hospital Info -->
        <div class="w-full md:w-3/4 flex flex-col justify-between">
          <div class="space-y-4">
            <h2 class="text-2xl font-bold text-blue-900">${name}</h2>
            <p class="text-base font-medium">${hospital.type || "Multi-Speciality Hospital"}</p>
            <p class="text-base text-gray-700">Located in
              <span class="font-semibold text-blue-800">${address.city || ""}, ${address.state || ""}</span>
            </p>

            <!-- Details Grid -->
            <div class="grid md:grid-cols-2 gap-8 mt-4">
              <div class="space-y-2">
                <p><span class="font-semibold text-blue-700">Registration No.:</span> ${registrationNumber || "N/A"}</p>
                <p><span class="font-semibold text-blue-700">Accreditation:</span> ${accreditation || "N/A"}</p>
                <p><span class="font-semibold text-blue-700">Established:</span> ${yearEstablished || "N/A"}</p>
                <p><span class="font-semibold text-blue-700">License No.:</span> ${licenseNumber || "N/A"}</p>
              </div>

              <div class="space-y-2">
                <p><span class="font-semibold text-blue-800">Mon - Sat:</span> ${operationalDetails.openTime} – ${operationalDetails.closeTime}</p>
                <p><span class="font-semibold text-blue-700">Emergency:</span>
                  <span class="text-green-700 font-semibold">${emergency}</span>
                </p>
                <p><span class="font-semibold text-blue-700">Medical Equipment:</span> ${medicalEquipment || "Not specified"}</p>
                <p><span class="font-semibold text-blue-700">Bed Capacity:</span> ${bedCapacity || "N/A"}</p>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="pt-4 flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center md:items-start mt-6">
            <a href="tel:${contact.phone}" class="w-48 px-5 py-2 text-sm font-semibold text-white rounded-sm shadow-md bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center space-x-2">
              <i class="fas fa-phone text-white"></i> <span>Call Now</span>
            </a>
            <button class="w-48 bg-white border border-blue-700 text-blue-700 px-4 py-2 rounded-sm hover:bg-blue-50 transition text-sm font-medium flex items-center justify-center space-x-2">
              <i class="fas fa-calendar-alt text-blue-700"></i> <span>Book Appointment</span>
            </button>
          </div>
        </div>
      </div>

     
  `;
}

// Run on page load
document.addEventListener("DOMContentLoaded", () => {
  const id = getHospitalIdFromURL();
  const type = getHospitaltypeFromURL();
  if (id && type) {
    fetchHospitalById(id,type);
  } else {
    document.getElementById("hospital-list").innerHTML = "<p>Invalid or missing hospital ID.</p>";
  }
});
