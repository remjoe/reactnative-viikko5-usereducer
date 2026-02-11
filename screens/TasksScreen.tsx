import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Task } from '../hooks/useTasks';

interface TaskScreenProps {
    tasks: Task[],
    markTask: (string) => void,
    deleteTask: (string) => void
}

const TasksScreen: React.FC<TaskScreenProps> = ({tasks, markTask, deleteTask}) => {
    return (
        <View style={styles.container}>
            <SwipeListView
                data={tasks}
                keyExtractor={(item) => item.name}
                style={styles.list}
                renderItem={({ item }) => (
                    <View style={styles.rowFront}>
                        <Text
                            onPress={() => markTask(item.name)}
                            style={[
                                { fontSize: 30, fontWeight: 'bold' },
                                item.marked && {
                                    textDecorationLine: 'line-through',
                                }
                            ]}
                        >
                            {item.name}
                        </Text>
                    </View>
                )}
                renderHiddenItem={() => <View />}
                onRowOpen={(rowKey) => {
                    deleteTask(rowKey);
                }}
                rightOpenValue={-50}
            />
        </View>
    );
};

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