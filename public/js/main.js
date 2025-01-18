var userinputs = [];
var form = document.getElementById('myform');
var title = document.getElementById("title");
var description = document.getElementById("description");
var completed = document.getElementById("completed");
var dueDate = document.getElementById("dueDate");
form.addEventListener('submit', function (event) {
    event.preventDefault();
    var userinput = { title: title.value, description: description.value, completed: completed.value, dueDate: dueDate.value };
    userinputs.push(userinput);
    userinputs.forEach(function (userinputs) {
        if (completed.value === true) {
            console.log("completed task: title:".concat(userinputs.title, " -desciption: ").concat(userinputs.description, " - Completed: ").concat(userinputs.completed, " - Due Date: ").concat(userinputs.dueDate));
        }
        else {
            console.log("uncompleted task: title:".concat(userinputs.title, " -desciption: ").concat(userinputs.description, " - Completed: ").concat(userinputs.completed, " - Due Date: ").concat(userinputs.dueDate));
        }
    });
});
});
})
