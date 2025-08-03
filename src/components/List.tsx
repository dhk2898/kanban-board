import { Draggable, Droppable } from "@hello-pangea/dnd";
import { useKanban } from "./KanbanContext";
import Task from "./Task.tsx";
import { useState, useRef, useEffect } from "react";
import {v4 as uuidv4} from 'uuid';

function List ({listId}: {listId: string}){
 const{state, dispatch} = useKanban();
 const list = state.lists[listId];
 const [newTaskContent, setNewTaskContent] = useState<string>('');
 const taskListRef = useRef<HTMLDivElement>(null);

 const sortedTaskIds = [...list.taskIds].sort((a, b) => {
  const taskA = state.tasks[a];
  const taskB = state.tasks[b];

  const priorityOrder = {high: 3, medium: 2, low: 1, null: 0};

  const priorityA = taskA.priority ? priorityOrder[taskA.priority] : 0;
  const priorityB = taskB.priority ? priorityOrder[taskB.priority] : 0;

  if (priorityA !== priorityB){
    return priorityB - priorityA;
  }

  // date sorting for priority overlaps
  if (taskA.dueDate && taskB.dueDate)
  {
    return new Date(taskA.dueDate).getTime() - new Date(taskB.dueDate).getTime();
  }

  return 0;
 })

 function handleAddTask(){
  let taskContent: string;
  if (!newTaskContent.trim()){
    taskContent = `Task ${state.taskCounter}`
  } else {
    taskContent = newTaskContent
  }
  const task = {id: uuidv4(), content: taskContent};
  dispatch({type: 'add-task', listId, task});
  setNewTaskContent('');
 }

 useEffect(() =>{
    const element = taskListRef.current;
    if (element){
        element.scrollTop = element.scrollHeight;
    }
 }, [list.taskIds.length]);

 return(
 <div className = 'list-title'>
  <h3>{list.title}</h3>
  <input value = {newTaskContent} onChange = {e => setNewTaskContent(e.target.value)} placeholder="New Task" className = 'task'/>
  <button onClick = {handleAddTask} className = 'task'>Add Task</button>
  <Droppable droppableId={listId} type="task">
    {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.droppableProps}  className={`task-list ${snapshot.isDraggingOver ? 'is-dragging-over' : ''}`}>
        {sortedTaskIds.map((taskId, index) => (
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
 </div>)
}

export default List;