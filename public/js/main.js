var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { z } from "https://cdn.jsdelivr.net/npm/zod@3.11.6/+esm"
var taskSchema = z.object({
    title: z.string().min(1, "Title cannot be empty!"),
    description: z.string().min(1, "Description cannot be empty!"),
    completed: z.boolean(),
    dueDate: z.instanceof(Date)
        .refine(function (date) { return !isNaN(date.getTime()); }, "Due date must be a valid date"),
});
var RegularTask = /** @class */ (function () {
    function RegularTask(title, description, completed, dueDate) {
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.dueDate = dueDate;
    }
    RegularTask.prototype.getDetails = function () {
        return "title:".concat(this.title, " ,description :").concat(this.description, ", completed:").concat(this.completed, ",dueDate:").concat(this.dueDate);
    };
    return RegularTask;
}());
var PriorityTask = /** @class */ (function (_super) {
    __extends(PriorityTask, _super);
    function PriorityTask(title, description, completed, dueDate, priority) {
        var _this = _super.call(this, title, description, completed, dueDate) || this;
        _this.priority = priority;
        return _this;
    }
    PriorityTask.prototype.getDetails = function () {
        return "".concat(_super.prototype.getDetails.call(this), ", priority:").concat(this.priority);
    };
    return PriorityTask;
}(RegularTask));
var userinputs = [];
var loadTasksFromLocalStorage = function () {
    var sevetasks = localStorage.getItem("tasks");
    if (sevetasks) {
        try {
            userinputs = JSON.parse(sevetasks).map(function (task) {
                if (task.priority) {
                    return new PriorityTask(task.title, task.description, task.completed, new Date(task.dueDate), task.priority);
                }
                else {
                    return new RegularTask(task.title, task.description, task.completed, new Date(task.dueDate));
                }
            });
        }
        catch (error) {
            console.error("Error parsing tasks from local storage:", error);
        }
    }
};
var saveTasksToLocalStorage = function () {
    var tasksJson = JSON.stringify(userinputs);
    localStorage.setItem("tasks", tasksJson);
};
var form = document.getElementById("myform");
var title = document.getElementById("title");
var description = document.getElementById("description");
var completed = document.getElementById("completed");
var dueDate = document.getElementById("dueDate");
var priority = document.getElementById("priority");
var taskTemplate = document.getElementById("task-template");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    try {
        if (!title.value.trim() || !description.value.trim()) {
            throw new Error("Title and Description cannot be empty!");
        }
        var dueDatevalue = new Date(dueDate.value);
        var currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        if (dueDatevalue > currentDate) {
            throw new Error("Due date cannot be in the future!");
        }
        var userinput = void 0;
        if (priority.value.trim()) {
            userinput = new PriorityTask(title.value, description.value, completed.checked, dueDatevalue, priority.value);
        }
        else {
            userinput = new RegularTask(title.value, description.value, completed.checked, dueDatevalue);
        }
        taskSchema.parse({
            title: userinput.title,
            description: userinput.description,
            completed: userinput.completed,
            dueDate: userinput.dueDate,
        });
        userinputs.push(userinput);
        saveTasksToLocalStorage();
        updateTaskList();
        form.reset();
        console.log("Task added successfully!");
    }
    catch (error) {
        console.error("Error:", error.message);
    }
});
function completedtask() {
    var currentDate = new Date();
    var overdueTasks = userinputs.filter(function (task) { return task.dueDate < currentDate && !task.completed; });
    var completed = userinputs.filter(function (task) { return task.completed; });
    var uncompleted = userinputs.filter(function (task) { return !task.completed; });
    var completedTasks = completed.map(function (task) { return task.title; });
    var uncompletedTasks = uncompleted.map(function (task) { return task.title; });
    var overdueTaskTitles = overdueTasks.map(function (task) { return task.title; });
    console.log("completed Tasks:", completedTasks);
    console.log("uncompleted Tasks:", uncompletedTasks);
    console.log("overdue Tasks:", overdueTaskTitles);
}
function updateTaskList() {
    var source = taskTemplate.innerHTML;
    var template = Handlebars.default.compile(source);
    var html = template({ tasks: userinputs });
    document.getElementById("task-container").innerHTML = html;
    var editButtons = document.querySelectorAll(".edit");
    var deleteButtons = document.querySelectorAll(".delete");
    editButtons.forEach(function (button) {
        button.addEventListener("click", function (event) {
            var taskTitle = event.target.dataset.title;
            var taskToEdit = userinputs.find(function (task) { return task.title === taskTitle; });
            if (taskToEdit) {
                title.value = taskToEdit.title;
                description.value = taskToEdit.description;
                completed.checked = taskToEdit.completed;
                dueDate.value = taskToEdit.dueDate.toISOString().split("T")[0];
                priority.value = taskToEdit.priority || "";
                userinputs = userinputs.filter(function (task) { return task.title !== taskTitle; });
            }
        });
    });
    deleteButtons.forEach(function (button) {
        button.addEventListener("click", function (event) {
            var taskTitle = event.target.dataset.title;
            userinputs = userinputs.filter(function (task) { return task.title !== taskTitle; });
            saveTasksToLocalStorage();
            updateTaskList();
            console.log("Task with title \"".concat(taskTitle, "\" deleted."));
        });
    });
    completedtask();
}
loadTasksFromLocalStorage();
