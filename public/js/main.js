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
import { z } from 'https://cdn.jsdelivr.net/npm/zod@3.11.6/+esm'
var taskSchema = z.object({
    title: z.string().min(1, "Title cannot be empty!"),
    description: z.string().min(1, "Description cannot be empty!"),
    completed: z.boolean(),
    dueDate: z.string().min(1, "Due date must be a valid date"),
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
        var userinput = void 0;
        if (priority.value.trim()) {
            userinput = new PriorityTask(title.value, description.value, completed.checked, dueDate.value, priority.value);
        }
        else {
            userinput = new RegularTask(title.value, description.value, completed.checked, dueDate.value);
        }
        taskSchema.parse({
            title: userinput.title,
            description: userinput.description,
            completed: userinput.completed,
            dueDate: userinput.dueDate,
        });
        userinputs.push(userinput);
        var source = taskTemplate.innerHTML;
        console.log(source);
        var template = Handlebars.default.compile(source);
        var html = template({ tasks: userinputs });
        document.getElementById("task-container").innerHTML = html;
        userinputs.forEach(function (task) {
            console.log(task.getDetails());
        });
        console.log("Task added successfully!");
    }
    catch (error) {
        console.error("Error:", error.message);
    }
    function completedtask(tasktitle) {
        var taskfound = false;
        for (var i = 0; i < userinputs.length; i++) {
            if (userinputs[i].title === tasktitle) {
                userinputs[i].completed = true;
                taskfound = true;
                console.log("Task with title \"".concat(tasktitle, "\" marked as completed"));
                break;
            }
        }
        if (!taskfound) {
            console.log("Task with title \"".concat(tasktitle, "\" not found"));
        }
    }
    completedtask(title.value);
});
