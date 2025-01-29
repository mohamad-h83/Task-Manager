import { z } from "zod";
import Handlebars, { log } from "handlebars";

const taskSchema = z.object({
  title: z.string().min(1, "Title cannot be empty!"),
  description: z.string().min(1, "Description cannot be empty!"),
  completed: z.boolean(),
  dueDate: z
    .instanceof(Date)
    .refine((date) => !isNaN(date.getTime()), "Due date must be a valid date"),
});
class RegularTask {
  title: string;
  description: string;
  completed: boolean;
  dueDate: Date;

  constructor(
    title: string,
    description: string,
    completed: boolean,
    dueDate: Date
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
    dueDate: Date,
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

const loadTasksFromLocalStorage = () => {
  const sevetasks = localStorage.getItem("tasks");
  if (sevetasks) {
    try {
      userinputs = JSON.parse(sevetasks).map((task: any) => {
        if (task.priority) {
          return new PriorityTask(
            task.title,
            task.description,
            task.completed,
            new Date(task.dueDate),
            task.priority
          );
        } else {
          return new RegularTask(
            task.title,
            task.description,
            task.completed,
            new Date(task.dueDate)
          );
        }
      });
    } catch (error) {
      console.error("Error parsing tasks from local storage:", error);
    }
  }
};

const saveTasksToLocalStorage = ()=>{
 const tasksJson= JSON.stringify(userinputs);
 localStorage.setItem("tasks",tasksJson);

};

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

    const dueDatevalue = new Date(dueDate.value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (dueDatevalue > currentDate) {
      throw new Error("Due date cannot be in the future!");
    }

    let userinput;

    if (priority.value.trim()) {
      userinput = new PriorityTask(
        title.value,
        description.value,
        completed.checked,
        dueDatevalue,
        priority.value
      );
    } else {
      userinput = new RegularTask(
        title.value,
        description.value,
        completed.checked,
        dueDatevalue
      );
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
  } catch (error: any) {
    console.error("Error:", error.message);
  }
});
function completedtask() {
  const currentDate = new Date();
  const overdueTasks = userinputs.filter(
    (task) => task.dueDate < currentDate && !task.completed
  );
  const completed = userinputs.filter((task) => task.completed);
  const uncompleted = userinputs.filter((task) => !task.completed);

  const completedTasks = completed.map((task) => task.title);
  const uncompletedTasks = uncompleted.map((task) => task.title);
  const overdueTaskTitles = overdueTasks.map((task) => task.title);

  console.log("completed Tasks:", completedTasks);
  console.log("uncompleted Tasks:", uncompletedTasks);
  console.log("overdue Tasks:", overdueTaskTitles);
}

function updateTaskList() {
  const source = taskTemplate.innerHTML;
  const template = Handlebars.compile(source);
  const html = template({ tasks: userinputs });
  document.getElementById("task-container")!.innerHTML = html;
  const editButtons = document.querySelectorAll(".edit");
  const deleteButtons = document.querySelectorAll(".delete");

  editButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const taskTitle = (event.target as HTMLButtonElement).dataset.title;
      const taskToEdit = userinputs.find((task) => task.title === taskTitle);
      if (taskToEdit) {
        title.value = taskToEdit.title;
        description.value = taskToEdit.description;
        completed.checked = taskToEdit.completed;
        dueDate.value = taskToEdit.dueDate.toISOString().split("T")[0];
        priority.value = (taskToEdit as PriorityTask).priority || "";
        userinputs = userinputs.filter((task) => task.title !== taskTitle);
      }
    });
  });

  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const taskTitle = (event.target as HTMLButtonElement).dataset.title;
      userinputs = userinputs.filter((task) => task.title !== taskTitle);
      saveTasksToLocalStorage();
      updateTaskList();
      console.log(`Task with title "${taskTitle}" deleted.`);
    });
  });
  completedtask();
}
loadTasksFromLocalStorage();
