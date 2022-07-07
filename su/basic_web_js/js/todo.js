const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));   //array를 string로 변경해서 local storage에 저장
}

function deleteDo(event) {
    const li = event.target.parentElement;//target은 html element, parentElement는 클릭된 element의 부모
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDos();
}

function paintToDo(newTodo) {
    const li = document.createElement("li");    //li 생성
    li.id = newTodo.id;
    const span = document.createElement("span");    //span 생성
    span.innerText = newTodo.text;   //span에 Todo 넣기
    const button = document.createElement("button");
    button.innerText = "x";
    button.addEventListener("click", deleteDo);
    li.appendChild(span);   //li에 span 넣기
    li.appendChild(button);
    toDoList.appendChild(li);   //ul에 li넣기
}

function handleToDoSubmit(event){
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value="";
    const newTodoObj = {
        text:newTodo,
        id: Date.now(),
    }
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos); //string 을 배열로 변환
    toDos = parsedToDos;    
    parsedToDos.forEach(paintToDo);
    //parsedToDos.forEach((item) => console.log("this is the turn of ", item));
}

