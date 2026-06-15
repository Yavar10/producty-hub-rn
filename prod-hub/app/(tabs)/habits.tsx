import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";

import { Habit } from "../../src/types/habit";
import HabitItem from "../../src/components/HabitItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HabitsScreen() {
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [unit, setUnit] = useState("");
  const STORAGE_KEY = "habits";
  const [habits, setHabits] = useState<Habit[]>([]);

  function addHabit() {
    if (!title.trim() || !target.trim() || !unit.trim()) {
      return;
    }

    const habit: Habit = {
      id: Date.now().toString(),
      title,
      target: Number(target),
      unit,

      progress: 0,
      streak: 0,
      completedToday: false,
      lastCompletedDate: null,
    };

    setHabits((prev) => [...prev, habit]);

    setTitle("");
    setTarget("");
    setUnit("");
  }

  function deleteHabit(id: string) {
  setHabits(prev =>
    prev.filter(habit => habit.id !== id)
  );
}

function incrementHabit(id: string) {
  setHabits(prev =>
    prev.map(habit => {
      if (habit.id !== id) return habit;

      const newProgress = habit.progress + 1;

      const today = new Date().toDateString();

      let newStreak = habit.streak;
      let completedToday = habit.completedToday;
      let lastCompletedDate = habit.lastCompletedDate;

      // User reaches target for the first time today

if (
  newProgress >= habit.target &&
  habit.lastCompletedDate !== today
) {
        newStreak += 1;
        completedToday = true;
        lastCompletedDate = today;
      }

      return {
        ...habit,
        progress: newProgress,
        streak: newStreak,
        completedToday,
        lastCompletedDate,
      };
    })
  );
}

function decrementHabit(id: string) {
  setHabits(prev =>
    prev.map(habit => {
      if (habit.id !== id) return habit;

      const newProgress = Math.max(
        0,
        habit.progress - 1
      );

     if (
  habit.completedToday &&
  newProgress < habit.target
) {
  return {
    ...habit,
    progress: newProgress,
    completedToday: false,

    // Undo today's completion
    streak: Math.max(0, habit.streak - 1),

    lastCompletedDate: null,
  };
}

return {
  ...habit,
  progress: newProgress,
  completedToday:
    newProgress >= habit.target,
};
    })
  );
}

async function loadHabits() {
  try {
    const storedHabits =
      await AsyncStorage.getItem(STORAGE_KEY);

    if (storedHabits) {
      setHabits(JSON.parse(storedHabits));
    }
  } catch (error) {
    console.log(error);
  }
}

async function saveHabits(habitsToSave: Habit[]) {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(habitsToSave)
    );
  } catch (error) {
    console.log(error);
  }
}

function isSameDay(date1: string, date2: string) {
  return date1 === date2;
}



useEffect(() => {
  loadHabits();
}, []);

useEffect(() => {
  saveHabits(habits);
}, [habits]);


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Habits</Text>

      <TextInput
        placeholder="Habit Name"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="Target"
        value={target}
        onChangeText={setTarget}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Unit (pages, min, glasses)"
        value={unit}
        onChangeText={setUnit}
        style={styles.input}
      />

      <Pressable
        style={styles.button}
        onPress={addHabit}
      >
        <Text style={styles.buttonText}>
          Add Habit
        </Text>
      </Pressable>

      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
         <HabitItem
          habit={item}
          onIncrement={incrementHabit}
          onDecrement={decrementHabit}
          onDelete={deleteHabit}
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

  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});