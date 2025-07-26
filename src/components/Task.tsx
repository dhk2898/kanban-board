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
   </div>
   {isEditing && (<TaskModal taskId={taskId} onClose={() => setIsEditing(false)} isEditingInitial = {false}/>)}
  </>
 );
}

export default Task;