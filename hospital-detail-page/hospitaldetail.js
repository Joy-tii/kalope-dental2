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





  async function fetchHospitals() {
    try {
      const response = await fetch("http://localhost:4000/public/list");
      const data = await response.json();
  
      const container = document.querySelector("#hospital-list");
      container.innerHTML = ''; // Clear existing content
  
      data.data.forEach(hospital => {
        const {
          name,
          type,
          address,
          registrationNumber,
          accreditation,
          yearEstablished,
          licenseNumber,
          bedCapacity,
          doctors,
          medicalEquipment,
          operationalDetails,
          ownerName
        } = hospital;
  
        const hospitalHTML = `
          <div class="max-w-6xl mx-auto rounded-sm shadow-md p-6 bg-gradient-to-br from-blue-100 to-white my-6">
            <div class="flex flex-col md:flex-row gap-8">
              <!-- Hospital Image -->
              <div class="w-full md:w-1/4 relative">
                <img src="./../assets/hospital-placeholder.jpg" alt="${name}" class="rounded-sm object-contain md:object-cover object-center w-full h-60 md:h-72 border" />
                <div class="bg-blue-900 text-white text-center text-sm font-medium py-2 mt-2 rounded-sm">
                  ${bedCapacity} Beds • ${doctors.length} Doctors
                </div>
              </div>
  
              <!-- Hospital Info -->
              <div class="w-full md:w-3/4 flex flex-col justify-between">
                <div class="space-y-4">
                  <h2 class="text-2xl font-bold text-blue-900">${name}</h2>
                  <p class="text-base font-medium">${type.charAt(0).toUpperCase() + type.slice(1)} Hospital</p>
                  <p class="text-base text-gray-700">Located in
                    <span class="font-semibold text-blue-800">${address.city}, ${address.state}</span>
                  </p>
  
                  <!-- Details Grid -->
                  <div class="grid md:grid-cols-2 gap-8 mt-4">
                    <div class="space-y-2">
                      <p><span class="font-semibold text-blue-700">Registration No.:</span> ${registrationNumber}</p>
                      <p><span class="font-semibold text-blue-700">Accreditation:</span> ${accreditation.join(", ")}</p>
                      <p><span class="font-semibold text-blue-700">Established:</span> ${yearEstablished}</p>
                      <p><span class="font-semibold text-blue-700">License No.:</span> ${licenseNumber}</p>
                    </div>
                    <div class="space-y-2">
                      <p><span class="font-semibold text-blue-800">Mon - Sat:</span> ${operationalDetails.openTime} – ${operationalDetails.closeTime}</p>
                      <p><span class="font-semibold text-blue-700">Emergency:</span>
                        <span class="text-green-700 font-semibold">${operationalDetails.emergencyAvailable ? "24x7 Available" : "Not Available"}</span>
                      </p>
                      <p><span class="font-semibold text-blue-700">Medical Equipment:</span> ${medicalEquipment.length > 0 ? medicalEquipment.join(", ") : "N/A"}</p>
                      <p><span class="font-semibold text-blue-700">Bed Capacity:</span> ${bedCapacity}</p>
                    </div>
                  </div>
                </div>
  
                <div class="pt-4 flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center md:items-start mt-6">
                  <button class="w-48 px-5 py-2 text-sm font-semibold text-white rounded-sm shadow-md bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
                    <i class="fas fa-phone text-white"></i> <span>Call Now</span>
                  </button>
                  <button class="w-48 bg-white border border-blue-700 text-blue-700 px-4 py-2 rounded-sm hover:bg-blue-50 transition text-sm font-medium flex items-center justify-center space-x-2">
                    <i class="fas fa-calendar-alt text-blue-700"></i> <span>Book Appointment</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        `;
  
        container.innerHTML += hospitalHTML;
      });
  
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    }
  }
  
  // Call the function when the page loads
  document.addEventListener("DOMContentLoaded", fetchHospitals);