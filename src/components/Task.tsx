import { useKanban } from "./KanbanContext";
import { useState } from "react";
import TaskModal from "./TaskModal";


function Task({taskId} : {taskId: string}){
 const {state} = useKanban();
 const task = state.tasks[taskId];
 const [isEditing, setIsEditing] = useState<boolean>(false)

 return(
  <>
   <div className = "task" onClick ={() => setIsEditing(true)}>
    <strong>{task.content}</strong>
    {task.description && <p>{task.description.slice(0, 40)}</p>}
   </div>
   {isEditing && (<TaskModal taskId={taskId} onClose={() => setIsEditing(false)}/>)}
  </>
 );
}

export default Task;