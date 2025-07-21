import { useKanban } from "./KanbanContext";


function Task({taskId} : {taskId: string}){
 const {state} = useKanban();
 const task = state.tasks[taskId];

 return(
  <div className = "task-card">
   {task.content}
  </div>
 );
}

export default Task;