import { z } from "zod";
import Handlebars from "handlebars";

const taskSchema = z.object({
  title: z.string().min(1, "Title cannot be empty!"),
  description: z.string().min(1, "Description cannot be empty!"),
  completed: z.boolean(),
  dueDate: z.string().min(1, "Due date must be a valid date"),
});

let userinputs: {
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
}[] = [];

const form = document.getElementById("myform") as HTMLFormElement;
const title = document.getElementById("title") as HTMLInputElement;
const description = document.getElementById("description") as HTMLInputElement;
const completed = document.getElementById("completed") as HTMLInputElement;
const dueDate = document.getElementById("dueDate") as HTMLInputElement;

const taskTemplate = document.getElementById("task-template") as HTMLScriptElement;

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

    taskSchema.parse(userinput);

    userinputs.push(userinput);

    const source = taskTemplate.innerHTML;
    console.log(source);
    
    const template = Handlebars.compile(source);
    const html = template({ tasks: userinputs });
    document.getElementById("task-container")!.innerHTML = html;

    userinputs.forEach((userinput) => {
      if (userinput.completed) {
        console.log(
          `Completed task: title: ${userinput.title} - description: ${userinput.description} - Completed: ${userinput.completed} - Due Date: ${userinput.dueDate}`
        );
      } else {
        console.log(
          `Uncompleted task: title: ${userinput.title} - description: ${userinput.description} - Completed: ${userinput.completed} - Due Date: ${userinput.dueDate}`
        );
      }
    });
    console.log("Task added successfully!");
  } catch (error: any) {
    console.error("Error:", error.message);
  }

  function completedtask(tasktitle: string) {
    let taskfound = false;
    for (let i = 0; i < userinputs.length; i++) {
      if (userinputs[i].title === tasktitle) {
        userinputs[i].completed = true;
        taskfound = true;
        console.log(`Task with title "${tasktitle}" marked as completed`);
        break;
      }
    }
    if (!taskfound) {
      console.log(`Task with title "${tasktitle}" not found`);
    }
  }

  completedtask(title.value);
});

