import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (newCategory: Categories) => {
    setToDos((prev) => {
      const targetIdx = prev.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: newCategory };
      const newToDos = [
        ...prev.slice(0, targetIdx),
        newToDo,
        ...prev.slice(targetIdx + 1),
      ];
      return newToDos;
    });
  };
  const onClickDel = () => {
    setToDos((prev) => {
      //   const targetIdx = prev.findIndex((toDo) => toDo.id === id);
      //   const newToDos = [
      //     ...prev.slice(0, targetIdx),
      //     ...prev.slice(targetIdx + 1),
      //   ];
      const newToDos = prev.filter((toDo) => toDo.id !== id);
      return newToDos;
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== Categories.DOING && (
        <button onClick={() => onClick(Categories.DOING)}>Doing</button>
      )}
      {category !== Categories.TO_DO && (
        <button onClick={() => onClick(Categories.TO_DO)}>To Do</button>
      )}
      {category !== Categories.DONE && (
        <button onClick={() => onClick(Categories.DONE)}>Done</button>
      )}
      <button onClick={onClickDel}>❌</button>
    </li>
  );
}

export default ToDo;
