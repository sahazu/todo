"use strict";

const input = document.querySelector(".form__input");
const add = document.querySelector(".form__button");
const tasks = document.querySelector(".tasks");

class Task {
  _id;
  _name;
  _complete = false;
  _element;

  constructor(name) {
    this._name = name;
    this._id = Date.now();
    this.render();
  }

  render() {
    const task = document.createElement("div");
    task.classList.add("task");
    task.id = this._id;
    task.innerHTML = `
      <label class="task__checkbox">
          <input type="checkbox">
          <span class="checkmark"></span>
      </label>
      <span class="checkmark"></span>
      <div class="task__name">${this._name}</div>
      <div class="task__btns">
          <div class="task__delete"></div>
          <div class="task__edit"></div>
      </div>
    `;

    this._element = task;

    const delete_btn = task.querySelector(".task__delete");
    const task_name = task.querySelector(".task__name");
    const edit_btn = task.querySelector(".task__edit");
    const checkbox = task.querySelector(".checkmark");

    task_name.textContent = this._name;
    tasks.append(task);

    delete_btn.addEventListener("click", () => {
      this.delete();
    });

    edit_btn.addEventListener("click", () => {
      let newName = prompt("New name:");
      if (newName === "") {
        alert("Task name cannot be empty");
      } else {
        this._name = newName;
        task_name.textContent = newName;
      }
    });

    checkbox.addEventListener("click", () => {
      task.classList.toggle("complete");
      if ((this._complete = false)) this._complete = true;
      else if ((this._complete = true)) this._complete = false;
    });
  }

  get name() {
    return this._name;
  }
  get complete() {
    return this._complete;
  }

  set name(newName) {
    const task = document.getElementById(this._id);
    const task_name = task.querySelector(".task__name");
    if (newName === "") {
      throw new Error("Task name cannot be empty");
    } else {
      this._name = newName;
      task_name.textContent = newName;
    }
  }

  edit(newName) {
    this.name = newName;
  }
  delete() {
    document.getElementById(this._id).remove();
  }
}

add.addEventListener("click", function () {
  if (input.value.trim() === "") alert("Task name cannot be empty");
  else {
    new Task(input.value.trim());
    input.value = "";
  }
});
