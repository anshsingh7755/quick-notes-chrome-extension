// Targeting DOM Elements

let notesForm = document.getElementById("notesForm"),
notesInput = document.getElementById("notes-input"),
addNotesBtn = document.getElementById("add-note"),
notesHeading = document.getElementById("notes-heading"),
notesContainer = document.getElementById("notes-container"),
singleNoteEditBtn = document.getElementById("edit-btn"),
singleNoteDeleteBtn = document.getElementById("delete-btn"),
clearNotes= document.getElementById("clear-notes");

let symbols, color;

// Notes Storing Array
let notes = [];

// Making Functions
let inputClear = () => {
    notesInput.value = "";
}

let copyNote = (text) => {
    navigator.clipboard.writeText(text.innerHTML);
    let temp = text.innerHTML;
    text.innerHTML = "Copied"
    setTimeout(() => {text.innerHTML = temp}, 1000);
    
}

let createNote = () => {
    notesContainer.innerHTML = "";

    notes.map((singleNote, Elementindex) => {
        return(
            notesContainer.innerHTML += `
            <div class="singleNote" id="${Elementindex}">
                <p>${singleNote}</p>
                <div class="controls">
                    <div class="edit" id="edit-btn">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </div>
                    <div class="delete" id="delete-btn">
                        <i class="fa-solid fa-trash"></i>
                    </div>
                </div>
            </div>`
        )
    });

    if(notesContainer.innerHTML == ""){
        return
    } else{
        notesHeading.classList.remove("hide");
    }

    
    // Getting the note content to copy it to clipboard
    document.querySelectorAll(".singleNote").forEach(currentNote => {
        currentNote.addEventListener("click", (e) => {
            copyNote(e.currentTarget.firstElementChild);
        });
    });

    // Adding Event Handler to edit button
    document.querySelectorAll("#edit-btn").forEach(currentBtn => {
        currentBtn.addEventListener("click", (e) => {
            editNote(e.currentTarget);
        });
    });

    // Adding Event Handler to delete button
    document.querySelectorAll("#delete-btn").forEach(currentBtn => {
        currentBtn.addEventListener("click", (e) => {
            deleteNote(e.currentTarget);
        });
    });

}
let collectAndShowData = () => {
    notes.push(notesInput.value);
    localStorage.setItem("notes", JSON.stringify(notes));   // Storing in Local Storage
    createNote();
    inputClear();
};

let formValidation = () => {
    let regex = /^\s*$/;
    if(notesInput.value == "" || notesInput.value.match(regex)){
        return;
    }
    else{
        collectAndShowData();
    }
};

let deleteNote = (obj) => {
    obj.parentElement.parentElement.remove();
    notes.splice(obj.parentElement.parentElement.id,1);
    localStorage.setItem("notes", JSON.stringify(notes));   // Storing in Local Storage

    if(notesContainer.children.length == 0){
        notesHeading.classList.add("hide");
    } else {
        return;
    }
}

let editNote = (obj) => {
    let selectedNote = obj.parentElement.parentElement;
    notesInput.value = selectedNote.children[0].innerHTML;

    deleteNote(obj);
}

// Adding the eventListeners
notesForm.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
});

clearNotes.addEventListener("click", () => {
    notesContainer.innerHTML = "";
    notes.splice(0, notes.length)
    localStorage.setItem("notes", JSON.stringify(notes));   // Storing in Local Storage
    notesHeading.classList.add("hide")

});


// Retrieving Data from Local Storage at start

let retrieveData = () => {
    notes = JSON.parse(localStorage.getItem("notes")) || [];
    createNote();
}

retrieveData();

