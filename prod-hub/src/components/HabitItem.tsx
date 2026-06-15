import { View, Text, Pressable, StyleSheet } from "react-native";
import { Habit } from "../types/habit";

type Props = {
  habit: Habit;

  // increase progress
  onIncrement: (id: string) => void;

  // decrease progress
  onDecrement: (id: string) => void;

  // delete habit
  onDelete: (id: string) => void;
};

export default function HabitItem({
  habit,
  onIncrement,
  onDecrement,
  onDelete,
}: Props) {
  return (
    <View style={styles.container}>
      {/* Habit Name */}
      <Text style={styles.title}>
        {habit.title}
      </Text>

    <Text>
  {Math.round(
    (habit.progress / habit.target) * 100
  ) || 0}
  %
</Text>

      {/* Progress */}
      <Text style={styles.progress}>
        {habit.progress} / {habit.target} {habit.unit}
      </Text>

      {/* Streak */}
      <Text style={styles.streak}>
        Streak: {habit.streak}
      </Text>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <Pressable
          style={styles.actionButton}
          onPress={() => onDecrement(habit.id)}
        >
          <Text>-</Text>
        </Pressable>

        <Pressable
          style={styles.actionButton}
          onPress={() => onIncrement(habit.id)}
        >
          <Text>+</Text>
        </Pressable>

        <Pressable
          style={styles.deleteButton}
          onPress={() => onDelete(habit.id)}
        >
          <Text style={styles.deleteText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },

  progress: {
    marginBottom: 4,
  },

  streak: {
    marginBottom: 12,
  },

  actions: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },

  actionButton: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  deleteButton: {
    backgroundColor: "red",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  deleteText: {
    color: "white",
  },
});