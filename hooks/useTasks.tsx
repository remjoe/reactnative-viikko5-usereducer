import { useCallback } from 'react';
import * as SecureStore from 'expo-secure-store';

export interface Task {
    name: string;
    marked: boolean;
}

const PROFILE_KEY = 'user_tasks';

export function useTasks() {
    const addTask = useCallback(async (task: Task) => {
        try {
            const data = await SecureStore.getItemAsync(PROFILE_KEY);
            const tasks: Task[] = data ? JSON.parse(data) : [];

            // Make sure task does not exist already
            if (tasks.filter(t => t.name === task.name).length == 0) {
                tasks.push(task);
                await SecureStore.setItemAsync(PROFILE_KEY, JSON.stringify(tasks));
            }
        } catch (e) {
            throw e;
        }
    }, []);

    const getTasks = useCallback(async (): Promise<Task[] | null> => {
        try {
            const data = await SecureStore.getItemAsync(PROFILE_KEY);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            throw e;
        }
    }, []);

    const deleteTask = useCallback(async (task: Task) => {
        try {
            const data = await SecureStore.getItemAsync(PROFILE_KEY);
            const tasks: Task[] = data ? JSON.parse(data) : [];
            const filteredTasks = tasks.filter(t => t.name != task.name);
            await SecureStore.setItemAsync(PROFILE_KEY, JSON.stringify(filteredTasks));
        } catch (e) {
            throw e;
        }
    }, []);

    const markTask = useCallback(async (task: Task) => {
        try {
            const data = await SecureStore.getItemAsync(PROFILE_KEY);
            const tasks: Task[] = data ? JSON.parse(data) : [];
            const updatedTasks = tasks.map(t => 
                t.name === task.name 
                    ? { ...t, marked: !t.marked } 
                    : t
            );
            await SecureStore.setItemAsync(PROFILE_KEY, JSON.stringify(updatedTasks));
        } catch (e) {
            throw e;
        }
    }, []);

    return { addTask, getTasks, deleteTask, markTask };
}