import { useKanban } from "./KanbanContext";
import { useState } from "react";
import TaskModal from "./TaskModal";


function Task({taskId} : {taskId: string}){
 const {state} = useKanban();
 const task = state.tasks[taskId];
 const [isEditing, setIsEditing] = useState<boolean>(false)
 const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();

 return(
  <>
   <div className = {`task ${isOverdue ? 'overdue' : ''} ${task.priority ? `priority-${task.priority}` : ''}`} onClick ={() => setIsEditing(true)}>
    <strong>{task.content}</strong>
   </div>
   {isEditing && (<TaskModal taskId={taskId} onClose={() => setIsEditing(false)} isEditingInitial = {true}/>)}
  </>
 );
}

export default Task;