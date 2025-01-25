import { z } from 'https://cdn.jsdelivr.net/npm/zod@3.11.6/+esm';
var taskSchema = z.object({
    title: z.string().min(1, "Title cannot be empty!"),
    description: z.string().min(1, "Description cannot be empty!"),
    completed: z.boolean(),
    dueDate: z.string().min(1, "Due date must be a valid date"),
});
var userinputs = [];
var form = document.getElementById("myform");
var title = document.getElementById("title");
var description = document.getElementById("description");
var completed = document.getElementById("completed");
var dueDate = document.getElementById("dueDate");
var taskTemplate = document.getElementById("task-template");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    try {
        if (!title.value.trim() || !description.value.trim()) {
            throw new Error("Title and Description cannot be empty!");
        }
        var userinput = {
            title: title.value,
            description: description.value,
            completed: completed.checked,
            dueDate: dueDate.value,
        };
        taskSchema.parse(userinput);
        userinputs.push(userinput);
        var source = taskTemplate.innerHTML;
        var template = Handlebars.default.compile(source);
        var html = template({ tasks: userinputs });
        document.getElementById("task-container").innerHTML = html;
        userinputs.forEach(function (userinput) {
            if (userinput.completed) {
                console.log("Completed task: title: ".concat(userinput.title, " - description: ").concat(userinput.description, " - Completed: ").concat(userinput.completed, " - Due Date: ").concat(userinput.dueDate));
            }
            else {
                console.log("Uncompleted task: title: ".concat(userinput.title, " - description: ").concat(userinput.description, " - Completed: ").concat(userinput.completed, " - Due Date: ").concat(userinput.dueDate));
            }
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
