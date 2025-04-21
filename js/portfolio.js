// Portfolio data structure
const portfolioItems = [
    {
        id: 1,
        title: "Fantasy Character Design",
        description: "A detailed character design for a fantasy RPG game featuring intricate armor and weapon details.",
        category: "characters",
        image: "assets/portfolio/character1.jpg",
        date: "June 2023"
    },
    {
        id: 2,
        title: "Mystical Forest Background",
        description: "Environment design for a magical forest level with atmospheric lighting and particle effects.",
        category: "backgrounds",
        image: "assets/portfolio/background1.jpg",
        date: "May 2023"
    },
    {
        id: 3,
        title: "Game UI Dashboard",
        description: "User interface design for a space exploration game with futuristic elements and glow effects.",
        category: "ui",
        image: "assets/portfolio/ui1.jpg",
        date: "April 2023"
    },
    {
        id: 4,
        title: "Dragon Character Concept",
        description: "Multiple concept explorations for a dragon character with different color variations and poses.",
        category: "concepts",
        image: "assets/portfolio/concept1.jpg",
        date: "March 2023"
    },
    {
        id: 5,
        title: "Medieval Village Background",
        description: "Detailed medieval village environment with atmospheric lighting and detailed architecture.",
        category: "backgrounds",
        image: "assets/portfolio/background2.jpg",
        date: "February 2023"
    },
    {
        id: 6,
        title: "Skill Icons Set",
        description: "Icon set for player abilities and skills with glowing effects and distinctive silhouettes.",
        category: "icons",
        image: "assets/portfolio/icons1.jpg",
        date: "January 2023"
    },
    {
        id: 7,
        title: "Futuristic Warrior",
        description: "Character design for a sci-fi game featuring advanced armor and weapon systems.",
        category: "characters",
        image: "assets/portfolio/character2.jpg",
        date: "December 2022"
    },
    {
        id: 8,
        title: "Fantasy Creatures",
        description: "Collection of mythical creature designs with detailed anatomy and texture work.",
        category: "animals",
        image: "assets/portfolio/animal1.jpg",
        date: "November 2022"
    },
    {
        id: 9,
        title: "Game Food Items",
        description: "Set of food items for a survival crafting game with painterly style.",
        category: "food",
        image: "assets/portfolio/food1.jpg",
        date: "October 2022"
    }
];

