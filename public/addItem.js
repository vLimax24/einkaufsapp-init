// Get all dropdown toggle elements
var dropdownToggles = document.querySelectorAll('.dropdown-toggle');
// Add click event listener to each dropdown toggle element
dropdownToggles.forEach(function(toggle) {
    toggle.addEventListener('click', function() {
        var dropdown = this.parentNode;
        dropdown.classList.toggle('open');
    });
});

// Open the fancy popup with form when a span is clicked
var specificFoods = document.getElementsByClassName("specificFood");
for (var i = 0; i < specificFoods.length; i++) {
    specificFoods[i].addEventListener("click", openFancyPopup);
}

// Function to open the fancy popup
function openFancyPopup(event) {
    var foodName = this.textContent;
    // Close the dropdown
    var dropdown = this.closest('.dropdown');
    dropdown.classList.remove('open');
    // Get elements of the popup
    var popupContainer = document.querySelector('.popup-container');
    var popupHeading = popupContainer.querySelector('.popup-heading');
    var valueInput = popupContainer.querySelector('#value');
    var piecesInput = popupContainer.querySelector('#pieces');
    var unitSelect = popupContainer.querySelector('#unit');
    // Set popup heading
    popupHeading.textContent = foodName;
    // Clear input fields
    valueInput.value = '';
    piecesInput.value = '';
    unitSelect.value = 'ml';
    // Show the popup container
    popupContainer.style.display = 'block';
    let overlay = document.getElementById('overlay');
    overlay.style.display = 'block';
    // Prevent event bubbling to the document click listener
    event.stopPropagation();
}

// Close the popup when clicking outside
document.addEventListener('click', function(event) {
    var popupContainer = document.querySelector('.popup-container');
    var overlay = document.getElementById('overlay');
    if (popupContainer && !popupContainer.contains(event.target)) {
        popupContainer.style.display = 'none';
        overlay.style.display = 'none'; // Hide the overlay
    }
});

// ... existing code ...

// Handle "Add to Shopping List" button click
var addButton = document.querySelector('#add-button');
addButton.addEventListener('click', function(event) {
    event.preventDefault();
    // Get values from input fields
    var foodName = document.querySelector('.popup-heading').textContent;
    var value = document.querySelector('#value').value;
    var pieces = document.querySelector('#pieces').value;
    var unit = document.querySelector('#unit').value;

    // Send a POST request to the server
    fetch('/addItem', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `title=${foodName}&value=${value}&unit=${unit}&pieces=${pieces}`
    })
    .then(response => {
        if (response.ok) {
            console.log('Item added to shopping list');
            // Close the popup
            var popupContainer = document.querySelector('.popup-container');
            var overlay = document.getElementById('overlay');
            popupContainer.style.display = 'none';
            overlay.style.display = 'none'; // Hide the overlay
        } else {
            console.log('Error adding item to shopping list');
        }
    })
    .catch(error => {
        console.error(error);
    });
});


// Close the popup when clicking outside
document.addEventListener('click', function(event) {
  var popupContainer = document.querySelector('.popup-container');
  var overlay = document.getElementById('overlay');
  if (popupContainer && !popupContainer.contains(event.target)) {
    popupContainer.style.display = 'none';
    overlay.style.display = 'none'; // Hide the overlay
  }
});

// ... existing code ...
// Handle "Back" button click
var backButton = document.querySelector('#back-button');
backButton.addEventListener('click', function(event) {
    event.preventDefault();
    // Close the popup
    var popupContainer = document.querySelector('.popup-container');
    var overlay = document.getElementById('overlay');
    popupContainer.style.display = 'none';
    overlay.style.display = 'none'; // Hide the overlay
});