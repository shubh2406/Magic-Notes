console.log("Welcome To Notes App!!!");
showNotes();

// If user adds a note, add it to local storage.
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function () {
  let addTxt = document.getElementById("addTxt");
  let addTtl = document.getElementById("addTtl");
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.push([addTtl.value, addTxt.value]);

  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTtl.value = "";
  addTxt.value = "";

  showNotes();
});

// function to show notes from local storage in Notes section of app
function showNotes() {
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let html = "";
  notesObj.forEach(function (element, index) {
    html += `<div class="noteCard card mx-2 my-2" style="width: 18rem">
        <div class="card-body">
          <h5 class="card-title">${element[0]}</h5>
          <p class="card-text">${element[1]}</p>
          <button id="${index}" onclick = "deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
      </div>`;
  });

  let notesElem = document.getElementById("notes");
  notesElem.innerHTML = html;

  if (notesObj.length != 0) {
    notesElem.innerHTML = html;
  } else {
    notesElem.innerHTML = `Nothing to show!
        <br>
        Use "Add a note" section to add note`;
  }
}

// function to delete a note
function deleteNote(index) {
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

let searchTxt = document.getElementById("searchTxt");
searchTxt.addEventListener("input", function () {
  let inputVal = searchTxt.value;
  let noteCards = document.getElementsByClassName("noteCard");

  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.querySelector(".card-text").innerText;

    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});

/* Additional Features that can be added
    1) Add Title to a note and then search using either title or content.
    2) Mark a note as imp.
    3) Separate notes by user.
    4) Sync and host to web server.
*/
