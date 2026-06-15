import { View, Text, Pressable, StyleSheet } from "react-native";
import { Task } from "../types/task";

type Props = {
  task: Task;
  onDelete: (id: string) => void;
};

export default function TaskItem({ task, onDelete }: Props) {
  return (
    <View style={styles.container}>
      <Text>{task.title}</Text>

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
});