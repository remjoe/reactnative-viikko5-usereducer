import * as React from 'react';
import { Appbar, TextInput, Text, Button } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { useTasks } from '../hooks/useTasks';

interface CustomAppBarProps {
    onTaskAdded: () => void;
}

const CustomAppBar: React.FC<CustomAppBarProps> = ({onTaskAdded}) => {
    const [task, setTask] = useState('');

    const {addTask} = useTasks();

    return (
        <Appbar.Header>
            <View style={styles.container}>
                <Text style={styles.title}>Todo List</Text>
                <View style={styles.row}>
                    <TextInput
                    placeholder="Task name..."
                    style={styles.input}
                    mode="outlined"
                    value={task}
                    onChangeText={task => setTask(task)}
                    />
                    <Button
                        mode='contained'
                        style={styles.button}
                        onPress={async() => {
                            if (task.trim().length > 0) {
                                await addTask({name: task.trim(), marked: false});
                                setTask('');
                                onTaskAdded();
                            }
                        }
                    }
                    >
                    Add
                    </Button>
                </View>
            </View>
        </Appbar.Header>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10
    },
    input: {
        height: 40,
        flex: 0.8
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5
    },
    button: {
        flex: 0.2,
        marginLeft: 5,
        height: 40
    }
});

export default CustomAppBar;