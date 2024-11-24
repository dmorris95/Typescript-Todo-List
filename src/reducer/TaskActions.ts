import Task from "./interfaces/Task";

type TaskActions = 
    | { type: 'ADD_TASK'; payload: Task }
    | { type: 'EDIT_TASK'; payload: Task }
    | { type: 'REMOVE_TASK'; payload: number };

export default TaskActions;