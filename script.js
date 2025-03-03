/**
 * HelperFunction class containing utility methods.
 */

class HelperFunctions {
	/**
	 * 
	 * @param {string} filename 
	 * @returns {string} The SVG data representing the SVG
	 */
	// static fetchSvgIcon(filename) {
	// 	let svgData;
	// 	fetch(`assets/svgs/${filename}`)
	// 	.then(response => response.text())
	// 	.then(data => svgData = data)
	// 	.catch(error => console.error(error))
	// 	return svgData
	// }
	
	static async fetchSvgIcon(filename) {
		try {
		  const response = await fetch(`assets/svgs/${filename}`);
		  const svgData = await response.text();
		  return svgData;
		} catch (error) {
		  console.error(error);
		  return null;
		}
	  }
	  
}


/**
 * Task Class which handles adding/deleting/displaying/editing the task list
 */
class Task {
	/**
	 * Constructor for the Task Class
	 * Initializes task dictionaries and the number of task(uncompleted, completed, total)
	 * Initializes the display of current tasks/completed tasks
	 */

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
	
	/**
	 * Initializes the display of current task(s)
	 */
	initializeTaskList() {
		for (let i = 0; i < this.numberOfTasks; i++) {
			let taskId = this.taskDictionaryKeysArray[i]
			let taskContent = this.taskDictionary[taskId]
			this.displayTask(taskId, taskContent)
		}	
	}

	/**
	 * Initializes the display of completed task(s)
	 */
	initializeCompletedTaskList() {
		for (let i = 0; i < this.numberOfCompletedTask; i++) {
			let taskId = this.completedTaskDictionaryKeysArray[i]
			let taskContent = this.completedTaskDictionary[taskId]
			this.displayCompletedTask(taskId, taskContent)
			this.displayNumberCompletedNumberOfTasks();
		}
	}

	/**
	 * 
	 * @returns {int} The number of Current Task
	 */
	getNumberOftasks() {
		return this.numberOfTasks;
	}

	/**
	 * Increments and update the Number Of Task and Total Task
	 */
	updateNumberOftasks() {
		this.numberOfTasks += 1;
		this.totalNumberOfTasks += 1;
	}

	/**
	 * Increments the number of Completed Task and also update the display of the number of completed task at the bottom of the frame
	 */
	updateCompletedNumberOfTasks() {
		this.numberOfCompletedTask += 1;
		var completedTaskNumber = document.getElementById("completed-task-number");
		completedTaskNumber.textContent = this.numberOfCompletedTask;
	}

	/**
	 * Do not increment the number of Completed Task but display the completed number of task at the bottom of the frame
	 */
	displayNumberCompletedNumberOfTasks() {
		var completedTaskNumber = document.getElementById("completed-task-number");
		completedTaskNumber.textContent = this.numberOfCompletedTask;
	}

	/**
	 * Main component on adding task to the dictionary and then displaying it as well as incrementing the number of task
	 * @param {string} content The description of the task
	 */
	addTask(content) {
		let keyId = `task-${this.totalNumberOfTasks+1}`
		this.addItemToDictionary(keyId, content);
		this.displayTask(keyId, content)
		this.updateNumberOftasks();
	}

	/**
	 * Sub-component/helper function for addTask, this function adds the the parameter content to the dictionary giving it an ID specified in the parameter KeyId
	 * @param {string} keyId Unique ID to be used for the dictionary
	 * @param {string} content The description of the task
	 */
	addItemToDictionary(keyId, content) {
		this.taskDictionary[keyId] = content
		localStorage.setItem('task-items', JSON.stringify(this.taskDictionary));
	}

