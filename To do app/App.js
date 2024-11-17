import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, Button, Alert, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskItem from './components/TaskItem';
import TaskForm from './components/TaskForm';
import { loadTasks, saveTasks } from './utils/storage';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const loadedTasks = await loadTasks();
      setTasks(loadedTasks);
    };

    fetchTasks();
  }, []);

  const addTask = async (task) => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    await saveTasks(newTasks);
    setFormVisible(false);
  };

  const updateTask = async (updatedTask) => {
    const updatedTasks = tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
    setFormVisible(false);
  };

  const deleteTask = async (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
  };

  const toggleTaskCompletion = async (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Button title="Add Task" onPress={() => setFormVisible(true)} />
      
      {isFormVisible && (
        <TaskForm
          task={currentTask}
          onSave={currentTask ? updateTask : addTask}
          onCancel={() => setFormVisible(false)}
        />
      )}
      
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onEdit={() => {
              setCurrentTask(item);
              setFormVisible(true);
            }}
            onDelete={() => deleteTask(item.id)}
            onToggleCompletion={() => toggleTaskCompletion(item.id)}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
};

export default App;
