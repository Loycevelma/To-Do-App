import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@todos';

export const loadTasks = async () => {
  try {
    const tasks = await AsyncStorage.getItem(STORAGE_KEY);
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.error('Failed to load tasks:', error);
    return [];
  }
};

export const saveTasks = async (tasks) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks:', error);
  }
};
