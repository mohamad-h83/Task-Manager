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
