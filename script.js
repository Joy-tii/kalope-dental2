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

  document.getElementById("searchButton").addEventListener("click", () => {
    const query = document.getElementById("searchInput").value.trim();
    if (query) {
      const encodedQuery = encodeURIComponent(query);
      // Redirect to the results page with the search query
      window.location.href = `./searchpage/searchpage.html?search=${encodedQuery}`;
    }
  });
  