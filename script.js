const addButton = document.querySelector("#add-button");
const inputValue = document.querySelector("input");
const alert = document.querySelector(".alert");
const clearBtn = document.querySelector(".clearall");
let listContainer = document.querySelector("ul");

window.addEventListener("DOMContentLoaded", showList);
addButton.addEventListener("click", addButtonClicked);
clearBtn.addEventListener("click", clearAll);
document.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        addButtonClicked();
    }
});

function addButtonClicked() {
    let listItems = inputValue.value;
    if (listItems == "") {
        displayAlert("You must type something to add", "alertDanger");
    } else {
        addItemsToList(listItems);
        displayAlert("Successfully Added!", "alertSuccess");
        clearBtn.style.display = "inline";
    }
}

function displayAlert(value, className) {
    alert.textContent = value;
    alert.classList.add(className);
    setTimeout(() => {
        alert.textContent = "";
        alert.classList.remove(className);
    }, 1000);
}

function addItemsToList(value) {
    let li = document.createElement("li");
    li.innerHTML = `<img src="unchecked.png" id="tick"/><span
                            class="task-name"
                            >${value}</span
                        >
                        <span id="cross"> &#10060;</span>`;

    listContainer.appendChild(li);

    const tick = li.querySelectorAll("#tick");
    tick.forEach((tickmark) => {
        tickmark.addEventListener("click", tickMark);
    });
    const cross = li.querySelectorAll("#cross");
    cross.forEach((crossmark) => {
        crossmark.addEventListener("click", removeList);
    });
    inputValue.value = "";
    saveData();
}

function tickMark(e) {
    const li = e.target.parentElement;
    li.querySelector(".task-name").classList.toggle("linethrough");

    let image = e.target;
    if (image.src.endsWith("unchecked.png")) {
        image.src = "checked.png";
    } else {
        image.src = "unchecked.png";
    }

    saveData();
}
function removeList(e) {
    let del = e.currentTarget.parentElement;
    del.remove();
    if (listContainer.innerHTML == "") {
        clearBtn.style.display = "none";
    }
    displayAlert("Successfully deleted item", "alertSuccess");
    saveData();
}

function clearAll() {
    let list = listContainer.querySelectorAll("li");

    list.forEach((li) => {
        li.remove();
    });

    displayAlert("All items cleared", "alertSuccess");
    clearBtn.style.display = "none";
    saveData();
}

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showList() {
    listContainer.innerHTML = localStorage.getItem("data");
    if (listContainer.innerHTML !== "") {
        clearBtn.style.display = "inline";
    }

    const tick = listContainer.querySelectorAll("#tick");
    tick.forEach((tickmark) => {
        tickmark.addEventListener("click", tickMark);
    });
    const cross = listContainer.querySelectorAll("#cross");
    cross.forEach((crossmark) => {
        crossmark.addEventListener("click", removeList);
    });
}
