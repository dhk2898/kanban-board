import type {KanbanAction, KanbanState, Task, List} from "./types";
import { createContext, useContext, useReducer } from "react";

const InitialState: KanbanState = {
 tasks: {},
 lists: {},
 listOrder: []
};

function kanbanReducer(state: KanbanState, action: KanbanAction):KanbanState {
 switch(action.type){
  case "add-task":{
   const {listId, task} = action;
   const list = state.lists[listId]
   return{
    ...state,
    tasks:{...state.tasks, [task.id]: task},
    lists:{
     ...state.lists,
     [listId]: {...list, taskIds: [...list.taskIds, task.id]}
    }
   };
  }
  case "move-task":{
   const {sourceListId, destListId, taskId, destIndex} = action;
   const sourceList = state.lists[sourceListId];
   const destList = state.lists[destListId];
   
   const newSourceTaskIds = sourceList.taskIds.filter(id => id !== taskId);
   const newDestTaskIds = [...destList.taskIds];
   newDestTaskIds.splice(destIndex, 0, taskId);

   return{
    ...state, 
    lists: {
     ...state.lists,
     [sourceListId]:{...sourceList, taskIds: newSourceTaskIds},
     [destListId]: {...destList, taskIds: newDestTaskIds}
    }
   }
  }
  case "add-list":{
   const {list} = action;
   return {
    ...state, 
    lists:{...state.lists, [list.id]: list},
    listOrder: [...state.listOrder, list.id]
   }
  }
  case "move-list":{
   const newOrder = [...state.listOrder];
   const [removed] = newOrder.splice(action.sourceIndex, 1);
   newOrder.splice(action.destIndex, 0, removed);
   return {...state, listOrder: newOrder};
  }
  default:
   return state;
 }
}

const KanbanContext = createContext<{state: KanbanState; dispatch: React.Dispatch<KanbanAction>;} | undefined>(undefined);

export function KanbanProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(kanbanReducer, InitialState);
  return (
    <KanbanContext.Provider value={{ state, dispatch }}>
      {children}
    </KanbanContext.Provider>
  );
}

export function useKanban() {
  const context = useContext(KanbanContext);
  if (!context) throw new Error('useKanban must be used within KanbanProvider');
  return context;
}