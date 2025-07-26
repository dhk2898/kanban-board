export type List = {
 id: string;
 title: string; 
 taskIds: string[];
}

export type Task = {
 id: string;
 content: string;
 description?: string;
}

export type Board ={
 id: string;
 title: string; 
 lists: List[];
}

export type KanbanState = {
 tasks: Record<string, Task>;
 lists: Record<string, List>;
 listOrder: string[];
 taskCounter: number;
}

export type KanbanAction =
| {type: "add-task"; listId: string; task: Task}
| {type: "move-task"; sourceListId: string; destListId: string; taskId: string; destIndex: number}
| {type: "add-list"; list: List}
| {type: "move-list"; sourceIndex: number; destIndex: number}
| {type: "edit-task"; taskId: string, updatedFields: {content: string, description: string}}

