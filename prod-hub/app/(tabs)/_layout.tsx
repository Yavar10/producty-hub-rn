import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="tasks"
        options={{
          title: "Tasks",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="checkmark-circle-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="notes"
        options={{
          title: "Notes",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="habits"
        options={{
          title: "Habits",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="repeat-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="focus"
        options={{
          title: "Focus",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="timer-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}