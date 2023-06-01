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
		text: "Task Name",
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

	const save_btn_element = document.createElement("button");
	save_btn_element.classList.add('fa-regular', 'fa-floppy-disk','d-none');

	const cancel_btn_element = document.createElement("button");
	cancel_btn_element.classList.add('fa-solid', 'fa-xmark','d-none');

	const edit_btn_element = document.createElement("button");
	edit_btn_element.classList.add('fa-solid', 'fa-pen');
	edit_btn_element.setAttribute("id", "edit");

	const remove_btn_element = document.createElement("button");
	remove_btn_element.classList.add('fa-regular', 'fa-trash-can');
	remove_btn_element.setAttribute("id", "remove");


	actions_element.append(edit_btn_element);
	actions_element.append(remove_btn_element);
	actions_element.append(save_btn_element);
	actions_element.append(cancel_btn_element);

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
	let is_valid_input = (input_element) ?()=> input_element.value.trim().length > 0: ()=> false;
	input_element.addEventListener("input", () => {
		console.log("input eventListener");
		while(!is_valid_input(input_element)){
			prompt("invalid input");
			item.text=input_element.value;
		}
	});

	input_element.addEventListener("blur", () => {
		console.log("check box eventListener disabled");
		if(!is_valid_input(input_element)){
			let valid_input = prompt("invalid input, Please enter a valid input");
			input_element.value = valid_input;
		}
		input_element.setAttribute("disabled", "");
		priority_select_element.setAttribute("disabled", "");
		save_btn_element.classList.add("d-none");
		cancel_btn_element.classList.add("d-none");
		edit_btn_element.classList.remove("d-none");
		remove_btn_element.classList.remove("d-none");
		save();
	});

	edit_btn_element.addEventListener("click", () => {
		console.log("edit button eventListener");
		input_element.removeAttribute("disabled");
		priority_select_element.removeAttribute("disabled");
		save_btn_element.classList.remove("d-none");
		cancel_btn_element.classList.remove("d-none");
		edit_btn_element.classList.add("d-none");
		remove_btn_element.classList.add("d-none");
		item.text=input_element.value;
		input_element.focus();

	});

	remove_btn_element.addEventListener("click",() => {
		console.log("remove eventListener");
		task_items = task_items.filter(t => t.id != item.id);

		item_element.remove();

		save();
	});

	save_btn_element.addEventListener("click", () => {
		input_element.setAttribute("disabled", "");
		save_btn_element.classList.add("d-none");
		cancel_btn_element.classList.add("d-none");
		edit_btn_element.classList.remove("d-none");
		remove_btn_element.classList.remove("d-none");
		item.text = input_element.value;
	});

	cancel_btn_element.addEventListener("click", () => {
		
		save_btn_element.classList.add("d-none");
		cancel_btn_element.classList.add("d-none");
		edit_btn_element.classList.remove("d-none");
		remove_btn_element.classList.remove("d-none");
		input_element.value=item.text;
	})
	console.log("create task");
	return {item_element, input_element,  priority_select_element ,actions_element}

}



function save () {
	console.log("save");
	localStorage.setItem("tasks", JSON.stringify(task_items));
}