	/**
	 * Main component of creating and appending the elements to be displayed in the task-list div in the website, appends the task-list-item div to the task-list div
	 * @param {string} taskId Unique ID to be used for the dictionary 
	 * @param {string} content The description of the task
	 */
	displayTask(taskId, content) {
		// Initialize IDs
		let currentTaskId = taskId;
		let checkboxId = `checkbox-${currentTaskId}`;
		let editButtonId = `edit-button-${currentTaskId}`;
		let deleteButtonId = `delete-button-${currentTaskId}`
		// configure task-list-item div
		const task = document.createElement("div");
		task.id = currentTaskId;
		task.classList.add("frame__task-list-item");
		task.draggable = true;
		// configure checkbox input box
		const checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.id = checkboxId;
		checkbox.classList.add("checkmark-checkbox");
		// configure checkmark label tag
		const checkmarkLabel = document.createElement("label");
		checkmarkLabel.htmlFor = checkboxId;
		checkmarkLabel.classList.add("checkmark-label");
		// import checkmark image
		const checkMarkImage = document.createElement("i");
		checkMarkImage.classList.add("fas", "fa-check");
		// create and configure hidable/focusable div to contain buttons
		const focusableIconDiv = document.createElement("div");
		focusableIconDiv.classList.add("focus-show-button");
		// configure edit button inside focusableIconDiv
		const editButton = document.createElement("button");
		editButton.type = "button";
		editButton.id = editButtonId
		editButton.classList.add("edit-task-button");
		HelperFunctions.fetchSvgIcon('editicon.svg').then(
			(SvgIcon) => 
			editButton.innerHTML = SvgIcon)
		// configure delete button inside focusableIconDiv
		const deleteButton = document.createElement("button");
		deleteButton.type = "button";
		deleteButton.id = deleteButtonId;
		deleteButton.classList.add("delete-task-button");
		HelperFunctions.fetchSvgIcon('trashicon.svg').then(
			(SvgIcon) => 
			deleteButton.innerHTML = SvgIcon)
		// set the task description from the input box
		const taskDescription = document.createElement("span");
		taskDescription.textContent = content;

		// join/nest the elements together
		task.appendChild(checkbox);
		task.appendChild(checkmarkLabel).appendChild(checkMarkImage);
		focusableIconDiv.appendChild(editButton);
		focusableIconDiv.appendChild(deleteButton);
		task.appendChild(focusableIconDiv);
		task.appendChild(taskDescription);
		// Finally, append the newly created task-item to the task-list
		this.taskList.appendChild(task);
	}

	/**
	 * Main component of creating and appending the elements to be displayed in the task-list div in the website, appends the task-list-item div to the task-list div
	 * @param {string} taskId Unique ID to be used for the dictionary 
	 * @param {string} content The description of the task
	 */
	displayCompletedTask(taskId, content) {
		// Initialize IDs
		let currentTaskId = taskId;
		let checkboxId = `completed-checkbox-${currentTaskId}`;
		let editButtonId = `edit-button-${currentTaskId}`;
		let deleteButtonId = `delete-button-${currentTaskId}`
		// configure task-list-item div
		const task = document.createElement("div");
		task.id = currentTaskId;
		task.classList.add("frame__task-list-item");
		task.draggable = true;
		// configure checkbox input box
		const checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.checked = true;
		checkbox.id = checkboxId;
		checkbox.classList.add("checkmark-checkbox");
		// configure checkmark label tag
		const checkmarkLabel = document.createElement("label");
		checkmarkLabel.htmlFor = checkboxId;
		checkmarkLabel.classList.add("checkmark-label");
		// import checkmark image
		const checkMarkImage = document.createElement("i");
		checkMarkImage.classList.add("fas", "fa-check");

		// create and configure hidable/focusable div to contain buttons
		const focusableIconDiv = document.createElement("div");
		focusableIconDiv.classList.add("focus-show-button");
		// configure edit button inside focusableIconDiv
		const editButton = document.createElement("button");
		editButton.type = "button";
		editButton.id = editButtonId
		editButton.classList.add("edit-task-button");
		fetch('assets/svgs/editicon.svg').then(response => response.text()).then(data => {editButton.innerHTML = data;}).catch(error => console.error(error));
		// configure delete button inside focusableIconDiv
		const deleteButton = document.createElement("button");
		deleteButton.type = "button";
		deleteButton.id = deleteButtonId;
		deleteButton.classList.add("delete-task-button");
		fetch('assets/svgs/trashicon.svg').then(response => response.text()).then(data => {deleteButton.innerHTML = data;}).catch(error => console.error(error));
		// set the task description from the input box
		const taskDescription = document.createElement("span");
		taskDescription.textContent = content;

		// join/nest the elements together
		task.appendChild(checkbox);
		task.appendChild(checkmarkLabel).appendChild(checkMarkImage);
		focusableIconDiv.appendChild(editButton);
		focusableIconDiv.appendChild(deleteButton);
		task.appendChild(focusableIconDiv);
		task.appendChild(taskDescription);
		// Finally, append the newly created task-item to the task-list
		this.taskList.appendChild(task);
	}