function initPortfolio() {
  const portfolioGrid = document.querySelector(".portfolio-grid");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const modal = document.querySelector(".portfolio-modal");
  let currentCategory = "all";
  let currentItemIndex = 0;

  // Create portfolio items
  function renderPortfolioItems(category) {
    // Clear grid
    if (portfolioGrid) portfolioGrid.innerHTML = "";

    // Filter and create items
    const filteredItems =
      category === "all"
        ? portfolioItems
        : portfolioItems.filter((item) => item.category === category);

    if (filteredItems.length === 0) {
      portfolioGrid.innerHTML =
        '<p class="no-items">No items to display in this category</p>';
      return;
    }

    filteredItems.forEach((item) => {
      const portfolioItem = document.createElement("div");
      portfolioItem.className = "portfolio-item";
      portfolioItem.dataset.category = item.category;
      portfolioItem.dataset.id = item.id;

      portfolioItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="portfolio-item-info">
                    <h3>${item.title}</h3>
                    <p>${item.category}</p>
                </div>
                <div class="portfolio-item-hover">
                    <span>View Details</span>
                </div>
            `;

      // 3D hover effect
      portfolioItem.addEventListener("mousemove", handleHover3D);
      portfolioItem.addEventListener("mouseleave", resetHover3D);

      // Open modal on click
      portfolioItem.addEventListener("click", () => {
        openModal(item.id);
      });

      portfolioGrid.appendChild(portfolioItem);
    });

    // Add animation to items
    animatePortfolioItems();
  }

  // 3D hover effect
  function handleHover3D(e) {
    const item = this;
    const { left, top, width, height } = item.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const centerX = width / 2;
    const centerY = height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  }

  function resetHover3D() {
    this.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
  }

  // Enhanced animation for portfolio items
  function animatePortfolioItems() {
    // Clear previous animations
    gsap.killTweensOf(".portfolio-item");

    // Create a staggered entrance animation
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    // Reset initial state
    gsap.set(portfolioItems, {
      opacity: 0,
      y: 100,
      scale: 0.8,
      rotationY: 15,
    });

    // Create timeline for smoother sequence
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    tl.to(".portfolio-filter", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
    });

    tl.to(portfolioItems, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotationY: 0,
      stagger: {
        each: 0.1,
        from: "center",
        grid: "auto",
      },
      duration: 0.8,
      ease: "back.out(1.7)",
      onComplete: () => {
        // Add hover animations after items are loaded
        addHoverEffects();
      },
    });

    // Add particle effects to the background during animation
    createParticleEffect();
  }

  // New particle effect for the portfolio section
  function createParticleEffect() {
    const portfolioSection = document.querySelector(".portfolio-section");
    if (!portfolioSection) return;

    // Create canvas for particles
    if (!document.getElementById("portfolio-particles")) {
      const canvas = document.createElement("canvas");
      canvas.id = "portfolio-particles";
      canvas.style.position = "absolute";
      canvas.style.top = "0";
      canvas.style.left = "0";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.pointerEvents = "none";
      canvas.style.zIndex = "0";
      portfolioSection.prepend(canvas);

      const ctx = canvas.getContext("2d");
      const particles = [];

      function resizeCanvas() {
        canvas.width = portfolioSection.offsetWidth;
        canvas.height = portfolioSection.offsetHeight;
      }

      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);

      // Create particles
      for (let i = 0; i < 30; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          color: ["#6c5ce7", "#fd79a8", "#00b894"][
            Math.floor(Math.random() * 3)
          ],
          speed: Math.random() * 1 + 0.5,
          angle: Math.random() * 360,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }

      // Animate particles
      function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p) => {
          p.x += Math.cos((p.angle * Math.PI) / 180) * p.speed;
          p.y += Math.sin((p.angle * Math.PI) / 180) * p.speed;

          // Bounce off edges
          if (p.x < 0 || p.x > canvas.width) p.angle = 180 - p.angle;
          if (p.y < 0 || p.y > canvas.height) p.angle = 360 - p.angle;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color
            .replace(")", `, ${p.opacity})`)
            .replace("rgb", "rgba");
          ctx.fill();
        });

        requestAnimationFrame(animateParticles);
      }

      animateParticles();
    }
  }

  // Enhanced hover effects
  function addHoverEffects() {
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    portfolioItems.forEach((item) => {
      const img = item.querySelector("img");
      const info = item.querySelector(".portfolio-item-info");

      // Create hover timeline for each item
      const hoverTl = gsap.timeline({ paused: true });

      hoverTl.to(
        img,
        {
          scale: 1.1,
          filter: "brightness(0.8) contrast(1.2)",
          duration: 0.5,
          ease: "power2.out",
        },
        0
      );

      hoverTl.to(
        info,
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        },
        0
      );

      // Add shine effect element if not exists
      if (!item.querySelector(".shine-effect")) {
        const shineEffect = document.createElement("div");
        shineEffect.classList.add("shine-effect");
        shineEffect.style.position = "absolute";
        shineEffect.style.top = "0";
        shineEffect.style.left = "0";
        shineEffect.style.width = "100%";
        shineEffect.style.height = "100%";
        shineEffect.style.background =
          "linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)";
        shineEffect.style.transform = "translateX(-100%)";
        shineEffect.style.pointerEvents = "none";
        item.appendChild(shineEffect);

        hoverTl.to(
          shineEffect,
          {
            x: "100%",
            duration: 1,
            ease: "power2.out",
          },
          0
        );
      }

      // Handle mouse events
      item.addEventListener("mouseenter", () => hoverTl.play());
      item.addEventListener("mouseleave", () => hoverTl.reverse());

      // 3D tilt effect
      item.addEventListener("mousemove", (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        gsap.to(item, {
          rotateX: rotateX,
          rotateY: rotateY,
          transformPerspective: 1000,
          duration: 0.4,
          ease: "power1.out",
        });
      });

      item.addEventListener("mouseleave", () => {
        gsap.to(item, {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.6,
          ease: "elastic.out(1, 0.5)",
        });
      });
    });
  }

  // Enhance filter functionality with animations
  if (filterButtons) {
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Update active state
        filterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        // Add pulsing animation to the clicked button
        gsap.fromTo(
          btn,
          { scale: 0.9 },
          { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" }
        );

        // Get category and render items with enhanced animation
        const category = btn.getAttribute("data-filter");
        currentCategory = category;

        // Animate current items out before rendering new ones
        const currentItems = document.querySelectorAll(".portfolio-item");
        if (currentItems.length) {
          gsap.to(currentItems, {
            opacity: 0,
            y: -50,
            scale: 0.8,
            stagger: 0.05,
            duration: 0.3,
            onComplete: () => renderPortfolioItems(category),
          });
        } else {
          renderPortfolioItems(category);
        }
      });
    });
  }

  // Enhanced modal open animation
  function openModal(itemId) {
    if (!modal) return;

    const item = portfolioItems.find((i) => i.id === parseInt(itemId));
    if (!item) return;

    // Set current item index for navigation
    currentItemIndex = portfolioItems.indexOf(item);

    // Update modal content
    const modalImage = modal.querySelector(".modal-image");
    const modalTitle = modal.querySelector(".modal-title");
    const modalDesc = modal.querySelector(".modal-description");
    const modalCategory = modal.querySelector(".modal-category");
    const modalDate = modal.querySelector(".modal-date");

    if (modalImage) modalImage.src = item.image;
    if (modalTitle) modalTitle.textContent = item.title;
    if (modalDesc) modalDesc.textContent = item.description;
    if (modalCategory) modalCategory.textContent = `Category: ${item.category}`;
    if (modalDate) modalDate.textContent = `Created: ${item.date}`;

    // Show modal with enhanced animation
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";

    const modalContent = modal.querySelector(".modal-content");

    // Create an impressive entrance animation
    gsap.set(modal, { visibility: "visible", opacity: 0 });
    gsap.set(modalContent, {
      opacity: 0,
      y: 100,
      scale: 0.8,
      rotationX: 15,
    });

    const modalTl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    modalTl.to(modal, {
      opacity: 1,
      duration: 0.4,
    });

    modalTl.to(
      modalContent,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
      },
      "-=0.2"
    );

    // Animate image reveal
    if (modalImage) {
      gsap.fromTo(
        modalImage,
        { opacity: 0, scale: 1.2 },
        { opacity: 1, scale: 1, duration: 1, delay: 0.3, ease: "power2.out" }
      );
    }

    modal.classList.add("active");
  }

  // Handle modal navigation with smooth transitions
  function navigateModal(direction) {
    let filteredItems =
      currentCategory === "all"
        ? portfolioItems
        : portfolioItems.filter((item) => item.category === currentCategory);

    let newIndex;
    if (direction === "next") {
      newIndex = (currentItemIndex + 1) % filteredItems.length;
    } else {
      newIndex =
        currentItemIndex - 1 < 0
          ? filteredItems.length - 1
          : currentItemIndex - 1;
    }

    const newItem = filteredItems[newIndex];
    currentItemIndex = portfolioItems.indexOf(newItem);

    // Enhanced animation for modal content changes
    const modalContent = modal.querySelector(".modal-content");
    const modalImage = modal.querySelector(".modal-image");
    const modalInfo = modal.querySelector(".modal-info");

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
    });

    // Animate current content out
    tl.to([modalImage, modalInfo], {
      opacity: 0,
      x: direction === "next" ? -30 : 30,
      duration: 0.3,
      stagger: 0.1,
    });

    tl.call(() => {
      // Update modal content here with the new item data
      if (modalImage) modalImage.src = newItem.image;
      if (modalInfo) {
        const modalTitle = modal.querySelector(".modal-title");
        const modalDesc = modal.querySelector(".modal-description");
        const modalCategory = modal.querySelector(".modal-category");
        const modalDate = modal.querySelector(".modal-date");

        if (modalTitle) modalTitle.textContent = newItem.title;
        if (modalDesc) modalDesc.textContent = newItem.description;
        if (modalCategory)
          modalCategory.textContent = `Category: ${newItem.category}`;
        if (modalDate) modalDate.textContent = `Created: ${newItem.date}`;
      }

      // Reset position for new content
      gsap.set([modalImage, modalInfo], {
        x: direction === "next" ? 30 : -30,
      });
    });

    // Animate new content in
    tl.to([modalImage, modalInfo], {
      opacity: 1,
      x: 0,
      duration: 0.4,
      stagger: 0.1,
    });
  }

  // Initialize portfolio with all items
  renderPortfolioItems("all");
}
