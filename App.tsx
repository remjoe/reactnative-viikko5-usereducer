import * as React from 'react'
import { StyleSheet } from 'react-native';
import CustomAppBar from './components/CustomAppBar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import TasksScreen from './screens/TasksScreen';
import { useTasks } from './hooks/useTasks';

const Stack = createNativeStackNavigator();

export default function App() {
  const tasksHook = useTasks();

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
        id="Navigator"
        initialRouteName="Tasks"
        screenOptions={{
          header: () => <CustomAppBar addTask={tasksHook.addTask} />
        }}
        >
          <Stack.Screen name="Tasks">
            {() => <TasksScreen tasks={tasksHook.tasks} markTask={tasksHook.markTask} deleteTask={tasksHook.deleteTask} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});