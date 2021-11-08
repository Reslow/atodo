// connecting elements from HTML and declaring an array
let btn = document.getElementById("my-button");
let input = document.getElementById("task");
let arrOfListItems = [];

// only creates list if input exist else input -> null

const clickHandler = () => {
  let task = input.value;
  if (task !== "") {
    createObjectfrominput(task);
    localStorage.setItem("arrofobjects", JSON.stringify(arrOfListItems));
  }

  input.value = null;
};

//create list from obj in localstorage
const loadhandler = (obj) => {
  createlist(obj);
};

// I cerate listitems
const createlist = (taskobj) => {
  let listItem = document.createElement("li");
  let list = document.getElementById("list");
  listItem.innerText = taskobj.value;
  list.appendChild(listItem);
  let deletebtn = document.createElement("button");
  listItem.appendChild(deletebtn);
  deletebtn.innerText = "x";
  deletebtn.className = "delete";
  deletebtn.addEventListener("click", () => deleteButton(deletebtn, taskobj));

  listItem.addEventListener("mouseenter", toggleBtn);
};

// create and define objects id, find the highest value to set the next one. if none start from 0
const createObjectfrominput = (taskItem) => {
  let count = 1;
  const ids = arrOfListItems.map((item) => item.id);
  const sorted = ids.sort((a, b) => a - b);
  let a = sorted[sorted.length - 1];

  if (a === undefined) {
    count = 0;
  } else count = a + 1;

  // a counter for getting accelerating values as id
  for (let i = count; i < arrOfListItems.length; i++) {
    count = i;
  }

  const myobject = {
    id: count,
    value: taskItem,
  };
  arrOfListItems.push(myobject);
  createlist(myobject);
};

// remove li elemets
const deleteButton = (deletebtn, taskobj) => {
  let element = deletebtn.parentElement;
  let parent = element.parentElement;
  parent.removeChild(element);
  deleterLS(taskobj.id);
};
//deleter from localstorage
function deleterLS(index) {
  let arr = arrOfListItems;
  const newarr = arr.filter((items) => items.id !== index); //creates a new array with all objects that does not have the id with index
  localStorage.setItem("arrofobjects", JSON.stringify(newarr)); // saving new array to localstorage
  getarr();
}

//call for function when btn clicked
btn.addEventListener("click", clickHandler);

//show deletebtn when mouse enteres and hide when leave
const toggleBtn = (listrow) => {
  let e = listrow.target;
  let removeBtn = e.childNodes[1];
  if (removeBtn.style.visibility !== "visible") {
    removeBtn.style.visibility = "visible";
  }
  e.addEventListener("mouseleave", function () {
    removeBtn.style.visibility = "hidden";
  });
};

//use key-presse "entre"  to call clickhandler
input.addEventListener("keyup", function (pressed) {
  let name = pressed.key;
  if (name === "Enter") {
    clickHandler();
  }
});

//get the list of data from localtorgare and call loadhandlern.
window.addEventListener("load", (event) => {
  getarr();
  arrOfListItems.forEach((e) => {
    loadhandler(e);
  });
});

// I created a seperate function for getting the data from localstorgare to use it twice in the program
function getarr() {
  arrOfListItems = JSON.parse(localStorage.getItem("arrofobjects"));
}
