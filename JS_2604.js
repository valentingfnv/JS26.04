// task 1+++++++++++++++++++++++++++++++++++++++++++++++++++++

function movement(e) {
  trackbarWidth = trackbar.getBoundingClientRect().width;
  slider.style.left = e.pageX - trackbar.offsetLeft + "px";
  if (slider.offsetLeft < 0) {
    slider.style.left = 0 + "px";
  }
  if (slider.offsetLeft > trackbarWidth - slider.offsetWidth) {
    slider.style.left = trackbarWidth - slider.offsetWidth + "px";
  }
}

trackbar.addEventListener("click", function (e) {
  slider.style.left =
    e.pageX - trackbar.offsetLeft - slider.offsetWidth / 2 + "px";
});

slider.addEventListener("mousedown", function () {
  document.addEventListener("mousemove", movement);
  document.addEventListener("mouseup", function () {
    document.removeEventListener("mousemove", movement);
  });
});

// task 2+++++++++++++++++++++++++++++++++++++++++++++++++++++

let imageBox = ["kosmos1.jpg", "kosmos2.jpg", "kosmos3.jpg"];
let listLen = imageBox.length - 1;
let i = 0;

task2.addEventListener("click", function (e) {
  if (e.target.id == "rightButton") i++;
  if (e.target.id == "leftButton") i--;

  if (i == listLen) {
    rightButton.disabled = true;
  } else {
    rightButton.disabled = false;
  }
  if (i == 0) {
    leftButton.disabled = true;
  } else {
    leftButton.disabled = false;
  }
  imageSlider.src = imageBox[i];
});

// task 3+++++++++++++++++++++++++++++++++++++++++++++++++++++

textDiv = Array.from(document.getElementsByClassName("text"));

document.addEventListener("click", (e) => {
  if (!(e.target.className == "text"))
    textDiv.map((x) => (x.style.display = "none"));

  if (e.target.className == "tittle") {
    let element = e.target.nextElementSibling;
    let styleStart = getComputedStyle(element);
    element.style.display = styleStart.display == "none" ? "block" : "none";
  }
});

// task 4+++++++++++++++++++++++++++++++++++++++++++++++++++++

lstNews = [
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium ut aperiam autem corporis quae debitis maxime quis illo id ullam?",
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem, veritatis?",
  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, dicta doloremque natus quam corrupti expedita.",
];

let x = 0;

more.addEventListener("click", function () {
  x++;
  if (x == lstNews.length - 1) {
    more.disabled = true;
  }

  document.getElementById("textNews").innerText += lstNews[x];
});

// task 5+++++++++++++++++++++++++++++++++++++++++++++++++++++

numDay = (date) => {
  let day = date.getDay();
  if (day == 0) day = 7;
  return day - 1;
};

gnr.addEventListener("click", () => {
  let date = new Date(year.value, month.value - 1);
  showDate.textContent =
    date.toLocaleString("en-us", { month: "long" }) + ", " + date.getFullYear();
  calendar = "<tr>";

  for (let i = 0; i < numDay(date); i++) calendar += "<td></td>";

  while (date.getMonth() == month.value - 1) {
    calendar += "<td>" + date.getDate() + "</td>";
    if (numDay(date) % 7 == 6) calendar += "</tr><tr>";
    date.setDate(date.getDate() + 1);
  }

  if (numDay(date) != 0) {
    for (let i = numDay(date); i < 7; i++) calendar += "<td></td>";
  }

  tbl.innerHTML =
    "<th>MON</th><th>TUE</th><th>WED</th><th>THU</th><th>FRI</th><th>SUT</th><th>SUN</th>" +
    calendar +
    "</tr>";
});

// task 6+++++++++++++++++++++++++++++++++++++++++++++++++++++

let addBoreder = Array.from(listOfLinks.getElementsByTagName("a"));
for (let i of addBoreder) {
  if (i.getAttribute("href").startsWith("http")) {
    i.style.borderBottom = "1px dashed #324757";
  }
}

// task 7+++++++++++++++++++++++++++++++++++++++++++++++++++++

let books = Array.from(list.getElementsByTagName("li"));

function clear() {
  books.map((x) => (x.style.backgroundColor = ""));
}
function shiftSelect(e) {
  let field = books.filter((x) => x.style.backgroundColor != "");
  let lastElem = books.indexOf(field[field.length - 1]);
  let targetElem = books.indexOf(e.target);

  if (lastElem < targetElem) {
    for (elem = lastElem; elem <= targetElem; elem++) {
      books[elem].style.backgroundColor = "#324757";
    }
  } else {
    for (elem = lastElem; elem >= targetElem; elem--) {
      books[elem].style.backgroundColor = "#324757";
    }
  }
}

for (let book of books) {
  book.addEventListener("click", (e) => {
    if (e.ctrlKey) e.target.style.backgroundColor = "#324757";
    else if (e.shiftKey) shiftSelect(e);
    else {
      clear();
      e.target.style.backgroundColor = "#324757";
    }
  });
}
document.addEventListener("click", (e) => {
  if (e.target.localName != "li" && e.target.id != "list") clear();
});

["keyup", "keydown"].forEach((event) => {
  window.addEventListener(event, (e) => {
    document.onselectstart = () => !(e.key == "Shift" && e.shiftKey);
  });
});

// task 8+++++++++++++++++++++++++++++++++++++++++++++++++++++

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && (e.code == "KeyS" || e.code == "KeyE")) {
    e.preventDefault();
    if (e.code == "KeyE") {
      if (!editText.style.display) {
        editText.style.display = "block";
        saveText.style.display = "none";
        editText.value = saveText.textContent;
      }
    } else {
      if (editText.style.display) {
        editText.style.display = "none";
        saveText.style.display = "block";
        saveText.textContent = editText.value;
      }
    }
  }
});

// task 9+++++++++++++++++++++++++++++++++++++++++++++++++++++

let tittles = Array.from(tab.getElementsByTagName("th"));
let sortedTr = Array.from(tab.getElementsByTagName("tr")).slice(1);
let numbers = /^\d+$/;
for (let index in tittles) {
  tittles[index].addEventListener("click", () => {
    sortedTr.sort((rowA, rowB) => {
      if (
        numbers.test(rowA.cells[index].textContent) &&
        numbers.test(rowB.cells[index].textContent)
      ) {
        return rowA.cells[index].textContent - rowB.cells[index].textContent;
      }
      return rowA.cells[index].textContent.localeCompare(
        rowB.cells[index].textContent
      );
    });
    for (let i = 0; i < sortedTr.length; i++) tab.appendChild(sortedTr[i]);
  });
}
