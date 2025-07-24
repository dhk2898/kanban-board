import { useKanban } from "./KanbanContext";
import List from "./List.tsx";
import {v4 as uuidv4} from 'uuid';
import { useState } from "react";
import { DragDropContext, Draggable, Droppable, type DropResult } from "@hello-pangea/dnd";


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

 function handleDragEnd(result: DropResult){
    const {destination, source, draggableId, type} = result;
    if (!destination) return;

    if (type === 'list'){
        dispatch({
            type: "move-list",
            sourceIndex: source.index,
            destIndex: destination.index,
        });

        return;
    }

    if (source.droppableId === destination.droppableId && source.index === destination.index)
    {
        return;
    }

    dispatch({
        type: 'move-task',
        taskId: draggableId,
        sourceListId: source.droppableId,
        destListId: destination.droppableId,
        destIndex: destination.index,
    });
 }

 return(
    <DragDropContext onDragEnd={handleDragEnd}>
    <div>
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
            {(provided) => (<div ref={provided.innerRef} {...provided.droppableProps} className="board">
                {state.listOrder.map((listId, index) => 
                (<Draggable key ={listId} draggableId={listId} index = {index}>
                    {(provided) => (<div className = "list" ref = {provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <List listId={listId} />
                    </div>)}
                </Draggable>))}
                {provided.placeholder}
                </div>)}
        </Droppable>
        <div>
            <input type = 'text' placeholder = 'New List Title' value = {newListTitle} onChange = {(e) => setNewListTitle(e.target.value)}/>
            <button onClick = {handleAddList}>Add List</button>
        </div>
    </div>
    </DragDropContext>
 );

}
export default Board