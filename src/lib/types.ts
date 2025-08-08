export const PRIORITY_OPTIONS = ["high", "medium", "low"] as const;

export type List = {
    id: string;
    title: string; 
    taskIds: string[];
}

export type Task = {
    id: string;
    content: string;
    description?: string;
    dueDate?: string,
    priority?: typeof PRIORITY_OPTIONS[number] | null;
    list_id: string;
    board_id: number | null;
    updated_at: string;
}

export type Board ={
    id: number;
    title: string; 
    lists: List[];
}

export type KanbanState = {
    boardId: number | null;
    tasks: Record<string, Task>;
    lists: Record<string, List>;
    listOrder: string[];
    taskCounter: number;
    listCounter: number;
}

export type KanbanAction =
| {type: "add-task"; listId: string; task: Task}
| {type: "move-task"; sourceListId: string; destListId: string; taskId: string; destIndex: number}
| {type: "add-list"; list: List}
| {type: "move-list"; sourceIndex: number; destIndex: number}
| {type: "edit-task"; taskId: string, updatedFields: Partial<Task>}
| {type: "load-board"; state: KanbanState}

