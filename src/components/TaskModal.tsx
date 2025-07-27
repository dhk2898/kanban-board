import { useState, type Dispatch } from "react";
import { useKanban } from "./KanbanContext";


function TaskModal({taskId, onClose, isEditingInitial} : {taskId: string, onClose: () => void, isEditingInitial: boolean}){
 const {state, dispatch} = useKanban();
 const task = state.tasks[taskId];

 const [isEditing, setIsEditing] = useState<boolean>(isEditingInitial);
 const [title, setTitle] = useState<string>(task.content);
 const [description, setDescription] = useState<string>(task.description || '');

 function handleSave(){
  dispatch({
   type: 'edit-task',
   taskId,
   updatedFields: {content: title, description: description}
  });
  setIsEditing(false);
 }



 return(
  <div className = "modal">
   <div className = "modal-content">
    {isEditing ? (<>
     <h2>Edit Task</h2>
     <input value = {title} onChange={(e) => setTitle(e.target.value)} placeholder="Title"/>
     <textarea value = {description} onChange={(e) => setDescription(e.target.value)} placeholder = "Description" />
     <button onClick = {handleSave}>Save</button>
     <button onClick = {() => setIsEditing(false)}>Cancel</button>
    </>) :
    (
     <>
      <h2>{task.content}</h2>
      <p>{task.description || 'No provided description'}</p>
      <button onClick = {() => setIsEditing(true)}>Edit</button>
      <button onClick = {onClose}>Close</button>
     </>
    )}
   </div>
  </div>
 )
}



export default TaskModal