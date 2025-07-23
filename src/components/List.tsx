import { Draggable, Droppable } from "@hello-pangea/dnd";
import { useKanban } from "./KanbanContext";
import Task from "./Task.tsx";
import { useState } from "react";
import {v4 as uuidv4} from 'uuid';

function List ({listId}: {listId: string}){
 const{state, dispatch} = useKanban();
 const list = state.lists[listId];
 const [newTaskContent, setNewTaskContent] = useState('');

 function handleAddTask(){
  if (!newTaskContent.trim()) return;
  const task = {id: uuidv4(), content: newTaskContent};
  dispatch({type: 'add-task', listId, task});
  setNewTaskContent('');
 }

 return(
 <div className = 'list-container'>
  <h3>{list.title}</h3>
  <Droppable droppableId={listId} type="task">
    {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
        {list.taskIds.map((taskId, index) => (
            <Draggable draggableId={taskId} index={index} key={taskId}>
            {(provided) => (
                <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                >
                <Task taskId={taskId} />
                </div>
            )}
            </Draggable>
        ))}
        {provided.placeholder}
        </div>
    )}
  </Droppable>
  <input value = {newTaskContent} onChange = {e => setNewTaskContent(e.target.value)} placeholder="New Task"/>
  <button onClick = {handleAddTask}>Add Task</button>
 </div>)
}

export default List;