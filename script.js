


class Task {
	constructor() {
		this.taskList = document.getElementById("task-list");
		this.taskDictionary = localStorage.getItem('task-items') ? JSON.parse(localStorage.getItem('task-items')) : {};
		this.taskDictionaryKeysArray = Object.keys(this.taskDictionary);

		this.completedTaskList = document.getElementById("completed-task-list");
		this.completedTaskDictionary = localStorage.getItem('completed-task-items') ? JSON.parse(localStorage.getItem('completed-task-items')) : {};
		this.completedTaskDictionaryKeysArray = Object.keys(this.completedTaskDictionary);

		this.numberOfTasks = this.taskDictionaryKeysArray.length;
		this.numberOfCompletedTask = this.completedTaskDictionaryKeysArray.length;
		this.totalNumberOfTasks = this.numberOfTasks + this.numberOfCompletedTask;
		
		this.initializeTaskList();
		this.initializeCompletedTaskList();
		
		// localStorage.clear();
	}

	initializeTaskList() {
		for (let i = 0; i < this.numberOfTasks; i++) {
			let taskId = this.taskDictionaryKeysArray[i]
			let taskContent = this.taskDictionary[taskId]
			this.displayTask(taskId, taskContent)
		}	
	}

	initializeCompletedTaskList() {
		for (let i = 0; i < this.numberOfCompletedTask; i++) {
			let taskId = this.completedTaskDictionaryKeysArray[i]
			let taskContent = this.completedTaskDictionary[taskId]
			this.displayCompletedTask(taskId, taskContent)
			this.displayNumberCompletedNumberOfTasks();
		}
	}

	getNumberOftasks() {
		return this.numberOfTasks;
	}

	updateNumberOftasks() {
		this.numberOfTasks += 1;
		this.totalNumberOfTasks += 1;
	}

	updateCompletedNumberOfTasks() {
		this.numberOfCompletedTask += 1;
		var completedTaskNumber = document.getElementById("completed-task-number");
		completedTaskNumber.textContent = this.numberOfCompletedTask;
	}

	displayNumberCompletedNumberOfTasks() {
		var completedTaskNumber = document.getElementById("completed-task-number");
		completedTaskNumber.textContent = this.numberOfCompletedTask;
	}

	addTask(content) {
		let keyId = `task-${this.totalNumberOfTasks+1}`
		this.addItemToDictionary(keyId, content);
		this.displayTask(keyId, content)
		this.updateNumberOftasks();
	}

	addItemToDictionary(keyId, content) {
		this.taskDictionary[keyId] = content
		localStorage.setItem('task-items', JSON.stringify(this.taskDictionary));
	}

	// get the "content" to be added along with the task
	displayTask(taskId, content) {
		let currentTaskId = taskId

		const task = document.createElement("div");
		task.classList.add("frame__task-list-item");

		const checkBox = document.createElement("input");
		checkBox.type = "checkbox";
		checkBox.id = currentTaskId;
		checkBox.classList.add("checkmark-checkbox");

		const checkmarkLabel = document.createElement("label");
		checkmarkLabel.htmlFor = currentTaskId;
		checkmarkLabel.classList.add("checkmark-label");

		const checkMarkImage = document.createElement("i");
		checkMarkImage.classList.add("fas", "fa-check")

		const taskDescription = document.createElement("span");
		taskDescription.textContent = content;

		task.appendChild(checkBox);
		task.appendChild(checkmarkLabel).appendChild(checkMarkImage);
		task.appendChild(taskDescription);
		this.taskList.appendChild(task);
	}

	// get the "content" to be added along with the task
	displayCompletedTask(taskId, content) {
		let currentTaskId = taskId

		const task = document.createElement("div");
		task.classList.add("frame__task-list-item");

		const checkBox = document.createElement("input");
		checkBox.type = "checkbox";
		// displays on a checked state
		checkBox.checked = true;
		checkBox.id = currentTaskId;
		checkBox.classList.add("checkmark-checkbox");

		const checkmarkLabel = document.createElement("label");
		checkmarkLabel.htmlFor = currentTaskId;
		checkmarkLabel.classList.add("checkmark-label");

		const checkMarkImage = document.createElement("i");
		checkMarkImage.classList.add("fas", "fa-check")

		const taskDescription = document.createElement("span");
		taskDescription.textContent = content;

		task.appendChild(checkBox);
		task.appendChild(checkmarkLabel).appendChild(checkMarkImage);
		task.appendChild(taskDescription);
		this.completedTaskList.appendChild(task);
	}