	//TEMPORARY
	deleteAllTask() {
		// Gets the parent node (div that contains the checkbox) then remove it from the page and update localStorage
		this.taskDictionary = {};
		localStorage.setItem("task-items", JSON.stringify(this.taskDictionary))
		localStorage.setItem("completed-task-items", JSON.stringify(this.taskDictionary))
	}

	// deleteTask(targetElementId) {
	// 	const parentNode  = document.getElementById(targetElementId).parentElement.parentElement
	// 	this.taskDictionary = {};
	// 	localStorage.setItem("task-items", JSON.stringify(this.taskDictionary))
	// 	localStorage.setItem("completed-task-items", JSON.stringify(this.taskDictionary))
	// }

	// /**
	//  * Deletes the completed task
	//  * @param {string} targetElementId the ID of the completed task element that is to be deleted 
	//  */
	// deleteCompletedTask(targetElementId) {
	// 	// Gets the parent node (div that contains the checkbox) then remove it from the page and update localStorage
	// 	const  parentNode = document.getElementById(targetElementId).parentElement
	// 	delete this.taskDictionary[targetElementId];
	// 	localStorage.setItem("completed-task-items", JSON.stringify(this.taskDictionary))
	// 	parentNode.remove();
	// }


	/**
	 * Completes the task after the user has "checked" the checkbox
	 * Gets the parent node of the "checked" checkbox then clone it
	 * Assigns a new Id for the checkbox/checkbox label to differentiate it with uncompleted task
	 * Deletes the parent node, removing it from being displayed
	 * Adds the text content of the - to be deleted element - to the completedTaskDictionary with the newly generated Id
	 * Removes the parentNode, and append the cloned parentNode to the completed-task-list div, this displays the completed task from task-list div to the completed-task-list div
	 * Sets the localStorage to store the changes, then update the completed number of tasks and its display
	 * @param {string} targetElementId the ID of the task element to be completed
	 */
	completeTask(targetElementId) {
		const parentNode = document.getElementById(targetElementId).parentElement;
		const parentNodeClone = parentNode.cloneNode(true);

		const newtargetElementId = `completed-checkbox-${targetElementId}`

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

	/**
	 * Uncompletes the task after the user has "unchecked" the checkbox
	 * Gets the parent node of the "unchecked" checkbox then clone it
	 * Assigns a new Id for the checkbox/checkbox label to differentiate it with uncompleted task
	 * Deletes the parent node, removing it from being displayed
	 * Adds the text content of the - to be deleted element - to the taskDictionary with the reverted Id
	 * Removes the parentNode, and append the cloned parentNode to the task-list div, this displays the uncompleted task from completed-task-list div to the task-list div
	 * Sets the localStorage to store the changes, then decrement the completed number of tasks and its display
	 * @param {string} targetElementId the ID of the task element to be completed
	 */
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


// EVENT LISTENERS

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
		console.log(targetElementId);
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
	taskInstance.deleteAllTask();
});

// function handleDeleteButtons(event) {
// 	if (event.target && event.target.classList.contains("delete-task-button")) {
// 		const  targetElementId = event.target.id;

// 	}
// }


document.addEventListener("DOMContentLoaded", function() {
	attachEventListeners();
});