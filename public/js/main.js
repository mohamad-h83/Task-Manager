var userinputs = [];
var form = document.getElementById('form');
var title = document.getElementById("title");
var description = document.getElementById("description");
var completed = document.getElementById("completed");
var dueDate = document.getElementById("dueDate");
form.addEventListener('submit', function (event) {
    event.preventDefault();
});
var userinput = { title: title.value, description: description.value, completed: completed.value, dueDate: dueDate.value };
userinputs.push(userinput);
console.log(userinputs);