	//TEMPORARY
	deleteTask() {
		// Gets the parent node (div that contains the checkbox) then remove it from the page and update localStorage
		this.taskDictionary = {};
		localStorage.setItem("task-items", JSON.stringify(this.taskDictionary))
		localStorage.setItem("completed-task-items", JSON.stringify(this.taskDictionary))
	}

	deleteCompletedTask(targetElementId) {
		// Gets the parent node (div that contains the checkbox) then remove it from the page and update localStorage
		const  parentNode = document.getElementById(targetElementId).parentElement
		delete this.taskDictionary[targetElementId];
		localStorage.setItem("completed-task-items", JSON.stringify(this.taskDictionary))
		parentNode.remove();
	}


	completeTask(targetElementId) {
		const parentNode = document.getElementById(targetElementId).parentElement;
		const parentNodeClone = parentNode.cloneNode(true);

		const newtargetElementId = `completed-${targetElementId}`

		parentNodeClone.childNodes[0].id = newtargetElementId
		parentNodeClone.childNodes[1].htmlFor = newtargetElementId

		delete this.taskDictionary[targetElementId];
		parentNode.remove();

		this.completedTaskDictionary[newtargetElementId] = parentNode.lastChild.textContent; // LastChild should be the span containing the content
		document.getElementById("completed-task-list").appendChild(parentNodeClone);
		
		// Update localStorage
		localStorage.setItem("completed-task-items", JSON.stringify(this.completedTaskDictionary));
		localStorage.setItem("task-items", JSON.stringify(this.taskDictionary));
		
		// No need to call display since it is already displayed by appendChild above
		this.updateCompletedNumberOfTasks();
	}

	unCompleteTask(targetElementId) {
		const parentNode = document.getElementById(targetElementId).parentElement;
		const parentNodeClone = parentNode.cloneNode(true);

		delete this.completedTaskDictionary[targetElementId];
		parentNode.remove();

		const newTargetElementId = targetElementId.slice(10)

		parentNodeClone.childNodes[0].id = newTargetElementId
		parentNodeClone.childNodes[1].htmlFor = newTargetElementId
		
		this.taskDictionary[newTargetElementId] = parentNode.lastChild.textContent; // Slices "completed-" from the Id
		
		document.getElementById("task-list").appendChild(parentNodeClone);
		
		// Update localStorage
		localStorage.setItem("completed-task-items", JSON.stringify(this.completedTaskDictionary));
		localStorage.setItem("task-items", JSON.stringify(this.taskDictionary));
		
		// Decrease completed count and update the display
		this.numberOfCompletedTask -= 1
		this.displayNumberCompletedNumberOfTasks();
	}
}

// Initializing the Task class
const taskInstance = new Task();


// add task button event listener
const addTaskButton = document.getElementById("add-task-btn");
var inputField = document.getElementById("task-text-input");
addTaskButton.addEventListener("click", function() {
	taskInstance.addTask(inputField.value);
	inputField.value = "";
});

// Input Field "Enter" listener
var inputField = document.getElementById("task-text-input");
inputField.addEventListener("keydown", function(event) {
	if (event.key == "Enter") {
		taskInstance.addTask(inputField.value);
		inputField.value = "";
	}
});

// add task button event listener
const completedTaskButton = document.getElementById("completed-task-button");
completedTaskButton.addEventListener("click", function() {
	let taskList = document.getElementById("task-list");
	let completedTaskList = document.getElementById("completed-task-list");

	if (taskList.classList.contains("hidden")) {
		taskList.classList.remove("hidden");
		completedTaskList.classList.add("hidden");
	}

	else {
		taskList.classList.add("hidden");
		completedTaskList.classList.remove("hidden");
	}
});


// Event handler function
function handleCheckboxChange(event) {
    if (event.target && event.target.classList.contains("checkmark-checkbox")) {
        const targetElementId = event.target.id;

        if (targetElementId.startsWith("complete")) {
            taskInstance.unCompleteTask(targetElementId);
        } else {
            taskInstance.completeTask(targetElementId);
        }
    }
}

// Attach event listener to document
function attachEventListeners() {
    document.addEventListener("change", handleCheckboxChange);
}


//TEMPORARY
const deleteBtn = document.getElementById("delete-button");
deleteBtn.addEventListener("click", function() {
	taskInstance.deleteTask();
});


document.addEventListener("DOMContentLoaded", function() {
	attachEventListeners();
});