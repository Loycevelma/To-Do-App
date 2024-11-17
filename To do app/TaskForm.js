import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const TaskForm = ({ task, onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  const handleSave = () => {
    if (title.trim()) {
      const newTask = {
        id: task ? task.id : Date.now(),
        title,
        description,
        completed: false,
      };
      onSave(newTask);
    }
  };

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Task Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Task Description"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Save Task" onPress={handleSave} />
      <Button title="Cancel" onPress={onCancel} />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginVertical: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default TaskForm;
