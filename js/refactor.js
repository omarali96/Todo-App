let tasksArr = [];
let id = 1;
const todoItems = document.getElementById("todo_list");
const addButton = document.getElementById("add");
const deleteCheckedButton = document.getElementById("deleteChecked");

addButton.addEventListener("click", () => {
  console.log("tasksArr");
  const taskInput = document.getElementById("taskName").value;
  const priorityInput = parseInt(document.getElementById("priority").value);
  console.log(taskInput, priorityInput);
  if (!validInput(taskInput)) {
    alert("Please enter a valid task name");
  } else {
    displayElement(taskInput, priorityInput, id);
    createTask(taskInput, priorityInput);
    // for (let i = 0; i < tasksArr.length; i++) {
    //   console.log(
    //     tasksArr[i].taskName,
    //     tasksArr[i].priority,
    //     tasksArr[i].id,
    //     tasksArr[i].done,
    //     tasksArr[i].taskDate
    //   );
    // }
    // console.log(tasksArr[0].taskName,tasksArr[0].priority,tasksArr[0].id,tasksArr[0].done);}
  }
});
class Task {
  #taskName;
  #priority;
  #id;
  #done;
  #taskDate;

  constructor(taskName, priority, id, done) {
    this.#taskName = taskName;
    this.#priority = priority;
    this.#id = id;
    this.#done ? (this.#done = done) : (this.#done = false);
    this.#taskDate = new Date();
  }
  get taskName() {
    return this.#taskName;
  }

  set taskName(value) {
    this.#taskName = value;
  }

  get priority() {
    return this.#priority;
  }

  set priority(value) {
    this.#priority = value;
  }
  get id() {
    return this.#id;
  }

  set id(value) {
    this.#id = value;
  }

  get done() {
    return this.#done;
  }
  set done(value) {
    this.#done = value;
  }

  get taskDate() {
    return this.#taskDate;
  }
}
const validInput = (taskName) => {
  return taskName.trim().length === 0 ? false : true;
};

const deleteTask = (itemElement) => {
  tasksArr = tasksArr.filter((t) => t.id != t.id);
  itemElement.remove();
};

const editMode = (
  inputElement,
  saveButton,
  cancelButton,
  editButton,
  removeButton ) => {
  inputElement.removeAttribute("disabled");
  saveButton.classList.remove("d-none");
  cancelButton.classList.remove("d-none");
  editButton.classList.add("d-none");
  removeButton.classList.add("d-none");
  inputElement.focus();

  //priority_select_element.removeAttribute("disabled");
};



const displayCompleted=(itemElement,statLabel)=>{
	itemElement.classList.add("completed");
	statLabel.innerHTML = "Done";
	
}

const displayUncompleted=(itemElement,statLabel)=>{
	itemElement.classList.remove("completed");
	
	statLabel.innerHTML = "Undone";
	
}



const displayElement = (taskInput, priorityInput) => {
  // console.log(id);
  const itemElement = document.createElement("div");
  itemElement.classList.add("task_items");
  // checkbox(ui)
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  const checkBoxID = id;

  //task name display
  const inputElement = document.createElement("input");
  inputElement.type = "text";

  const priorityInputElement = document.createElement("label");
  priorityInputElement.setAttribute("id","task_priority");
  priorityInputElement.innerHTML = `Priority ${priorityInput}`;
  const actionsElement = document.createElement("div");
  actionsElement.classList.add("actions");
  //create save button (ui)
  const saveButton = document.createElement("button");
  saveButton.classList.add("fa-regular", "fa-floppy-disk", "d-none");
  //create cancel button (ui)
  const cancelButton = document.createElement("button");
  cancelButton.classList.add("fa-solid", "fa-xmark", "d-none");
  //create edit button (ui)
  const editButton = document.createElement("button");
  editButton.classList.add("fa-solid", "fa-pen");
  editButton.setAttribute("id", "edit");
  //create remove button (ui)
  const removeButton = document.createElement("button");
  removeButton.classList.add("fa-regular", "fa-trash-can");
  removeButton.setAttribute("id", "remove");

  const statLabel = document.createElement("button");
  statLabel.classList.add("btn-primary");
  statLabel.setAttribute("id", "stat");
  statLabel.innerHTML = "UnDone";

  actionsElement.append(editButton, removeButton, saveButton, cancelButton);

  inputElement.value = taskInput;

  inputElement.setAttribute("disabled", "");

  itemElement.append(checkBox, inputElement,priorityInputElement, statLabel, actionsElement);

  todoItems.prepend(itemElement);

  editButton.addEventListener("click", () => {
    editMode(inputElement, saveButton, cancelButton, editButton, removeButton);
  });

  removeButton.addEventListener("click", () => {
    deleteTask(itemElement);
  });
  checkBox.addEventListener("change", () => {
	
    if (checkBox.checked) {
		displayCompleted(itemElement,statLabel);
      for (let i = 0; i < tasksArr.length; i++) {
        if (tasksArr[i].id == checkBoxID) {
          tasksArr[i].done = true;
        }
      }
    } else if(checkBox.unchecked){
		displayUnCompleted(itemElement,statLabel);
	}
  });
  deleteCheckedButton.addEventListener("click", () => {
    deleteCheckedTasks(checkBox);
  });

  statLabel.addEventListener("click", () => {
	displayCompleted(itemElement,statLabel);

	
  });

  console.log(itemElement);
};

const createTask = (taskInput, priorityInput) => {
  const task = new Task(taskInput, priorityInput, id++);
 
  tasksArr.push(task);
};

// at last after implementig UI
const deleteCheckedTasks = () => {

	

};
// edit task inline
const editTask = () => {};

const saveTask = () => {};
	
const saveAllTasks = () => {};

const cancelEdit = () => {};

// const testLogic=()=>{
// 	const task_a=new Task("omar",1);
// 	const task_b=new Task("omar2",2);
// 	const task_c=new Task("omar3",3);
// 	tasksArr.push(task_a);
// 	tasksArr.push(task_b);
// 	tasksArr.push(task_c);

// 	for(let i=0;i<tasksArr.length;i++){
// 		console.log(tasksArr[i].taskName,tasksArr[i].priority,tasksArr[i].id,tasksArr[i].done ,tasksArr[i].taskDate);
// 	}
// }

// testLogic();
