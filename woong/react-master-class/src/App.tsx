import styled, { createGlobalStyle } from "styled-components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { toDoState } from "./atoms";
import Board from "./Components/Board";
import Trashcan from "./Components/Trashcan";

const GlobalStyle = createGlobalStyle`
  /* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

* {
  box-sizing: border-box;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
  background-color: ${(props) => props.theme.bgColor};
  color: black;
}
a {
  text-decoration: none;
  color: inherit;
}
`;

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    if (!destination) return;
    if (destination.droppableId === "trashcan") {
      setToDos((prev) => {
        const boardCopy = [...prev[source.droppableId]];
        boardCopy.splice(source.index, 1);
        return {
          ...prev,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (destination.droppableId === source.droppableId) {
      // same board movement.
      setToDos((prev) => {
        const boardCopy = [...prev[source.droppableId]];
        const [popTodo] = boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, popTodo); // method 1
        return {
          ...prev,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (destination.droppableId !== source.droppableId) {
      // cross board movement.
      setToDos((prev) => {
        const sourceBoardCopy = [...prev[source.droppableId]];
        const taskObj = sourceBoardCopy[source.index];
        const destinationBoardCopy = [...prev[destination.droppableId]];
        sourceBoardCopy.splice(source.index, 1);
        destinationBoardCopy.splice(destination?.index, 0, taskObj); // method 2
        return {
          ...prev,
          [source.droppableId]: sourceBoardCopy,
          [destination.droppableId]: destinationBoardCopy,
        };
      });
    }
  };
  return (
    <>
      <GlobalStyle />
      <DragDropContext onDragEnd={onDragEnd}>
        <Trashcan />
        <Wrapper>
          <Boards>
            {Object.keys(toDos).map((boardId) => (
              <Board key={boardId} boardId={boardId} toDos={toDos[boardId]} />
            ))}
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;
