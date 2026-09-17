//////////////////////////////////////////////////////////
//                                                      //
//      DON'T EDIT ANYTHING - STRONGLY PROHIBITED       //
//                                                      //
//////////////////////////////////////////////////////////

// URL Core Directory 
const coreUrl = window.location.hostname === 'mrdeveloperjis.github.io' ? `/qr-bar/` : `/`;

//////////////////////////////////////////////////////////

document.getElementById('home-page').href = coreUrl;

//////////////////////////////////////////////////////////

// Function to create buttons from the buttons array with categories
function createButtons() {
    const container = document.getElementById('button-container');
    const categories = {};

    // Organize buttons by category
    buttons.forEach(button => {
        if (button.hidden) return; // Skip hidden buttons
        if (!categories[button.category]) {
            categories[button.category] = [];
        }
        categories[button.category].push(button);
    });

    // Create sections for each category
    for (const category in categories) {
        const categorySection = document.createElement('section');
        categorySection.className = 'category-section';

        const categoryTitle = document.createElement('h2');
        categoryTitle.textContent = category;
        categoryTitle.className = 'category-title';
        categorySection.appendChild(categoryTitle);

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'category-button-container';

        categories[category].forEach(button => {
            const btn = document.createElement('a');
            btn.href = coreUrl + "apps/" + button.url;
            btn.className = 'button-item';
            btn.setAttribute('aria-label', button.label);
            if (button.target) {
                btn.target = button.target;
                btn.setAttribute('rel', 'noopener noreferrer');
            }
            const label = document.createElement('span');
            label.textContent = button.label;
            btn.appendChild(label);
            buttonContainer.appendChild(btn);
        });

        categorySection.appendChild(buttonContainer);
        container.appendChild(categorySection);
    }
}

// Initialize buttons on page load
document.addEventListener('DOMContentLoaded', createButtons);

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

// Off-canvas sliding navbar functionality
const toggleBtn = document.getElementById('toggle-btn');
const nav = document.querySelector('nav');
const hamburger = document.querySelector('.hamburger')
const container = document.querySelector('#button-container');

function getResponsiveWidth() {
    const minWidth = 200;
    const maxWidth = 248
    return `clamp(${minWidth}px, 40dvw, ${maxWidth}px)`;
}

// Toggle button 
toggleBtn.addEventListener('change', function () {
    if (this.checked) {
        nav.style.height = '100dvh';
        nav.style.width = getResponsiveWidth();
        nav.style.overflow = 'auto';
        nav.style.backgroundColor = '#0c0c0c';
        hamburger.style.backgroundColor = '#0c0c0c';
        hamburger.style.height = '50px';
        container.style.display = 'initial';
    } else {
        closeHeader();
    }
});

// Close the nav and reset toggle
function closeHeader() {
    toggleBtn.checked = false;
    nav.style.height = '50px';
    nav.style.width = '45px';
    nav.style.overflow = 'hidden';
    setTimeout(() => {
        nav.style.backgroundColor = 'transparent';
        hamburger.style.backgroundColor = 'transparent';
        container.style.display = 'none';
    }, 250);
}

// Close nav on outside & button click
document.addEventListener('click', function (event) {
    if (!nav.contains(event.target) && toggleBtn.checked) {
        closeHeader();
    }
});

document.getElementById('button-container').addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {
        closeHeader();
    }
});

// copyright year auto update
setInterval(function () {
    var clock = new Date();
    var Year = clock.getFullYear();
    document.querySelector("#copyright").innerHTML = "&copy; " + Year + " - Mr. JIS";
}, 1000)
