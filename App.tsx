import * as React from 'react'
import { StyleSheet } from 'react-native';
import CustomAppBar from './components/CustomAppBar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import TasksScreen from './screens/TasksScreen';
import { useState, useCallback } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
  const [refresh, setRefresh] = useState(0);

  const triggerRefresh = useCallback(() => {
    setRefresh(prev => prev + 1);
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
        id="Navigator"
        initialRouteName="Tasks"
        screenOptions={{
          header: () => <CustomAppBar onTaskAdded={triggerRefresh} />
        }}
        >
          <Stack.Screen name="Tasks">
            {() => <TasksScreen refreshKey={refresh} onTaskUpdated={triggerRefresh} />}
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