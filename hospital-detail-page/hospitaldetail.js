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
      "./../assest/apollo-hospital.jpeg",
      "./../assest/Healing Touch Multispeciality Hospital.webp",
      "./../assest/apollo-hospital.jpeg",
      "./../assest/doctor1.jpeg",
      "./../assest/doctor2.jpeg",
      "./../assest/doctor3.jpeg",
      "../assest/Ophthalmology.jpeg",
      "../assest/Dermatology.jpeg",
      "../assest/Pediatrics.jpeg",
      "../assest/Orthopedics.jpeg",
      "./../assest/Cardiology.jpeg",
      "../assest/Neurology.jpeg"
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