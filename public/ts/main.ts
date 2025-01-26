import { z } from "zod";
import Handlebars from "handlebars";

const taskSchema = z.object({
  title: z.string().min(1, "Title cannot be empty!"),
  description: z.string().min(1, "Description cannot be empty!"),
  completed: z.boolean(),
  dueDate: z.string().min(1, "Due date must be a valid date"),
});
class RegularTask {
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;

  constructor(
    title: string,
    description: string,
    completed: boolean,
    dueDate: string
  ) {
    this.title = title;
    this.description = description;
    this.completed = completed;
    this.dueDate = dueDate;
  }
  getDetails(): string {
    return `title:${this.title} ,description :${this.description}, completed:${this.completed},dueDate:${this.dueDate}`;
  }
}

class PriorityTask extends RegularTask {
  priority: string;
  constructor(
    title: string,
    description: string,
    completed: boolean,
    dueDate: string,
    priority: string
  ) {
    super(title, description, completed, dueDate);
    this.priority = priority;
  }
  getDetails(): string {
    return `${super.getDetails()}, priority:${this.priority}`;
  }
}
let userinputs: RegularTask[] = [];

const form = document.getElementById("myform") as HTMLFormElement;
const title = document.getElementById("title") as HTMLInputElement;
const description = document.getElementById("description") as HTMLInputElement;
const completed = document.getElementById("completed") as HTMLInputElement;
const dueDate = document.getElementById("dueDate") as HTMLInputElement;
const priority = document.getElementById("priority") as HTMLInputElement;

const taskTemplate = document.getElementById(
  "task-template"
) as HTMLScriptElement;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  try {
    if (!title.value.trim() || !description.value.trim()) {
      throw new Error("Title and Description cannot be empty!");
    }

    let userinput;

    if (priority.value.trim()) {
      userinput = new PriorityTask(
        title.value,
        description.value,
        completed.checked,
        dueDate.value,
        priority.value
      );
    } else {
      userinput = new RegularTask(
        title.value,
        description.value,
        completed.checked,
        dueDate.value
      );
    }

    taskSchema.parse({
      title: userinput.title,
      description: userinput.description,
      completed: userinput.completed,
      dueDate: userinput.dueDate,
    });

    userinputs.push(userinput);

    const source = taskTemplate.innerHTML;
    console.log(source);
    const template = Handlebars.compile(source);
    const html = template({ tasks: userinputs });
    document.getElementById("task-container")!.innerHTML = html;

    userinputs.forEach((task) => {
      console.log(task.getDetails());
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
