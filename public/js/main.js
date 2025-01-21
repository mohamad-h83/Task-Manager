var userinputs = [];
var form = document.getElementById("myform");
var title = document.getElementById("title");
var description = document.getElementById("description");
var completed = document.getElementById("completed");
var dueDate = document.getElementById("dueDate");
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
        userinputs.push(userinput);
        userinputs.forEach(function (userinputs) {
            if (userinputs.completed === true) {
                console.log("completed task: title:".concat(userinputs.title, " -desciption: ").concat(userinputs.description, " - Completed: ").concat(userinputs.completed, " - Due Date: ").concat(userinputs.dueDate));
            }
            else {
                console.log("uncompleted task: title:".concat(userinputs.title, " -desciption: ").concat(userinputs.description, " - Completed: ").concat(userinputs.completed, " - Due Date: ").concat(userinputs.dueDate));
            }
        });
        console.log("Task added successfully!");
    }
    catch (error) {
        console.error("Error", error.message);
    }
    function completedtask(tasktitle) {
        var taskfound = false;
        for (var i = 0; i < userinputs.length; i++) {
            if (userinputs[i].title === tasktitle) {
                userinputs[i].completed === true;
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


