function storeDataInLocal() {
  localStorage.setItem("tasks data", JSON.stringify(tasksData));
}

function getDataFromLocalStorage() {
  return JSON.parse(localStorage.getItem("tasks data"));
}

const tasksData = getDataFromLocalStorage() || [];
console.log(tasksData);
const STATE = {
  ACTIVE: "active",
  COMPLETED: "completed",
  ALL: "all",
};
Object.freeze(STATE);

function createElement(tagName, setup) {
  const newElement = document.createElement(tagName);
  setup(newElement);
  return newElement;
}

class Task {
  constructor(text, state, id) {
    //-constructor definition
    this.text = text;
    this.state = state || STATE.ACTIVE;
    this.id = id || Symbol("id");
    console.log(this.id);
    const _checkbox = createElement("input", (checkbox) => {
      //create check button
      checkbox.type = "checkbox";
      checkbox.classList.add("task-checkbox");
      checkbox.checked = this.state == STATE.COMPLETED ? true : false;
      checkbox.addEventListener("click", () => {
        this.state =
          this.state == STATE.ACTIVE ? STATE.COMPLETED : STATE.ACTIVE;
        this.store();
      });
    });

    const _deleteButton = createElement("button", (button) => {
      //create delete  button
      button.classList.add("btn--delete");
      button.type = "button";
      button.textContent = "delete";
      button.addEventListener("click", () => {
        this.delete();
      });
    });

    this.listItem = createElement("li", (li) => {
      //create task(li) element
      li.textContent = text;
      li.prepend(_checkbox);
      li.append(_deleteButton);
    });
    //constructor definition end.
  }

  //-method definition
  delete() {
    this.listItem.remove();
    const clone = tasksData.slice();
    clone.forEach((task, index) => {
      if (task.id === this.id) {
        tasksData.splice(index, 1);
      }
    });
    storeDataInLocal();
    updateUI();
  }

  store() {
    if (tasksData.some((task) => task.id === this.id)) {
      const target = tasksData.find((task) => task.id === this.id);
      target.text = this.text;
      target.state = this.state;
      target.id = this.id;
    } else {
      tasksData.push({ text: this.text, state: this.state, id: this.id });
    }
    storeDataInLocal();
    updateUI();
  }
  //method definition end.
}

const createButton = document.querySelector(".btn--create");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const pendingTaskCount = document.getElementById("pending-task-count");
const taskCountLabel = document.getElementById("task-count-label");
const allDoneLabel = document.getElementById("all-done-label");
const allButton = document.getElementById("all");
const activeButton = document.getElementById("active");
const completedButton = document.getElementById("completed");
const clearALLButton = document.querySelector(".btn--clear-all");

function renderTasksBy(state) {
  switch (state) {
    case STATE.ALL:
      taskList.innerHTML = "";
      tasksData.forEach((task) => {
        const newTask = new Task(task.text, task.state, task.id);
        taskList.insertAdjacentElement("beforeend", newTask.listItem);
      });
      break;
    case STATE.ACTIVE:
      taskList.innerHTML = "";
      tasksData
        .filter((task) => task.state == STATE.ACTIVE)
        .forEach((task) => {
          const newTask = new Task(task.text, task.state, task.id);
          taskList.insertAdjacentElement("beforeend", newTask.listItem);
        });
      break;
    case STATE.COMPLETED:
      taskList.innerHTML = "";
      tasksData
        .filter((task) => task.state == STATE.COMPLETED)
        .forEach((task) => {
          const newTask = new Task(task.text, task.state, task.id);
          taskList.insertAdjacentElement("beforeend", newTask.listItem);
        });
      break;
  }
}

function updateUI() {
  pendingTaskCount.textContent = tasksData.reduce((count, task) => {
    if (task.state === STATE.ACTIVE) {
      return count + 1;
    } else {
      return count;
    }
  }, 0);
  taskCountLabel.classList.toggle("hidden", tasksData.every(task => task.state == STATE.COMPLETED));

  allDoneLabel.classList.toggle("hidden",tasksData.some(task => task.state == STATE.ACTIVE));
}

renderTasksBy(STATE.ALL);

updateUI();

createButton.addEventListener("click", (event) => {
  const content = taskInput.value.trim();
  const regex = /(?=\w+\s?\w+$)/;
  if (regex.test(content)) {
    const newTask = new Task(taskInput.value, STATE.ACTIVE);
    newTask.store();
    taskList.insertAdjacentElement("beforeend", newTask.listItem);
    taskInput.value = "";
  } else {
    alert("Input invalid");
  }
});

allButton.addEventListener("click", () => {
  renderTasksBy(STATE.ALL);
});

activeButton.addEventListener("click", () => {
  renderTasksBy(STATE.ACTIVE);
});

completedButton.addEventListener("click", () => {
  renderTasksBy(STATE.COMPLETED);
});

clearALLButton.addEventListener("click", () => {
  localStorage.clear();
  tasksData.splice(0, Infinity);
  taskList.innerHTML = "";
  updateUI();
  console.log("all clean!");
});
