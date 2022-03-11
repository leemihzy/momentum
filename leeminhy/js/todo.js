const toDoForm = document.getElementById('todo-form')
const toDoInput = toDoForm.querySelector('input')
const toDoList = document.getElementById('todo-list')

const TODOS_KEY = 'TODOs';
let toDos = [];

function saverToDos() {
  localStorage.setItem("TODOs", JSON.stringify(toDos))
}

function deleteTodo(e) {
  const li = e.target.parentElement;
  li.remove();

  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  console.log(toDos)
  saverToDos();
}

function paintToDo(newTodo) {
  const li = document.createElement('li');
  li.id = newTodo.id;
  const span = document.createElement('span')
  span.innerText = newTodo.text;
  const btn = document.createElement('button')
  // btn.innerText = '✖️';
  btn.innerText = '☑️';
  btn.addEventListener('click', deleteTodo);

  li.appendChild(btn);
  li.appendChild(span);
  toDoList.appendChild(li);
}

function handleToDoSubmit(e) {
  e.preventDefault();
  const newTodo = toDoInput.value; // 현재값을 새로운 변수에 복사
  toDoInput.value = ''; // newTodo 값에는 영향 없음(newTodo와 값 다름)
  const newToDoObj = {
    text: newTodo,
    id: Date.now(),
  }

  toDos.push(newToDoObj);
  paintToDo(newToDoObj);
  saverToDos();
}

toDoForm.addEventListener('submit', handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY); 

if(savedToDos !== null) {
  const pasedToDos = JSON.parse(savedToDos);
  toDos = pasedToDos;
  
  pasedToDos.forEach(paintToDo);
}

toDoInput.addEventListener("keyup", function(e) {
  if (toDoInput.value.length >= 35) {
    alert("todo는 35자 이내로 작성해 주세요");
    toDoInput.focus();
  } 
});
