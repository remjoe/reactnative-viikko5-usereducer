import { useReducer, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

export interface Task {
    name: string;
    marked: boolean;
}

const PROFILE_KEY = 'user_tasks';

type Action =
    | { type: 'SET_TASKS'; payload: Task[] }
    | { type: 'ADD_TASK'; payload: string }
    | { type: 'DELETE_TASK'; payload: string }
    | { type: 'MARK_TASK'; payload: string };

const tasksReducer = (state: Task[], action: Action): Task[] => {
    switch (action.type) {
        case 'SET_TASKS':
            return action.payload;

        case 'ADD_TASK':
            if (state.some(t => t.name === action.payload)) {
                return state;
            }
            return [...state, { name: action.payload, marked: false }];

        case 'DELETE_TASK':
            return state.filter(t => t.name !== action.payload);

        case 'MARK_TASK':
            return state.map(t =>
                t.name === action.payload
                    ? { ...t, marked: !t.marked }
                    : t
            );

        default:
            return state;
    }
}

export function useTasks() {
    const [tasks, dispatch] = useReducer(tasksReducer, []);
    useEffect(() => {
        const loadTasks = async () => {
            const data = await SecureStore.getItemAsync(PROFILE_KEY);
            if (data) {
                dispatch({ type: 'SET_TASKS', payload: JSON.parse(data) });
            }
        };
        loadTasks();
    }, []);

    useEffect(() => {
        SecureStore.setItemAsync(PROFILE_KEY, JSON.stringify(tasks));
    }, [tasks]);

    return {
        tasks,
        addTask: (name: string) =>
            dispatch({ type: 'ADD_TASK', payload: name }),

        deleteTask: (name: string) =>
            dispatch({ type: 'DELETE_TASK', payload: name }),

        markTask: (name: string) =>
            dispatch({ type: 'MARK_TASK', payload: name }),
    };
}
