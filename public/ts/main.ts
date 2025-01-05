let userinputs: {title: string, description: string, completed: boolean,dueDate:number}[] = [];

const form = document.getElementById('form') as HTMLFormElement;
const title = document.getElementById("title")as HTMLFormElement;
const description = document.getElementById("description")as HTMLFormElement;
const completed = document.getElementById("completed")as HTMLFormElement;
const dueDate = document.getElementById("dueDate")as HTMLFormElement;

form.addEventListener('submit',(event) => {
  event.preventDefault();
})

const userinput= {title:title.value , description:description.value,completed:completed.value,dueDate:dueDate.value}
userinputs.push(userinput);
console.log(userinputs);





