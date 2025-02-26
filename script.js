

// Create a class that has these functionalities:
// 1. Getting or retrieving the number of tasks from localStorage
// 2. Creating another task object and appending it to the task list
// 3. Updating the number of tasks in the localStorage, and also storing the task object or content in the localStorage
// 4. Once the task has been completed, we move the completed task(check marked) to completed task list in localStorage
// 5. If we want to undo(uncheck) the task that has been completed, we move the completed task from complete task list to task list
// 6. If we want to delete a task from the completed/uncomplete task list, we can delete it from localStorage
// NOTE: LocalStorage gets cleared when the browser is closed. For long term storage, we can use IndexedDB or WebSQL

// Next task: Use Local Storage to store data

class Task {
	constructor() {
		this.tasklist = document.getElementById("taskList");
		this.taskArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
		this.numberOfTasks = this.taskArray.length;
		this.initializeTaskList();
	}

	initializeTaskList() {
		for (let i = 0; i < this.taskArray.length; i++) {
			this.displayTask(this.taskArray[i])
		}	
	}

	addItemToArray(content) {
		this.taskArray.push(content);
		localStorage.setItem('items', JSON.stringify(this.taskArray));
	}

	getNumberOftasks() {
		return this.numberOfTasks;
	}

	updateNumberOftasks() {
		this.numberOfTasks += 1;
	}

	addTask(content) {
		this.addItemToArray(content);
		this.displayTask(content)
	}

	// get the "content" to be added along with the task
	displayTask(content) {
		const currentTaskNumber = `task-${this.numberOfTasks + 1}`

		const task = document.createElement("div");
		task.classList.add("frame__task-list-item");

		const checkBox = document.createElement("input");
		checkBox.type = "checkbox";
		checkBox.id = currentTaskNumber;
		checkBox.classList.add("checkmark-checkbox");

		const label = document.createElement("label");
		label.htmlFor = currentTaskNumber;
		label.classList.add("checkmark-label");

		const checkMarkImage = document.createElement("i");
		checkMarkImage.classList.add("fas", "fa-check")

		const taskDescription = document.createElement("span");
		taskDescription.textContent = content;

		task.appendChild(checkBox);
		task.appendChild(label).appendChild(checkMarkImage);
		task.appendChild(taskDescription);
		this.tasklist.appendChild(task);

		this.updateNumberOftasks();
	}

	// IMPLEMENT THIS
	completeTask() {

	}
}

taskInstance = new Task();

const addTaskButton = document.getElementById("add-task-btn");
var contentField = document.getElementById("task-text-input");

addTaskButton.addEventListener("click", function() {
	taskInstance.addTask(contentField.value);
});

// const checkmarkLabels = document.getElementsByClassName("checkmark-checkbox");
// checkmarkLabels.addEventListener("toggle")




