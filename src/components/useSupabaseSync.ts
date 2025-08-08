import { useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useKanban } from "../contexts/KanbanContext";
import { useAuth } from "../contexts/AuthContext";
import type { List, Task } from "../lib/types";


export function useSupabaseSync(){
    const {state, dispatch} = useKanban();
    const {user} = useAuth();


    useEffect(() =>{
        if (!user) return;

        (async () => {
            const {data: boardData} = await supabase
            .from('boards')
            .select('board_id')
            .eq('user_id', user.id)
            .single();

            let boardId = boardData?.board_id;

            if (!boardId){
                const {data: newBoard, error} = await supabase
                .from('boards')
                .insert({user_id: user.id})
                .select()
                .single();
                boardId = newBoard?.id;

                if (error) console.error("Board creation error:", error);
                console.log("Created board:", newBoard);
            }


            const {data: lists} = await supabase
            .from('lists')
            .select('*')
            .eq('owning_board_id', boardId);

            const { data: tasks } = await supabase
            .from("tasks")
            .select("*")
            .eq("owning_board_id", boardId);

            const listMap: Record<string, any> = {};
            const taskMap: Record<string, any> = {};
            const listOrder: string[] = [];

            for (const list of lists || []) {
                listMap[list.id] = {...list, taskIds: []};
                listOrder.push(list.id);
            }

            for (const task of tasks || []) {
                taskMap[task.id] = {
                    ...task,
                    dueDate: task.due_date || "", 
                };
                if (listMap[task.owning_list_id]){
                    listMap[task.owning_list_id].taskIds.push(task.id);
                } else {
                    console.warn("task.list_id not found in listMap", task.list_id);
                }
            }

            

            dispatch({
                type: 'load-board',
                state: {
                    boardId,
                    tasks: taskMap,
                    lists: listMap,
                    listOrder,
                    taskCounter: Object.keys(taskMap).length + 1,
                    listCounter: Object.keys(listMap).length + 1,
                },
            });
        })();
    }, [user, dispatch]);

    // useEffect(() => {
    //     const unsubscribe = supabase
    //     .channel('kanban-updates')
    //     .on('postgres_changes', {event: 'INSERT', schema: 'public', table: 'tasks'}, (payload) => {
    //         console.log("new task: ", payload);
    //     }).subscribe();

    //     return () => {
    //         unsubscribe.unsubscribe();
    //     };
    // }, []);
}

export async function insertListToSupabase(list: List, boardId: number | null)
{
    if(!boardId){
        console.warn("Cannot insert list: board is null")
        return
    }

    const {error} = await supabase.from('lists').insert({
        id: list.id,
        title: list.title,
        owning_board_id: boardId
    });

    if (error) console.error("Error inserting list:", error);
}

export async function insertTaskToSupabase(task: Task)
{
    const {error} = await supabase.from('tasks').insert({
        id: task.id,
        description: task.description,
        content: task.content,
        owning_list_id: task.list_id,
        owning_board_id: task.board_id,
        due_date: task.dueDate,
        priority: task.priority,
    }).select();

    if (error) console.error("Error inserting task: ", error);
}

export async function updateTaskInSupabase(task: Task) {
    const {error} = await supabase.from('tasks').update({
        id: task.id,
        description: task.description,
        content: task.content,
        owning_list_id: task.list_id,
        owning_board_id: task.board_id,
        due_date: task.dueDate,
        priority: task.priority,
    }).eq('id', task.id);

    if (error) console.error("Error updating task:", error);
}

export async function updateListInSupabase(list: List)
{
    const{error} = await supabase.from('lists').update({
        title: list.title,
    }).eq("id", list.id);

    if (error) console.error("Error updating list: ", error);
}

export async function deleteTaskFromSupabase(taskId: string)
{
    const {error} = await supabase.from("tasks").delete().eq('id', taskId);
    if (error) console.error("Error deleting task:", error);
}

export async function deleteListFromSupabase(listId: string)
{
    const {error} = await supabase.from("lists").delete().eq('id', listId);
    if (error) console.error("Error deleting list:", error);
}
