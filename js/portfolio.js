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
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const modal = document.querySelector('.portfolio-modal');
    let currentCategory = 'all';
    let currentItemIndex = 0;
    
    // Create portfolio items
    function renderPortfolioItems(category) {
        // Clear grid
        if (portfolioGrid) portfolioGrid.innerHTML = '';
        
        // Filter and create items
        const filteredItems = category === 'all' 
            ? portfolioItems 
            : portfolioItems.filter(item => item.category === category);
        
        if (filteredItems.length === 0) {
            portfolioGrid.innerHTML = '<p class="no-items">No items to display in this category</p>';
            return;
        }
        
        filteredItems.forEach(item => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = 'portfolio-item';
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
            portfolioItem.addEventListener('mousemove', handleHover3D);
            portfolioItem.addEventListener('mouseleave', resetHover3D);
            
            // Open modal on click
            portfolioItem.addEventListener('click', () => {
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
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    }
    
    // Animate portfolio items entry
    function animatePortfolioItems() {
        gsap.from('.portfolio-item', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out"
        });
    }
    
    // Filter functionality
    if (filterButtons) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Get category and render items
                const category = btn.getAttribute('data-filter');
                currentCategory = category;
                renderPortfolioItems(category);
            });
        });
    }
    
    // Modal functionality
    function openModal(itemId) {
        if (!modal) return;
        
        const item = portfolioItems.find(i => i.id === parseInt(itemId));
        if (!item) return;
        
        // Set current item index for navigation
        currentItemIndex = portfolioItems.indexOf(item);
        
        // Update modal content
        const modalImage = modal.querySelector('.modal-image');
        const modalTitle = modal.querySelector('.modal-title');
        const modalDesc = modal.querySelector('.modal-description');
        const modalCategory = modal.querySelector('.modal-category');
        const modalDate = modal.querySelector('.modal-date');
        
        if (modalImage) modalImage.src = item.image;
        if (modalTitle) modalTitle.textContent = item.title;
        if (modalDesc) modalDesc.textContent = item.description;
        if (modalCategory) modalCategory.textContent = `Category: ${item.category}`;
        if (modalDate) modalDate.textContent = `Created: ${item.date}`;
        
        // Show modal with animation
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close modal
    const closeModal = modal ? modal.querySelector('.close-modal') : null;
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Modal navigation
    const prevButton = modal ? modal.querySelector('.modal-prev') : null;
    const nextButton = modal ? modal.querySelector('.modal-next') : null;
    
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            navigateModal('prev');
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            navigateModal('next');
        });
    }
    
    function navigateModal(direction) {
        let filteredItems = currentCategory === 'all' 
            ? portfolioItems 
            : portfolioItems.filter(item => item.category === currentCategory);
        
        let newIndex;
        if (direction === 'next') {
            newIndex = (currentItemIndex + 1) % filteredItems.length;
        } else {
            newIndex = currentItemIndex - 1 < 0 ? filteredItems.length - 1 : currentItemIndex - 1;
        }
        
        const newItem = filteredItems[newIndex];
        currentItemIndex = portfolioItems.indexOf(newItem);
        
        // Update modal with animation
        const modalContent = modal.querySelector('.modal-content');
        
        gsap.to(modalContent, {
            opacity: 0,
            y: direction === 'next' ? -20 : 20,
            duration: 0.3,
            onComplete: () => {
                // Update content
                const modalImage = modal.querySelector('.modal-image');
                const modalTitle = modal.querySelector('.modal-title');
                const modalDesc = modal.querySelector('.modal-description');
                const modalCategory = modal.querySelector('.modal-category');
                const modalDate = modal.querySelector('.modal-date');
                
                if (modalImage) modalImage.src = newItem.image;
                if (modalTitle) modalTitle.textContent = newItem.title;
                if (modalDesc) modalDesc.textContent = newItem.description;
                if (modalCategory) modalCategory.textContent = `Category: ${newItem.category}`;
                if (modalDate) modalDate.textContent = `Created: ${newItem.date}`;
                
                // Show with animation
                gsap.to(modalContent, {
                    opacity: 1,
                    y: 0,
                    duration: 0.3
                });
            }
        });
    }
    
    // Initialize portfolio with all items
    renderPortfolioItems('all');
}
