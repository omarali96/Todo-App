// declare the task list & add the task to the list botton
// console.log("hello");
const todo_list = document.getElementById("todo_list");
const add_task = document.getElementById("add_task_btn");

// todo task list items
let task_items=[];

add_task.addEventListener('click',create_task);

function create_task(){
	console.log("create task");
    const item = {
		id: new Date().getTime(),
		text: "",
		completed: false
	}
	task_items.unshift(item);
	const { item_element, input_element,priority_select_element , actions_element } = create_task_element(item);

	todo_list.prepend(item_element);

	input_element.removeAttribute("disabled");

	priority_select_element.removeAttribute("disabled");

	input_element.focus();

	 save();

}




function create_task_element(item) {
	const item_element = document.createElement("div");
	item_element.classList.add("task_items");

	const checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.checked = item.completed;

	if (item.completed) {
		console.log("create task element completed");
		item_element.classList.add("completed");
	}else{
		console.log("create task element !completed");
		item_element.classList.remove("completed");
	}

	const input_element = document.createElement("input");
	input_element.type = "text";

	input_element.value = item.text;
	input_element.setAttribute("disabled", "");

	const priority_select_element = document.createElement("select");
	priority_select_element.setAttribute("id", "priority");
	priority_select_element.setAttribute("disabled", "");
	priority_select_element.addEventListener("change", () => {
		item.priority = priority_select_element.value;
	});

	
	let options = ["low", "medium", "high"];
	for(let i = 0; i < options.length; i++){
		const option = document.createElement("option");
		option.value = options[i];
		option.text = options[i];
		priority_select_element.appendChild(option);
	}
	

	const actions_element = document.createElement("div");
	actions_element.classList.add("actions");

	const edit_btn_element = document.createElement("button");
	edit_btn_element.classList.add('fa-solid', 'fa-pen');
	edit_btn_element.setAttribute("id", "edit");

	const remove_btn_element = document.createElement("button");
	remove_btn_element.classList.add('fa-regular', 'fa-trash-can');
	remove_btn_element.setAttribute("id", "remove");


	actions_element.append(edit_btn_element);
	actions_element.append(remove_btn_element);

	item_element.append(checkbox);
	item_element.append(input_element);
	item_element.append(priority_select_element);	
	item_element.append(actions_element);

	// Event
	checkbox.addEventListener("change", () => {
		console.log("check box eventListener");
		item.completed = checkbox.checked;

		if(item.completed){

			item_element.classList.add("completed");
		}else{
			item_element.classList.remove("completed");
		}

		save();
	});

	input_element.addEventListener("input", () => {
		console.log("input eventListener");
		item.text=input_element.value;
	});

	input_element.addEventListener("blur", () => {
		console.log("check box eventListener disabled");
		input_element.setAttribute("disabled", "");
		save();
	});

	edit_btn_element.addEventListener("click", () => {
		console.log("edit button eventListener");
		input_element.removeAttribute("disabled");
		input_element.focus();
	});

	remove_btn_element.addEventListener("click",() => {
		console.log("remove eventListener");
		task_items = task_items.filter(t => t.id != item.id);

		item_element.remove();

		save();
	});
	console.log("create task");
	return {item_element, input_element,  priority_select_element ,actions_element}

}



function save () {
	console.log("save");
	localStorage.setItem("tasks", JSON.stringify(task_items));
}
