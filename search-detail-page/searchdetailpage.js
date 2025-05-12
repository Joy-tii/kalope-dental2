const menu = document.getElementById('mobile-menu');
    const openBtn = document.getElementById('hamburger-btn');
    const closeBtn = document.getElementById('close-menu');

    // Toggle menu
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


    window.addEventListener("scroll", function () {
    const heroSearch = document.querySelector(".hero-search-wrapper");
    const navbarSearch = document.getElementById("navbar-search");
    const heroBottom = heroSearch.getBoundingClientRect().bottom;

    if (heroBottom < 80) {
      navbarSearch.classList.remove("opacity-0", "translate-y-[-10px]");
      navbarSearch.classList.add("opacity-100", "translate-y-0");
    } else {
      navbarSearch.classList.remove("opacity-100", "translate-y-0");
      navbarSearch.classList.add("opacity-0", "translate-y-[-10px]");
    }
  });

  window.addEventListener("scroll", () => {
    const heroSearch = document.getElementById("heroSearchWrapper");
    const navbarSearch = document.getElementById("navbar-search");
    const filterBar = document.getElementById("filterBar");
  
    const heroBottom = heroSearch.getBoundingClientRect().bottom;
  
    // Toggle navbar search visibility based on scroll
    if (heroBottom < 80) {
      navbarSearch.classList.remove("opacity-0", "translate-y-[-10px]");
      navbarSearch.classList.add("opacity-100", "translate-y-0");
    } else {
      navbarSearch.classList.remove("opacity-100", "translate-y-0");
      navbarSearch.classList.add("opacity-0", "translate-y-[-10px]");
    }
  
    // Sticky filter bar: Fix it below navbar when scrolling past hero
    if (heroBottom <= 80) {
      filterBar.classList.add("fixed", "top-[80px]", "left-0", "right-0", "z-[49]", "shadow-md", "bg-[#325078]");
      filterBar.classList.remove("relative", "bg-[rgba(50,80,120,0.6)]");
    } else {
      filterBar.classList.remove("fixed", "top-[80px]", "left-0", "right-0", "z-[49]", "shadow-md", "bg-[#325078]");
      filterBar.classList.add("relative", "bg-[rgba(50,80,120,0.6)]");
    }
  });
  




  const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    hamburgerBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });