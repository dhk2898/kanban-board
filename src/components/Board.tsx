import { useKanban } from "./KanbanContext";
import List from "./List.tsx";
import {v4 as uuidv4} from 'uuid';
import { useState } from "react";


function Board(){
 const {state, dispatch} = useKanban();
 const [newListTitle, setNewListTitle] = useState('');

 function handleAddList(){
  if (!newListTitle.trim()) return;
  const newList = {
   id: uuidv4(),
   title: newListTitle,
   taskIds:[]
  }
  dispatch({type: "add-list", list: newList})
  setNewListTitle('');
 }

 return(
  <div>
   {state.listOrder.map(listId => (<List key = {listId} listId ={listId}/>))}
   <div>
    <input type = 'text' placeholder = 'New List Title' value = {newListTitle} onChange = {(e) => setNewListTitle(e.target.value)}/>
    <button onClick = {handleAddList}>Add List</button>
   </div>
  </div>
 );

}
export default Board