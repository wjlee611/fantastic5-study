import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 150px;
  height: 150px;
  padding: 10px 0px;
  background-color: tomato;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 10px;
  right: 10px;
  overflow: hidden;
`;
const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;
interface IAreaProps {
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}
const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "tomato"
      : props.draggingFromThisWith
      ? "#b2bec3"
      : props.theme.boardColor};
  flex-grow: 1;
  transition: background-color 0.3s ease-out;
  padding: 20px;
`;

function Trashcan() {
  return (
    <Wrapper>
      <Title>Trash Can</Title>
      <Droppable droppableId="trashcan">
        {(provider, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
            ref={provider.innerRef}
            {...provider.droppableProps}
          >
            {provider.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Trashcan;
