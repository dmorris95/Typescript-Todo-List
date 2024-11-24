import React, { createContext, ReactNode, useContext, useReducer } from "react";
import TaskActions from "../reducer/TaskActions";
import taskReducer from "../reducer/TaskReducer";
import TaskState from "../reducer/TaskState";

interface TaskProviderProps {
    children: ReactNode;
}

const initialState: TaskState = {
    tasks: [],
};

const TaskContext = createContext<{ state: TaskState; dispatch: React.Dispatch<TaskActions> } | undefined>(undefined);

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(taskReducer, initialState);

    return (
        <TaskContext.Provider value={{ state, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (context === undefined) {
        throw new Error('You must be using useTaskContext within a provider')
    }
    return context
};
