import { useState} from "react";
import { useKanban } from "./KanbanContext";


function TaskModal({taskId, onClose} : {taskId: string, onClose: () => void}){
 const {state, dispatch} = useKanban();
 const task = state.tasks[taskId];

 const [title, setTitle] = useState<string>(task.content);
 const [description, setDescription] = useState<string>(task.description || '');

 function handleSave(){
  dispatch({
   type: 'edit-task',
   taskId,
   updatedFields: 
   {content: title, 
    description: description},
  });
  onClose();
 }

 return(
  <div className = "modal">
   <div className = "modal-content">
    <h2>Edit Task</h2>
    <input value = {title} onChange={(e) => setTitle(e.target.value)} placeholder="Title"/>
    <textarea value = {description} onChange={(e) => setDescription(e.target.value)} placeholder = "Description" />
    <button onClick = {handleSave}>Save</button>
    <button onClick = {onClose}>Cancel</button>
   </div>
  </div>
 )
}



export default TaskModal