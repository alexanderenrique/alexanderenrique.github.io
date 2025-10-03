// Main JavaScript for Denton Works blog

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isOpen = navMenu.classList.contains('nav__menu--open');
            navMenu.classList.toggle('nav__menu--open');
            navToggle.setAttribute('aria-expanded', !isOpen);
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('nav__menu--open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('nav__menu--open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Images will be handled by the Intersection Observer below
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Search functionality (if search input exists)
    const searchInput = document.querySelector('.search__input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            const cards = document.querySelectorAll('.card');
            
            cards.forEach(card => {
                const text = card.textContent.toLowerCase();
                if (text.includes(query)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Add copy button to code blocks
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach(block => {
        const pre = block.parentElement;
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.textContent = 'Copy';
        button.style.cssText = `
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            background: var(--color-primary);
            color: white;
            border: none;
            padding: 0.25rem 0.5rem;
            border-radius: 0.25rem;
            cursor: pointer;
            font-size: 0.75rem;
        `;
        
        pre.style.position = 'relative';
        pre.appendChild(button);
        
        button.addEventListener('click', function() {
            navigator.clipboard.writeText(block.textContent).then(() => {
                button.textContent = 'Copied!';
                setTimeout(() => {
                    button.textContent = 'Copy';
                }, 2000);
            });
        });
    });
    
    // No fade animations - elements appear immediately
    
    // Tag System
    initializeTagSystem();
    
});

// Tag System Functions
function initializeTagSystem() {
    // Generate tag cloud
    generateTagCloud();
    
    // Generate related content
    generateRelatedContent();
    
    // Generate backlinks
    generateBacklinks();
    
    // Initialize tag filtering
    initializeTagFiltering();
}

function generateTagCloud() {
    const tagCloud = document.querySelector('.tag-cloud');
    if (!tagCloud) return;
    
    // Get all tags from the current page
    const currentTags = getCurrentPageTags();
    const allTags = getAllTags();
    
    // Create tag cloud
    allTags.forEach(tag => {
        const tagElement = document.createElement('a');
        
        // Only link to tags that have pages
        if (tag.hasPage) {
            tagElement.href = `/tags/${tag.name}`;
        } else {
            tagElement.href = '#';
            tagElement.addEventListener('click', function(e) {
                e.preventDefault();
                // Could show a tooltip or search results instead
                console.log(`Tag "${tag.name}" doesn't have a dedicated page yet`);
            });
        }
        
        tagElement.className = `tag ${getTagSizeClass(tag.count)}`;
        tagElement.textContent = tag.name;
        tagElement.title = `${tag.count} pages${tag.hasPage ? '' : ' (no dedicated page yet)'}`;
        
        // Highlight if current page has this tag
        if (currentTags.includes(tag.name)) {
            tagElement.classList.add('tag--related');
        }
        
        tagCloud.appendChild(tagElement);
    });
}

function generateRelatedContent() {
    const relatedContent = document.querySelector('.related-content');
    if (!relatedContent) return;
    
    const currentTags = getCurrentPageTags();
    const relatedPages = getRelatedPages(currentTags);
    
    if (relatedPages.length === 0) return;
    
    const relatedGrid = document.createElement('div');
    relatedGrid.className = 'related-grid';
    
    relatedPages.forEach(page => {
        const card = document.createElement('a');
        card.href = page.url;
        card.className = 'related-card';
        
        const sharedTags = page.tags.filter(tag => currentTags.includes(tag));
        
        card.innerHTML = `
            <h4>${page.title}</h4>
            <p>Shared tags: ${sharedTags.map(tag => `#${tag}`).join(' ')}</p>
        `;
        
        relatedGrid.appendChild(card);
    });
    
    relatedContent.appendChild(relatedGrid);
}

function generateBacklinks() {
    const backlinks = document.querySelector('.backlinks');
    if (!backlinks) return;
    
    const currentTags = getCurrentPageTags();
    const linkingPages = getLinkingPages(currentTags);
    
    if (linkingPages.length === 0) return;
    
    const backlinksList = document.createElement('ul');
    
    linkingPages.forEach(page => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = page.url;
        a.textContent = page.title;
        li.appendChild(a);
        backlinksList.appendChild(li);
    });
    
    backlinks.appendChild(backlinksList);
}

function initializeTagFiltering() {
    const tagFilters = document.querySelectorAll('.tag-filter');
    tagFilters.forEach(filter => {
        filter.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all filters
            tagFilters.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked filter
            this.classList.add('active');
            
            // Filter content based on tag
            const tag = this.textContent.trim();
            filterContentByTag(tag);
        });
    });
}

function filterContentByTag(tag) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const cardTags = getCardTags(card);
        if (tag === 'All' || cardTags.includes(tag.toLowerCase())) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Helper functions
function getCurrentPageTags() {
    // This would need to be populated by the build system
    // For now, we'll extract from meta tags or data attributes
    const metaTags = document.querySelector('meta[name="tags"]');
    if (metaTags) {
        return metaTags.content.split(',').map(tag => tag.trim());
    }
    return [];
}

function getAllTags() {
    // This would be populated by the build system
    // For now, return a static list with actual tag pages
    return [
        { name: 'thunderbird', count: 3, hasPage: true },
        { name: 'electronics', count: 2, hasPage: true },
        { name: '3d-printing', count: 2, hasPage: true },
        { name: 'restoration', count: 2, hasPage: true },
        { name: 'nemo', count: 4, hasPage: true },
        { name: 'lab-management', count: 4, hasPage: false },
        { name: 'ai', count: 2, hasPage: true },
        { name: 'automation', count: 3, hasPage: true },
        { name: 'esp32', count: 2, hasPage: true },
        { name: 'classic-car', count: 2, hasPage: false }
    ];
}

function getRelatedPages(currentTags) {
    // This would be populated by the build system
    // For now, return a static list
    return [
        {
            title: 'Smart Thunderbird Electronics',
            url: '/microelectronics/Smart-T-Bird/',
            tags: ['electronics', 'thunderbird', 'esp32', 'can-bus']
        },
        {
            title: '3D Models & STL Files',
            url: '/wrenching/3d-models/',
            tags: ['3d-printing', 'thunderbird', 'automotive']
        }
    ].filter(page => 
        page.tags.some(tag => currentTags.includes(tag))
    );
}

function getLinkingPages(currentTags) {
    // This would be populated by the build system
    return [
        {
            title: 'Smart Thunderbird Electronics',
            url: '/microelectronics/Smart-T-Bird/'
        }
    ];
}

function getTagSizeClass(count) {
    if (count >= 5) return 'tag--large';
    if (count >= 3) return 'tag--medium';
    return 'tag--small';
}

function getCardTags(card) {
    const tagElements = card.querySelectorAll('.tag');
    return Array.from(tagElements).map(tag => tag.textContent.trim().toLowerCase());
}

