// "use strict";
showNotes();
let addBtn = document.querySelector("#addbtn");

// Add Note In localStorage and addEvent listaner

addBtn.addEventListener("click", function (e) {
  let addTex = document.querySelector("#addtext");

  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  if (addTex.value == "") {
    console.log("empty Stiring");
  } else {
    notesObj.push(addTex.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTex.value = "";
    showNotes();
  }
});
// localStorage.clear();
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let html = "";

  notesObj.forEach((element, index) => {
    html += `
      <div class="notelist__col">
      <div class="title">Note : ${index + 1}</div>
      <p>
        ${element.slice(0, 1).toUpperCase()}${element
      .slice(1, element.length)
      .toLowerCase()}
      </p>
      <button id="${index}" onclick="deleteNote(this.id)" class="btn notelist__btn">Delete</button>
    </div>
      `;
  });
  let card = document.querySelector(".notelist__content");

  if (notesObj.length != 0) {
    card.innerHTML = html;
  } else {
    card.innerHTML = `<strong>No Note Is Populating..</strong>`;
  }
}

// delete notes

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

// search query
let search = document.querySelector("#searchTxt");
search.addEventListener("input", function () {
  let searchVal = search.value;
  let cardCol = document.querySelectorAll(".notelist__col");
  Array.from(cardCol).forEach(function (element) {
    let allCard = element.querySelectorAll("p")[0].innerHTML;
    if (allCard.includes(searchVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
