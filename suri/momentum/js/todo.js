const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector("#todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
    const li = event.target.parentElement;
    toDos = toDos.filter((todo) => todo.id !== parseInt(li.id));
    li.remove(); //li를 없애야지 정확한 정보까지가 다 없어진다.
    saveToDos();
}

function paintToDo(newToDo) {
    const li = document.createElement("li");
    li.id = newToDo.id;
    const span = document.createElement("span");
    span.innerText = newToDo.text;
    const button = document.createElement("button");
    button.innerText = "❌";
    button.addEventListener("click", deleteToDo); //클릭이 들어오면 해당 li를 삭제한다. submit이벤트를 감지하는데 밑에 있어야 하는 것이 아닌가?
    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
    event.preventDefault();
    const newToDo = toDoInput.value; //입력받은 값을 저장한다.
    toDoInput.value = ""; //입력받는 칸을 초기화한다.
    const newToDoObj = {
        text: newToDo,
        id: Date.now(),
    }
    toDos.push(newToDoObj); //toDos array에 저장한다.
    paintToDo(newToDoObj); //방금 입력받은 todo 값을 표시한다.
    saveToDos(); //array를 localstorage에 저장한다.
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}
