import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useTasks } from '../hooks/useTasks';
import React, { useState, useEffect } from 'react';
import { SwipeListView } from 'react-native-swipe-list-view';

interface TaskScreenProps {
    refreshKey: number;
    onTaskUpdated: () => void;
}

const TasksScreen: React.FC<TaskScreenProps> = ({ refreshKey, onTaskUpdated }) => {
    const [tasks, setTasks] = useState([]);
    const { getTasks, markTask, deleteTask } = useTasks();

    useEffect(() => {
        (async() => {
            const stored = await getTasks();
            if (stored) setTasks(stored);
        })();
    }, [refreshKey]);

    return (
        <View style={styles.container}>
            <SwipeListView
                data={tasks}
                keyExtractor={(item) => item.name}
                style={styles.list}
                renderItem={({item}) => (
                    <View style={styles.rowFront}>
                        <Text
                            onPress={async() => {
                                    await markTask(item);
                                    onTaskUpdated();
                                }}
                            style={[{fontSize: 30, fontWeight: 'bold'}, (item.marked && {
                                    textDecorationLine: 'line-through',
                                    textDecorationStyle: 'solid'
                                })]}
                        >
                            {item.name}
                        </Text>
                    </View>
                )}
                renderHiddenItem={({item}) => (<View></View>)}
                onRowOpen={async (rowKey) => {
                    const task = tasks.find(t => t.name === rowKey);
                    if (task) {
                        await deleteTask(task);
                        onTaskUpdated();
                    }
                }}
                rightOpenValue={-50}
            />
        </View>
    );
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-start',
            verticalAlign: 'middle',
            backgroundColor: '#ffffff'
        },
        rowFront: {
            flex: 1,
            flexDirection: 'row',
            backgroundColor: '#ffffff'
        },
        rowBack: {
            flex: 1,
            flexDirection: 'row',
        },
        list: {
            marginHorizontal: 50,
            marginVertical: 50
        },
    }
);

export default TasksScreen;