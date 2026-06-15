import { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Pressable,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import TaskItem from "../../src/components/TaskItem";
import { Task } from "../../src/types/task";

const STORAGE_KEY = "tasks";

export default function TasksScreen() {
  const [newTask, setNewTask] = useState("");

  const [tasks, setTasks] = useState<Task[]>([]);

  const completedCount = tasks.filter(
  task => task.completed
).length;

  function addTask() {
    if (!newTask.trim()) return;

    const task: Task = {
      id: Date.now().toString(),
      title: newTask,
      completed: false,
    };

    setTasks((prev) => [...prev, task]);
    setNewTask("");
  }

  function deleteTask(id:string) {
    setTasks(prev=>
      prev.filter(task=>task.id!==id)
    );
  }

// Load tasks when the screen mounts
async function loadTasks() {
  try {
    const storedTasks = await AsyncStorage.getItem(STORAGE_KEY);

    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  } catch (error) {
    console.log("Error loading tasks:", error);
  }
}

// Save tasks whenever they change
async function saveTasks(tasksToSave: Task[]) {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(tasksToSave)
    );
  } catch (error) {
    console.log("Error saving tasks:", error);
  }
}

// toggling
function toggleTask(id: string) {
  setTasks(prev =>
    prev.map(task =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    )
  );
}



// Run once when component loads
useEffect(() => {
  loadTasks();
}, []);

// Run every time tasks changes
useEffect(() => {
  saveTasks(tasks);
}, [tasks]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Tasks</Text>

      <View style={styles.inputContainer}>
        <TextInput
          value={newTask}
          onChangeText={setNewTask}
          placeholder="Enter a task"
          style={styles.input}
        />

        <Pressable style={styles.button} onPress={addTask}>
          <Text style={styles.buttonText}>Add</Text>
        </Pressable>
      </View>

<Text>
  {completedCount} / {tasks.length} completed
</Text>

      <FlatList
  data={tasks}
  keyExtractor={(item) => item.id}

  // render each task using the TaskItem component
  renderItem={({ item }) => (
    <TaskItem
      task={item}

      // passing deleteTask down to the child component
      // so TaskItem can tell the parent which task to remove
      onDelete={deleteTask}
      onToggle={toggleTask}
    />
  )}
/>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  inputContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
  },

  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    justifyContent: "center",
    borderRadius: 10,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});