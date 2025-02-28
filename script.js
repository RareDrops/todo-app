

// Create a class that has these functionalities:
// 4. Once the task has been completed, we move the completed task(check marked) to completed task list in localStorage
// 5. If we want to undo(uncheck) the task that has been completed, we move the completed task from complete task list to task list
// 6. If we want to delete a task from the completed/uncomplete task list, we can delete it from localStorage
// NOTE: LocalStorage gets cleared when the browser is closed. For long term storage, we can use IndexedDB or WebSQL

// Next task: Use Local Storage to store data

class Task {
	constructor() {
		this.taskList = document.getElementById("task-list");
		this.taskDictionary = localStorage.getItem('task-items') ? JSON.parse(localStorage.getItem('task-items')) : {};
		this.taskDictionaryKeysArray = Object.keys(this.taskDictionary);
		this.numberOfTasks = this.taskDictionaryKeysArray.length;

		this.completedTaskList = document.getElementById("completed-task-list");
		this.completedTaskDictionary = localStorage.getItem('completed-task-items') ? JSON.parse(localStorage.getItem('completed-task-items')) : {};
		this.completedTaskDictionaryKeysArray = Object.keys(this.completedTaskDictionary);
		this.numberOfCompletedTask = this.completedTaskDictionaryKeysArray.length;
		this.initializeTaskList();
		this.initializeCompletedTaskList();
		console.log(this.completedTaskDictionary);
		
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
		let keyId = `task-${this.numberOfTasks+1}`
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
		console.log(taskId);

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

	// Need to add uncomplete button

	completeTask(targetElementId) {
		const parentNode = document.getElementById(targetElementId).parentElement;
		const parentNodeClone = parentNode.cloneNode(true);

		delete this.taskDictionary[targetElementId];
		parentNode.remove();

		this.completedTaskDictionary[`completed-${targetElementId}`] = parentNode.lastChild.textContent; // LastChild should be the span containing the content
		document.getElementById("completed-task-list").appendChild(parentNodeClone);
		
		// Update localStorage
		localStorage.setItem("completed-task-items", JSON.stringify(this.completedTaskDictionary));
		localStorage.setItem("task-items", JSON.stringify(this.taskDictionary));
		
		// No need to call display since it is already displayed by appendChild above
		this.updateCompletedNumberOfTasks();
	}



}

// Initializing the Task class
const taskInstance = new Task();


// add task button event listener
const addTaskButton = document.getElementById("add-task-btn");
var inputField = document.getElementById("task-text-input");
addTaskButton.addEventListener("click", function() {
	taskInstance.addTask(contentField.value);
	inputField.value = "";
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

// Input Field "Enter" listener
var inputField = document.getElementById("task-text-input");
inputField.addEventListener("keydown", function(event) {
	if (event.key == "Enter") {
		taskInstance.addTask(inputField.value);
		inputField.value = "";
	}
});

const checkmarkLabels = document.getElementsByClassName("checkmark-checkbox");
document.addEventListener("change", function(event) {
	// Adds event listener for Checkboxes
	if (event.target && event.target.classList.contains("checkmark-checkbox")) {
		const targetElementId = event.target.id
		taskInstance.completeTask(targetElementId);
	}
});


//TEMPORARY
const deleteBtn = document.getElementById("delete-button");
deleteBtn.addEventListener("click", function() {
	taskInstance.deleteTask();
});



