import { useState} from "react";
import { PRIORITY_OPTIONS, type Task } from "../lib/types";
import { useKanban } from "../contexts/KanbanContext";
import { updateTaskInSupabase } from "./useSupabaseSync";

function TaskModal({taskId, onClose, isEditingInitial} : {taskId: string, onClose: () => void, isEditingInitial: boolean}){
 const {state, dispatch} = useKanban();
 const task = state.tasks[taskId];

 const [isEditing, setIsEditing] = useState<boolean>(isEditingInitial);
 const [title, setTitle] = useState<string>(task.content);
 const [description, setDescription] = useState<string>(task.description || '');
 const [priority, setPriority] = useState<Task["priority"]>(task.priority || null);
 const [dueDate, setDueDate] = useState<string>(task.dueDate || "");

 function handleSave(){
    const updatedTask = {
        ...task,
        content: title,
        description: description,
        priority: priority,
        dueDate: dueDate,
    }
    dispatch({
        type: 'edit-task',
        taskId,
        updatedFields: {content: title, description: description, priority: priority, dueDate: dueDate},
    });
    updateTaskInSupabase(updatedTask);
    setIsEditing(false);
 }


 return(
  <div className = "modal">
   <div className = "modal-content">
    {isEditing ? (<>
     <h2>Edit Task</h2>
     <input value = {title} onChange={(e) => setTitle(e.target.value)} placeholder="Title"/>
     <textarea value = {description} onChange={(e) => setDescription(e.target.value)} placeholder = "Description" />

     <div> Due Date:
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)}/>
     </div>

     <div> Priority:
      <select value = {priority || ""} onChange = {(e) => {
       const value = e.target.value;
       setPriority(value === "" ? null : (value as Task["priority"]))
      }}>
       <option value = "">No priority</option>
       {PRIORITY_OPTIONS.map((p) => (<option key = {p} value = {p}> {p} </option>))}
      </select>
     </div>

     <button className = 'task' onClick = {handleSave}>Save</button>
     <button className = 'task' onClick = {() => setIsEditing(false)}>Cancel</button>
    </>) :
    (
     <>
      <h2>{task.content}</h2>
      <p>{task.description || 'No provided description'}</p>
      <p>Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "None"}</p>
      <p>{task.priority}</p>
      <button className = 'task' onClick = {() => setIsEditing(true)}>Edit</button>
      <button className = 'task' onClick = {onClose}>Close</button>
     </>
    )}
   </div>
  </div>
 )
}

export default TaskModal