let deleteButtons = document.querySelectorAll(".deleteBtn");
deleteButtons.forEach(function(button) {
  button.addEventListener("click", function() {
      console.log("Delete button clicked"); // Add this line to check if the event listener is triggered
      deleteItem(this);
  });
});

// Function to delete an item
function deleteItem(button) {
    let parentDiv = button.closest(".lebensmittel");
    let itemId = parentDiv.getAttribute("data-item-id");

    // Send an AJAX request to delete the item
    fetch(`/deleteItem/${itemId}`, {
        method: "DELETE",
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            parentDiv.remove(); // Remove the item from the DOM
        } else {
            alert("Failed to delete item from the database.");
        }
    })
    .catch(error => {
        console.error("Error deleting item:", error);
        alert("An error occurred while deleting the item.");
    });
}

// Function to undo the last deleted action
function undoAction() {
    if (changes.length > 0) {
        let lastDeletedItem = changes.pop();
        redoChanges.push(lastDeletedItem);
        document.querySelector("main").appendChild(lastDeletedItem.element);
    }
}

// Function to redo the last deleted action
function redoAction() {
    if (redoChanges.length > 0) {
        let lastRedoItem = redoChanges.pop();
        changes.push(lastRedoItem);
        lastRedoItem.element.remove();
    }
}

document.getElementById("undoButton").addEventListener("click", undoAction);
document.getElementById("redoButton").addEventListener("click", redoAction);