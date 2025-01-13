# Task Manager Project

In this project, we're going to create a simple task management system. We'll use JavaScript to manage tasks, and along the way, you'll get to practice different JavaScript concepts. The project is split into different stages, and each stage introduces a new concept that you'll use in a real project.

## Project Stages:

### Stage 1: Setting up the basic structure for tasks

First, you need to create a list of tasks and store them in an array. Each task should have a title, description, completed status, and due date. You’ll also need to filter tasks into completed and not completed categories.

**What you need to do:**
- Create an array to store tasks.
- Each task should have properties like `title`, `description`, `completed`, and `dueDate`.
- Use conditional statements to separate completed and not completed tasks.

```javascript
let tasks = [
  { title: "Task 1", description: "Do the dishes", completed: false, dueDate: new Date('2025-01-15') },
  { title: "Task 2", description: "Complete homework", completed: true, dueDate: new Date('2025-01-16') }
];

function showTasks() {
  tasks.forEach(task => {
    console.log(`${task.title} - Completed: ${task.completed}`);
  });
}

showTasks();
```

### Stage 2: Handling Errors

In this stage, we’ll learn how to handle errors. For example, if someone tries to add a task without a title, we should throw an error. We’ll use try...catch to handle these errors.

**What you need to do:**
- Use `try...catch` for error handling.
- If someone tries to add a task without a title, throw an error.

```javascript
function addTask(title, description) {
  try {
    console.log("Task added successfully!");
  } catch (error) {
    console.log("Error:", error.message);
  }
}

addTask("", "This task has no title");  // Will throw an error
addTask("Task 3", "This task is okay");  // Task will be added
```
### Stage 3: Functions for Task Management

Now, we’ll create functions to manage tasks, like marking them as completed. You’ll also get familiar with the concept of scope and how to work with local and global variables.

**What you need to do:**

- Create a function to mark tasks as completed.
- Use a `for` loop to search through the tasks and change their status.

```javascript
function completeTask(taskTitle) {
  let taskFound = false;
  if (!taskFound) {
    console.log(`Task with title "${taskTitle}" not found`);
  }
}

completeTask("Task 1");  // Task 1 marked as completed
completeTask("Task 4");  // Task with title "Task 4" not found
```

### Stage 4: Inheritance in JavaScript

In this stage, we’ll use inheritance. We want to create two types of tasks: regular tasks and priority tasks. The regular task class will have common properties, and the priority task class will inherit from it and add a priority property.

**What you need to do:**

- Create a class for regular tasks.
- Create a class for priority tasks that inherits from the regular task class and adds a priority property.

```javascript
let priorityTask = new PriorityTask("Critical Task", "This task has high priority", new Date('2025-01-17'), "High");
console.log(priorityTask.getDetails());
```

### Stage 5: Working with Arrays and Methods

In this stage, you'll work with array methods like `filter` and `map`. We’ll use these methods to filter tasks based on their status (completed or not completed), and also to display task titles using map.

**What you need to do:**

- Use filter to separate completed and not completed tasks.
- Use map to display the titles of all tasks.

### Stage 6: Working with Dates

Now we’ll compare dates. We’ll filter tasks that are overdue based on their due date. This way, we can easily identify overdue tasks.

**What you need to do:**

- Use `new Date()` to get the current date and compare it with task due dates.
- Filter tasks that are overdue (past due date and not completed).

### Stage 7: Using JSON and ES6 Features

In this final stage, we’ll work with JSON to store and load task data. You’ll also get to use new ES6 features like `let`, `const`, and `arrow functions`.

**What you need to do:**

- Convert the tasks array into `JSON` format.
- Use `JSON.stringify` to convert data into JSON and `JSON.parse` to turn it back into an array.
