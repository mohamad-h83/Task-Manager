let userinputs: {
  title: string;
  description: string;
  completed: boolean;
  dueDate: number;
}[] = [];

const form = document.getElementById("myform") as HTMLFormElement;
const title = document.getElementById("title") as HTMLFormElement;
const description = document.getElementById("description") as HTMLFormElement;
const completed = document.getElementById("completed") as HTMLFormElement;
const dueDate = document.getElementById("dueDate") as HTMLFormElement;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  try {
    if (!title.value.trim() || !description.value.trim()) {
      throw new Error("Title and Description cannot be empty!");
    }
    const userinput = {
      title: title.value,
      description: description.value,
      completed: completed.checked,
      dueDate: dueDate.value,
    };
    userinputs.push(userinput);

    userinputs.forEach((userinputs) => {
      if (userinputs.completed === true) {
        console.log(
          `completed task: title:${userinputs.title} -desciption: ${userinputs.description} - Completed: ${userinputs.completed} - Due Date: ${userinputs.dueDate}`
        );
      } else {
        console.log(
          `uncompleted task: title:${userinputs.title} -desciption: ${userinputs.description} - Completed: ${userinputs.completed} - Due Date: ${userinputs.dueDate}`
        );
      }
    });
    console.log("Task added successfully!");
  } catch (error: any) {
    console.error("Error", error.message);
  }
});




