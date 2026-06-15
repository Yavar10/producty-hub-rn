import { View, Text, Pressable, StyleSheet } from "react-native";
import { Task } from "../types/task";

type Props = {
  task: Task;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
};

export default function TaskItem({ task, onDelete, onToggle }: Props) {
  return (
    <View style={styles.container}>
      <Pressable
  style={styles.taskContent}
  onPress={() => onToggle(task.id)}
>
  <Text style={styles.checkbox}>
    {task.completed ? "☑" : "☐"}
  </Text>

  <Text
    style={[
      styles.taskText,
      task.completed && styles.completedTask,
    ]}
  >
    {task.title}
  </Text>
</Pressable>

      <Pressable
        style={styles.deleteButton}
        onPress={() => onDelete(task.id)}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  deleteButton: {
    backgroundColor: "red",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },

  deleteText: {
    color: "white",
  },
  taskContent: {
  flexDirection: "row",
  alignItems: "center",
  flex: 1,
},

checkbox: {
  fontSize: 20,
  marginRight: 10,
},

taskText: {
  fontSize: 16,
},

completedTask: {
  textDecorationLine: "line-through",
  opacity: 0.5,
},
});