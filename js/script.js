// declare the task list & add the task to the list botton
const todo_list = document.getElementById("todo_list");
const add_task = document.getElementById("add_task_btn");

// todo task list items
let task_items=[];

add_task.addEventListener('click',create_task);

function sort_tasks() {
	task_items.sort((a, b) => b.options.id - a.options.id);
	console.log("sort_tasks",task_items);
}
function create_task(){
    const item = {
		//id: new Date().getTime(),
		text: "Task Name",
		completed: false
	}
	const { item_element, input_element, priority_select_element  } = create_task_element(item);
	task_items.unshift(item_element);

	todo_list.prepend(item_element);

	input_element.removeAttribute("disabled");

	priority_select_element.removeAttribute("disabled");

	input_element.focus();

	 save();
	 console.log(item);

}



const display_checkbox=(checkbox,item_element,item)=>
	{
	checkbox.addEventListener("change", () => {
		console.log(item_element);
	item.completed = checkbox.checked;

	if(item.completed){

		item_element.classList.add("completed");
	}else{
		item_element.classList.remove("completed");
	}

	save();
});}

function create_task_element(item) {
	
	console.log(task_items)
	// the main div(ui)
	// const item_element = document.createElement("div");
	// item_element.classList.add("task_items");
	// // checkbox(ui)
	// const checkbox = document.createElement("input");
	// checkbox.type = "checkbox";
	checkbox.checked = item.completed;
	// check if checkbox is checked and assign completed class( ui / logic )
	if (item.completed) {
		item_element.classList.add("completed");
	}else{
		item_element.classList.remove("completed");
	}

	// input -task name- (ui)
	// const input_element = document.createElement("input");
	// input_element.type = "text";

	// input_element.value = item.text;
	
	// input_element.setAttribute("disabled", "");

	//create priority select element(ui)
	const priority_select_element = document.createElement("select");
	priority_select_element.setAttribute("id", "priority");
	priority_select_element.setAttribute("disabled", "");
	priority_select_element.addEventListener("change", () => {
		item.priority = priority_select_element.value;
	});

	// create priority options and add it to the select(ui)
	let options = [{id:0 ,priority:"low"},{id:1 ,priority:"medium"}, {id:2 ,priority:"high"}];
	for(let i = 0; i < options.length; i++){
		const option = document.createElement("option");
		option.value = options[i].id;
		option.text = options[i].priority;
		priority_select_element.appendChild(option);
	}
	//Object.assign(item, options);
	
	// create actions div-buttons-(ui)
	const actions_element = document.createElement("div");
	actions_element.classList.add("actions");
	//create save button (ui)
	const save_btn_element = document.createElement("button");
	save_btn_element.classList.add('fa-regular', 'fa-floppy-disk','d-none');
	//create cancel button (ui)
	const cancel_btn_element = document.createElement("button");
	cancel_btn_element.classList.add('fa-solid', 'fa-xmark','d-none');
	//create edit button (ui)
	const edit_btn_element = document.createElement("button");
	edit_btn_element.classList.add('fa-solid', 'fa-pen');
	edit_btn_element.setAttribute("id", "edit");
	//create remove button (ui)
	const remove_btn_element = document.createElement("button");
	remove_btn_element.classList.add('fa-regular', 'fa-trash-can');
	remove_btn_element.setAttribute("id", "remove");

	// append all the the buttons to the actions div (ui)
	actions_element.append(edit_btn_element);
	actions_element.append(remove_btn_element);
	actions_element.append(save_btn_element);
	actions_element.append(cancel_btn_element);
	// append all the the elements to the main div (ui)
	item_element.append(checkbox);
	item_element.append(input_element);
	item_element.append(priority_select_element);	
	item_element.append(actions_element);

	// Events __________________________________________________________________

	// checkbox eventListener (logic)
	
	display_checkbox(checkbox,item_element,item);
	//check if input is empty (logic)
	let is_valid_input = (input_element) ?()=> input_element.value.trim().length > 0: ()=> false;
	
	// input eventListener (logic)
	input_element.addEventListener("blur", () => {
		if(!is_valid_input(input_element)){
			let valid_input = prompt("invalid input, Please enter a valid input");
			input_element.value = (valid_input) ? valid_input.length>0 : valid_input = prompt("invalid input, Please enter a valid input");
		}
		input_element.setAttribute("disabled", "");
		priority_select_element.setAttribute("disabled", "");
		save_btn_element.classList.add("d-none");
		cancel_btn_element.classList.add("d-none");
		edit_btn_element.classList.remove("d-none");
		remove_btn_element.classList.remove("d-none");
		item.text = input_element.value;
		save();
	});

	// edit button eventListener(logic)
	edit_btn_element.addEventListener("click", () => {
		//item.text=input_element.value;
		input_element.removeAttribute("disabled");
		priority_select_element.removeAttribute("disabled");
		save_btn_element.classList.remove("d-none");
		cancel_btn_element.classList.remove("d-none");
		edit_btn_element.classList.add("d-none");
		remove_btn_element.classList.add("d-none");
		input_element.focus();

	});

	// remove button eventListener(logic)
	remove_btn_element.addEventListener("click",() => {
		
		task_items = task_items.filter(t => t.id != item.id);

		item_element.remove();

		save();
	});

	// save button eventListener (logic)
	save_btn_element.addEventListener("click", () => {
		input_element.setAttribute("disabled", "");
		save_btn_element.classList.add("d-none");
		cancel_btn_element.classList.add("d-none");
		edit_btn_element.classList.remove("d-none");
		remove_btn_element.classList.remove("d-none");
		item.text = input_element.value;
	});
	
	// cancel button eventListener (logic)
		
	cancel_btn_element.addEventListener("click", () => {
		
		save_btn_element.classList.add("d-none");
		cancel_btn_element.classList.add("d-none");
		edit_btn_element.classList.remove("d-none");
		remove_btn_element.classList.remove("d-none");
		input_element.value=item.text;
	});

	priority_select_element.addEventListener("input", () => {
		task_items.sort();
		console.log(task_items);
		
	});

	input_element.addEventListener("click", () => {
		task_items.sort((a, b) => {
			let task_a = a.text.toLowerCase(),
				task_b = b.text.toLowerCase();
		
			if (task_a < task_b) {
				return -1;
			}
			if (task_a > task_b) {
				return 1;
			}
			return 0;
		});
		console.log(task_items);
		
	});
	// console.log(item_element);
	// console.log(input_element);
	// console.log(priority_select_element);
	
	
	return {item_element, input_element,  priority_select_element ,actions_element}

}




//refactoring create task element function



function save () {
	
	localStorage.setItem("tasks", JSON.stringify(task_items));
}
