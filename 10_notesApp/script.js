const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");


function showNotes(){
    notesContainer.innerHTML = localStorage.getItem("notes") || ""; // Load saved notes or empty string

    // Re-select notes and restore event listeners
    notes = document.querySelectorAll(".input-box");
    notes.forEach(nt => {
        nt.onkeyup = function() {
            updateStorage();
        };
    });
}

// Function to update storage with current notes
function updateStorage(){
    localStorage.setItem("notes", notesContainer.innerHTML);
}

// Create a new note when button is clicked
createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");

    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "images/delete2.png";

    // Add event listener to update storage when typing
    inputBox.onkeyup = function() {
        updateStorage();
    };

    notesContainer.appendChild(inputBox).appendChild(img);
    updateStorage(); // Save notes when a new one is created
});

// Delete a note when clicking the delete button
notesContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
    }
});

// Call showNotes on page load to restore saved notes
showNotes();
