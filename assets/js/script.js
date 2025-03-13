//////////////////////////////////////////////////////////
//                                                      //
//      DON'T EDIT ANYTHING - STRONGLY PROHIBITED       //
//                                                      //
//////////////////////////////////////////////////////////

// URL Core Directory 
const coreUrl = window.location.hostname === 'mrdeveloperjis.github.io' ? `/qr-bar/` : `/`;

//////////////////////////////////////////////////////////

// Function to create buttons from the buttons array with categories
function createButtons() {
    const container = document.getElementById('button-container');
    const categories = {};

    // Organize buttons by category
    buttons.forEach(button => {
        // Skip hidden buttons
        if (button.hidden) {
            return; // Skip this button if it's hidden
        }

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
            btn.id = button.id;
            btn.setAttribute('aria-label', button.label);

            // Set target _blank if exists
            if (button.target) {
                btn.target = button.target;
                btn.setAttribute('rel', 'noopener noreferrer');
            }

            // Create image element for button
            const img = document.createElement('img');
            img.src = coreUrl + "assets/img/" + button.img;
            img.alt = `${button.label} Image`;

            // Create label for button
            const label = document.createElement('span');
            label.textContent = button.label;

            // Append image and label to button
            btn.appendChild(img);
            btn.appendChild(label);

            // Add button to button container
            buttonContainer.appendChild(btn);
        });


        // Append button container and category section to main container
        categorySection.appendChild(buttonContainer);
        container.appendChild(categorySection);
    }
}

// Initialize buttons on page load
document.addEventListener('DOMContentLoaded', () => {
    createButtons();
});

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

// copyright year auto update
setInterval(function () {
    var clock = new Date();
    var Year = clock.getFullYear();
    document.querySelector("#copyright").innerHTML = "&copy; " + Year + " - Mr. JIS";
}, 1000)
