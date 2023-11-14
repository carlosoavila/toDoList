// Select elements
const todoForm = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo-input")
const todoList = document.querySelector("#todo-list")
const searchInput = document.querySelector("#search-input")
const eraseBtn = document.querySelector("#erase-button")
const editForm = document.querySelector("#edit-form")
const editInput = document.querySelector("#edit-input")
const cancelEditBtn = document.querySelector("#cancel-edit-btn")
const filter = document.querySelector("#filter-select")
console.log(filter.value)

let oldInputValue


// Functions
const saveTodo = (text) => {
  const todo = document.createElement("div")
  todo.classList.add("todo")

  const todoTitle = document.createElement("h3")
  todoTitle.innerText = text

  const buttonCheck = document.createElement("button")
  buttonCheck.classList.add("finish-todo")
  const iconCheck = document.createElement("i")
  iconCheck.classList.add("fa-brand","fa-solid", "fa-check")
  buttonCheck.append(iconCheck)

  const buttonEdit = document.createElement("button")
  buttonEdit.classList.add("edit-todo")
  const iconEdit = document.createElement("i")
  iconEdit.classList.add("fa-brand","fa-solid", "fa-pen")
  buttonEdit.append(iconEdit)

  const buttonTrash = document.createElement("button")
  buttonTrash.classList.add("remove-todo")
  const iconTrash = document.createElement("i")
  iconTrash.classList.add("fa-brand","fa-solid", "fa-trash")
  buttonTrash.append(iconTrash)
  

  todo.append(todoTitle, buttonCheck, buttonEdit, buttonTrash)
  todoList.append(todo)

  todoInput.value = ""
  todoInput.focus()
  
}


const toggleForms = () => {
  editForm.classList.toggle("hide")
  todoForm.classList.toggle("hide")
  todoList.classList.toggle("hide")
}

const upDateTodo = (text) => {

  const todos = document.querySelectorAll(".todo")

  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h3")

    if(todoTitle.innerText === oldInputValue) {
      todoTitle.innerText = text
    }
  })
}


const searchTodo = (text) => {

  if(text) {
    const todos = document.querySelectorAll(".todo")

    todos.forEach((todo) => {
      let todoTitle = todo.querySelector("h3")
      if(!todoTitle.innerText.includes(text)) {
        todo.style.display = "none"
        console.log(todo)
      } 
    })

  } else if (text === "") {
    const todos = document.querySelectorAll(".todo")
    todos.forEach((todo) => {    
      todo.style.display = "flex"
    })
  } 
}

// Events

todoForm.addEventListener("submit", (e) => {
  e.preventDefault()
  
  const todoValue = todoInput.value

  if(todoValue) {
    saveTodo(todoValue)
  }
  
})

document.addEventListener("click", (e) => {
  const targetEl = e.target
  const parentEl = targetEl.closest("div")
  let todoTitle

  if(parentEl && parentEl.querySelector("h3")) {
    todoTitle = parentEl.querySelector("h3").innerText
  }

  if(targetEl.classList.contains("finish-todo")) {
    parentEl.classList.toggle("done")
  }
  console.log(searchInput.value)
  if(targetEl.classList.contains("remove-todo")) {
    parentEl.remove()
  }

  if(targetEl.classList.contains("edit-todo")) {
    toggleForms()

    editInput.value = todoTitle
    oldInputValue = todoTitle
  }
})

cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault()

  toggleForms()
})


editForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const editInputValue = editInput.value

  if(editInputValue) {
    upDateTodo(editInputValue)
  }

  toggleForms()
})

searchInput.addEventListener("keyup", (e) => {
  e.preventDefault()
  searchTodo(searchInput.value)
})

eraseBtn.addEventListener('click', (e) => {
  e.preventDefault()
  searchInput.value = ""
  searchTodo(searchInput.value)
})

filter.addEventListener("click", (e) => {
  e.preventDefault()
  if(filter.value == "done") {
    console.log(todoList)
    const todos = document.querySelectorAll(".todo")
    todos.forEach((todo) => {
      if(!todo.classList.contains("done")) {
      todo.style.display = "none"
    }
    })
  } if(filter.value == "todo") {
    const todos = document.querySelectorAll(".done")
    todos.forEach((todo) => {
      if(todo.classList.contains("done")) {
        todo.style.display = "none"
      }
    })
  } 
})