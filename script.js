

// Create a class that has these functionalities:
// 4. Once the task has been completed, we move the completed task(check marked) to completed task list in localStorage
// 5. If we want to undo(uncheck) the task that has been completed, we move the completed task from complete task list to task list
// 6. If we want to delete a task from the completed/uncomplete task list, we can delete it from localStorage
// NOTE: LocalStorage gets cleared when the browser is closed. For long term storage, we can use IndexedDB or WebSQL

// Next task: Use Local Storage to store data

class Task {
	constructor() {
		this.tasklist = document.getElementById("taskList");
		// Stores the key:value pair for the tasks
		this.taskDictionary = localStorage.getItem('task-items') ? JSON.parse(localStorage.getItem('task-items')) : {};
		// Object.keys will return the array/list of all keys then count the array using length property
		this.taskDictionaryKeysArray = Object.keys(this.taskDictionary);
		this.numberOfTasks = this.taskDictionaryKeysArray.length;
		this.initializeTaskList();
	}

	initializeTaskList() {
		for (let i = 0; i < this.numberOfTasks; i++) {
			let taskId = this.taskDictionaryKeysArray[i]
			let taskContent = this.taskDictionary[taskId]
			this.displayTask(taskId, taskContent)
		}	
	}

	getNumberOftasks() {
		return this.numberOfTasks;
	}

	updateNumberOftasks() {
		this.numberOfTasks += 1;
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
		this.tasklist.appendChild(task);
	}

	// IMPLEMENT THIS
	completeTask(targetElementId) {
		// Gets the parent node (div that contains the checkbox) then remove it from the page and update localStorage
		const  parentNode = document.getElementById(targetElementId).parentElement
		console.log(targetElementId)
		delete this.taskDictionary[targetElementId];
		console.log(this.taskDictionary);
		localStorage.setItem("task-items", JSON.stringify(this.taskDictionary))
		parentNode.remove();
	}
}

const taskInstance = new Task();

const addTaskButton = document.getElementById("add-task-btn");
var contentField = document.getElementById("task-text-input");

addTaskButton.addEventListener("click", function() {
	taskInstance.addTask(contentField.value);
});

const checkmarkLabels = document.getElementsByClassName("checkmark-checkbox");
document.addEventListener("change", function(event) {
	// Adds event listener for Checkboxes
	if (event.target && event.target.classList.contains("checkmark-checkbox")) {
		const targetElementId = event.target.id
		taskInstance.completeTask(targetElementId);
	}
});




