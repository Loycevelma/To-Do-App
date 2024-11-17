import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';

const TaskItem = ({ task, onEdit, onDelete, onToggleCompletion }) => {
  return (
    <View style={[styles.taskContainer, task.completed && styles.completed]}>
      <TouchableOpacity onPress={onToggleCompletion}>
        <Text style={styles.taskText}>{task.title}</Text>
      </TouchableOpacity>
      <Button title="Edit" onPress={onEdit} />
      <Button title="Delete" onPress={onDelete} />
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#bbb',
  },
  taskText: {
    fontSize: 18,
    flex: 1,
  },
});

export default TaskItem;
