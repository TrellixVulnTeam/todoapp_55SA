// const { add } = require("lodash");
showNots();
console.log("this is app.js");
let addNoteBtn = document.querySelector("#addbtn");
let addTex = document.querySelector("#addtext");

addNoteBtn.addEventListener("click", function (e) {
  let addTex = document.querySelector("#addtext");
  let notes = localStorage.getItem("notes");
  //   making empty array
  if (notes == null) {
    noteObj = [];
  } else {
    noteObj = JSON.parse(notes);
  }
  // input
  if (addTex.value == "") {
    addNoteBtn.textContent = "Plz Input Some Note's";
  } else if (addTex.value.length <= 30) {
    addNoteBtn.textContent = "More then 30 word's";
  } else {
    noteObj.push(addTex.value);
    localStorage.setItem("notes", JSON.stringify(noteObj));
    addTex.value = "";
    addNoteBtn.textContent = "Submited";
    typingLength.textContent = "0";
    showNots();
  }

  //   Text change Add Note
  if (
    addTex.addEventListener("click", () => {
      addNoteBtn.textContent = "Add Note";
    })
  ) {
  }
});

// show Notes

function showNots() {
  let notes = localStorage.getItem("notes");
  //   making empty array
  if (notes == null) {
    noteObj = [];
  } else {
    noteObj = JSON.parse(notes);
  }

  let html = "";

  noteObj.forEach((element, index) => {
    html += `<div class="notelist__col">
    <div class="title">Note : ${index + 1}</div>
    <p>
      ${element.slice(0, 1).toUpperCase()}${element
      .slice(1, element.length)
      .toLowerCase()}
    </p>
    <button id="${index}" onclick="deleteNote(this.id)" class="btn notelist__btn">Delete</button>
  </div>`;
  });
  let card = document.querySelector(".notelist__content");

  if (noteObj.length != 0) {
    card.innerHTML = html;
  } else {
    card.innerHTML = `<strong>No Note Is Populating..</strong>`;
  }
}

// delete notes

function deleteNote(index) {
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    noteObj = [];
  } else {
    noteObj = JSON.parse(notes);
  }
  noteObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(noteObj));
  showNots();
}
// localStorage.clear();
// Typing Length

let typingLength = document.querySelector("#typingLength");
typingLength.style.display = "none";
addTex.addEventListener("input", (e) => {
  typingLength.style.display = "inline-block";
  let typing = addTex.value.length;
  typingLength.textContent = typing;
  if (typing <= 30) {
    typingLength.style.color = "red";
  } else {
    typingLength.style.color = "#a8a8a8";
  }
});

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
